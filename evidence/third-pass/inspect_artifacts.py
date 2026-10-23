"""Inspect pinned public fixtures with Python's standard library; no target apps needed.

Run: python evidence/third-pass/inspect_artifacts.py
Downloads are retained under inputs/. No archived application code is executed.
"""

import hashlib
import io
import json
from pathlib import Path
import platform
import sqlite3
import sys
import urllib.request
import xml.etree.ElementTree as ET
import zipfile
from datetime import datetime, timezone


ROOT = Path(__file__).resolve().parent
TARGETS = [
    ("anki", "ankitects/anki", "8d6e0a0f462f016889896ceaaab1be2aba182588",
     "pylib/tests/support/media.apkg"),
    ("qgis", "qgis/QGIS", "b7db8233afbfe8d1e9870da61a2696592295932c",
     "tests/testdata/embedded_groups/project1.qgz"),
    ("freecad", "FreeCAD/FreeCAD", "d48752f2851906f93e060cc996ba9fba1e5a05f8",
     "data/tests/PadTest.fcstd"),
    ("zotero", "zotero/zotero", "db41b99fddcc52d38897c59c161b6adaca036afb",
     "resource/schema/userdata.sql"),
]


def inspect_sqlite(data):
    with sqlite3.connect(":memory:") as conn:
        conn.deserialize(data)
        conn.execute("PRAGMA query_only=ON")
        tables = [r[0] for r in conn.execute(
            "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name"
        )]
        result = {"tables": tables, "integrity_check": conn.execute(
            "PRAGMA integrity_check").fetchone()[0]}
        if {"notes", "cards"}.issubset(tables):
            result["note_count"] = conn.execute("SELECT COUNT(*) FROM notes").fetchone()[0]
            result["card_count"] = conn.execute("SELECT COUNT(*) FROM cards").fetchone()[0]
            result["notes_with_cards"] = conn.execute(
                "SELECT COUNT(DISTINCT notes.id) FROM notes JOIN cards ON cards.nid=notes.id"
            ).fetchone()[0]
            result["note_columns"] = [r[1] for r in conn.execute("PRAGMA table_info(notes)")]
            result["sample_note_fields"] = [r[0] for r in conn.execute("SELECT flds FROM notes LIMIT 2")]
        return result


def inspect_archive(data, application):
    with zipfile.ZipFile(io.BytesIO(data)) as archive:
        members = archive.infolist()
        if sum(m.file_size for m in members) > 20_000_000:
            raise ValueError("Fixture exceeds inspection size limit")
        result = {"members": [{"name": m.filename, "bytes": m.file_size,
            "sha256": hashlib.sha256(archive.read(m)).hexdigest()} for m in members]}
        for member in members:
            name = member.filename
            if application == "anki" and name.startswith("collection."):
                result[name] = inspect_sqlite(archive.read(member))
            elif application == "anki" and name == "media":
                result["media_map"] = json.loads(archive.read(member))
            elif application == "qgis" and name.endswith(".qgs"):
                root = ET.fromstring(archive.read(member))
                result["project"] = {"root_tag": root.tag,
                    "version": root.get("version"),
                    "layers": [{"id": e.findtext("id"), "name": e.findtext("layername"),
                        "datasource": e.findtext("datasource"), "provider": e.findtext("provider")}
                        for e in root.findall(".//projectlayers/maplayer")],
                    "relation_count": len(root.findall(".//relations/relation")),
                    "layout_count": len(root.findall(".//Layout"))}
            elif application == "qgis" and name.endswith(".qgd") and member.file_size:
                result["auxiliary_database"] = inspect_sqlite(archive.read(member))
            elif application == "freecad" and name == "Document.xml":
                root = ET.fromstring(archive.read(member))
                result["document"] = {"root_tag": root.tag,
                    "schema_version": root.get("SchemaVersion"),
                    "objects": [e.attrib for e in root.findall("./Objects/Object")],
                    "property_names": sorted({e.get("name") for e in root.iter("Property") if e.get("name")}),
                    "property_types": sorted({e.get("type") for e in root.iter("Property") if e.get("type")})}
        return result


def inspect_schema(data):
    with sqlite3.connect(":memory:") as conn:
        conn.executescript(data.decode("utf-8"))
        conn.execute("PRAGMA query_only=ON")
        tables = [r[0] for r in conn.execute(
            "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name")]
        queries = {
            "metadata": "SELECT i.itemID,f.fieldName,v.value FROM items i JOIN itemData d ON d.itemID=i.itemID JOIN fieldsCombined f ON f.fieldID=d.fieldID JOIN itemDataValues v ON v.valueID=d.valueID LIMIT 0",
            "creators": "SELECT i.itemID,c.firstName,c.lastName,ic.orderIndex FROM items i JOIN itemCreators ic ON ic.itemID=i.itemID JOIN creators c ON c.creatorID=ic.creatorID LIMIT 0",
            "tags": "SELECT it.itemID,t.name FROM itemTags it JOIN tags t ON t.tagID=it.tagID LIMIT 0",
            "collections": "SELECT ci.itemID,c.collectionName,c.parentCollectionID FROM collectionItems ci JOIN collections c ON c.collectionID=ci.collectionID LIMIT 0",
            "annotations": "SELECT itemID,parentItemID,text,comment,position FROM itemAnnotations LIMIT 0",
        }
        columns = {name: [c[0] for c in conn.execute(sql).description]
            for name, sql in queries.items()}
        return {"schema_created": True, "tables": tables, "prepared_query_columns": columns,
            "queries": queries, "populated_library_tested": False}


def main():
    (ROOT / "inputs").mkdir(exist_ok=True)
    results = []
    for application, repo, commit, path in TARGETS:
        url = f"https://raw.githubusercontent.com/{repo}/{commit}/{path}"
        request = urllib.request.Request(url, headers={"User-Agent": "Sovereign-evidence-inspection"})
        with urllib.request.urlopen(request, timeout=30) as response:
            data = response.read(5_000_001)
        if len(data) > 5_000_000:
            raise ValueError("Download exceeds fixture size limit")
        destination = ROOT / "inputs" / f"{application}-{Path(path).name}"
        if destination.exists() and destination.read_bytes() != data:
            raise ValueError(f"Retained fixture differs: {destination}")
        destination.write_bytes(data)
        result = {"application": application, "repository": repo, "commit": commit,
            "path": path, "url": url, "local_path": destination.relative_to(ROOT).as_posix(),
            "bytes": len(data), "sha256": hashlib.sha256(data).hexdigest()}
        result["inspection"] = inspect_schema(data) if application == "zotero" else inspect_archive(data, application)
        results.append(result)
    report = {"observed_at_utc": datetime.now(timezone.utc).isoformat(),
        "python": sys.version, "platform": platform.platform(), "sqlite": sqlite3.sqlite_version,
        "target_applications_executed": False, "results": results}
    (ROOT / "artifact-results.json").write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(json.dumps(report, indent=2, ensure_ascii=True))


if __name__ == "__main__":
    main()
