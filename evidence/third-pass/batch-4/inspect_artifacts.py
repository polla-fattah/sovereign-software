"""Inspect pinned public fixtures with standard-library readers, without target apps.

Run from repository root: python evidence/third-pass/batch-4/inspect_artifacts.py
Retained inputs are reused offline and checked against previous result hashes.
Downloaded code is read as text or parsed as syntax, never imported or executed.
"""

import ast
from collections import Counter
from datetime import datetime, timezone
import hashlib
import io
import json
from pathlib import Path
import platform
import re
import sqlite3
import sys
import urllib.request
import xml.etree.ElementTree as ET
import zipfile

ROOT = Path(__file__).resolve().parent


def digest(data):
    return hashlib.sha256(data).hexdigest()


def git_blob_id(data):
    return hashlib.sha1(b"blob " + str(len(data)).encode("ascii") + b"\0" + data).hexdigest()


def summarize(value):
    if isinstance(value, bytes):
        return {"bytes": len(value), "sha256": digest(value)}
    if isinstance(value, str) and len(value) > 350:
        return {"characters": len(value), "preview": value[:350]}
    return value


def inspect_sqlite(path):
    with sqlite3.connect(path.as_uri() + "?mode=ro&immutable=1", uri=True) as db:
        db.execute("PRAGMA query_only=ON")
        db.execute("PRAGMA trusted_schema=OFF")
        schema = db.execute("SELECT name, type, sql FROM sqlite_master ORDER BY name").fetchall()
        tables = {}
        for name, kind, sql in schema:
            if kind != "table" or name.startswith("sqlite_"):
                continue
            quoted = '"' + name.replace('"', '""') + '"'
            cols = db.execute("PRAGMA table_info(" + quoted + ")").fetchall()
            table = {"columns": [c[1:3] for c in cols]}
            try:
                cursor = db.execute("SELECT * FROM " + quoted + " LIMIT 4")
                table["sample_rows"] = [[summarize(v) for v in row] for row in cursor]
                table["row_count"] = db.execute("SELECT count(*) FROM " + quoted).fetchone()[0]
            except sqlite3.DatabaseError as error:
                table["read_error"] = str(error)
            tables[name] = table
        try:
            integrity = db.execute("PRAGMA integrity_check").fetchall()
        except sqlite3.DatabaseError as error:
            integrity = {"error": str(error)}
        return {"integrity_check": integrity,
                "user_version": db.execute("PRAGMA user_version").fetchone()[0],
                "schema": schema, "tables": tables}


def inspect_mscz(data):
    with zipfile.ZipFile(io.BytesIO(data)) as z:
        infos = z.infolist()
        if len(infos) > 100 or sum(i.file_size for i in infos) > 5_000_000:
            raise ValueError("Unexpectedly large score archive")
        xml_name = next(i.filename for i in infos if i.filename.endswith(".mscx"))
        score = ET.fromstring(z.read(xml_name))
        return {"members": [{"name": i.filename, "bytes": i.file_size} for i in infos],
                "score_member": xml_name, "xml_root": score.tag, "version": score.get("version"),
                "program_version": score.findtext("programVersion"),
                "element_counts": dict(sorted(Counter(e.tag for e in score.iter()).items())),
                "lyrics": ["".join(e.itertext()) for e in score.findall(".//Lyrics/text")],
                "note_pitches": [e.text for e in score.findall(".//Note/pitch")],
                "rendered_or_reimported": False}


def inspect_ardour(data):
    root = ET.fromstring(data)
    sources = [dict(e.attrib) for e in root.findall("./Sources/Source")]
    source_ids = {s["id"] for s in sources}
    refs = [{"region": e.get("id"), "field": k, "source_id": v, "resolves": v in source_ids}
            for e in root.findall(".//Region") for k, v in e.attrib.items()
            if re.fullmatch(r"(master-)?source-\d+", k)]
    return {"session_attributes": root.attrib, "sources": sources, "region_source_references": refs,
            "routes": [dict(e.attrib) for e in root.findall(".//Route")],
            "external_media_read_or_rendered": False}


def inspect_zim(notebook, parsetree, wiki, markdown):
    root = ET.fromstring(notebook)
    pages = [{"name": e.get("name"), "characters": len(e.text or ""),
              "links": re.findall(r"\[\[([^\]|]+)(?:\|[^\]]*)?\]\]", e.text or "")}
             for e in root.findall("page")]
    tree = ET.fromstring(parsetree)
    return {"fixture_root": root.tag, "page_count": len(pages), "pages": pages,
            "parse_tree_counts": dict(sorted(Counter(e.tag for e in tree.iter()).items())),
            "parse_tree_links": [e.attrib for e in tree.findall(".//link")],
            "wiki_task_markers": dict(Counter(re.findall(r"\[(?: |\*|x|>|<)\]", wiki))),
            "markdown_task_markers": dict(Counter(re.findall(r"\[(?: |\*|x|>|<)\]", markdown))),
            "markdown_checkbox_glyphs": {glyph: markdown.count(glyph) for glyph in ("☐", "☑", "☒", "▷", "◁")},
            "export_executed": False}


def inspect_task_literals(source):
    tree = ast.parse(source)
    fixtures = {}
    for node in ast.walk(tree):
        if not isinstance(node, ast.Assign) or not isinstance(node.value, ast.Constant):
            continue
        if not isinstance(node.value.value, str):
            continue
        names = [ast.unparse(t) for t in node.targets]
        if not any(n in ("self.data1", "self.data2", "self.data3") for n in names):
            continue
        parsed = json.loads(node.value.value)
        fixtures[names[0]] = parsed
    assert set(fixtures) == {"self.data1", "self.data2", "self.data3"}
    return {"upstream_test_literals": fixtures, "taskwarrior_tests_executed": False}


def inspect_calibre(path):
    result = inspect_sqlite(path)
    queries = {
        "authors": "SELECT b.id, b.title, a.name, b.path FROM books b JOIN books_authors_link l ON l.book=b.id JOIN authors a ON a.id=l.author ORDER BY b.id, l.id",
        "tags": "SELECT b.id, b.title, t.name FROM books b JOIN books_tags_link l ON l.book=b.id JOIN tags t ON t.id=l.tag ORDER BY b.id, l.id",
        "custom_values": "SELECT b.id, b.title, c.value FROM books b JOIN custom_column_11 c ON c.book=b.id ORDER BY b.id",
    }
    with sqlite3.connect(path.as_uri() + "?mode=ro&immutable=1", uri=True) as db:
        db.execute("PRAGMA trusted_schema=OFF")
        result["relationship_queries"] = {name: {"sql": sql, "rows": db.execute(sql).fetchall()}
                                           for name, sql in queries.items()}
        result["preferences"] = {key: json.loads(value) for key, value in db.execute("SELECT key,val FROM preferences")}
    return result


def main():
    plan = json.loads((ROOT / "inspection-plan.json").read_text(encoding="utf-8"))
    result_path = ROOT / "artifact-results.json"
    previous = json.loads(result_path.read_text(encoding="utf-8")) if result_path.exists() else {}
    expected = {i["local_path"]: i["sha256"] for i in previous.get("inputs", [])}
    inputs, files = [], {}
    for item in plan["inputs"]:
        repo, path, app = item["repository"], item["path"], item["application"]
        commit = plan["commits"][repo]
        raw = f"https://raw.githubusercontent.com/{repo}/{commit}/{path}"
        local = Path("inputs") / app / path
        dest = ROOT / local
        if dest.exists():
            data = dest.read_bytes()
        else:
            request = urllib.request.Request(raw, headers={"User-Agent": "Sovereign-fixture-inspection"})
            with urllib.request.urlopen(request, timeout=30) as response:
                data = response.read(2_000_001)
            if len(data) > 2_000_000:
                raise ValueError("Input exceeds size limit")
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_bytes(data)
        checksum = digest(data)
        blob_id = git_blob_id(data)
        if item.get("git_blob_sha") and blob_id != item["git_blob_sha"]:
            raise ValueError(f"Downloaded bytes differ from upstream Git tree: {path}")
        if local.as_posix() in expected and expected[local.as_posix()] != checksum:
            raise ValueError(f"Retained input hash mismatch: {local}")
        files[(app, path)] = (data, dest)
        inputs.append({**item, "commit": commit, "raw_url": raw,
                       "url": f"https://github.com/{repo}/blob/{commit}/{path}",
                       "local_path": local.as_posix(), "bytes": len(data), "sha256": checksum,
                       "verified_git_blob_sha": blob_id})
    def data(app, path):
        return files[(app, path)][0]
    def text(app, path):
        return data(app, path).decode("utf-8")
    source_questions = []
    for question in plan["source_questions"]:
        locations = []
        for path, anchors in question["anchors"].items():
            lines = text(question["application"], path).splitlines()
            for anchor in anchors:
                matches = [i + 1 for i, line in enumerate(lines) if anchor in line]
                if not matches:
                    raise AssertionError(f"Missing reviewed source anchor: {question['id']}: {anchor}")
                locations.append({"path": path, "anchor": anchor, "lines": matches})
        source_questions.append({"application": question["application"], "id": question["id"],
                                 "locations": locations, "scope": "Static source inspection only"})
    results = {
        "calibre": inspect_calibre(files[("calibre", "src/calibre/db/tests/metadata.db")][1]),
        "audacity": inspect_sqlite(files[("audacity", "src/project/tests/data/test.aup4")][1]),
        "ardour": inspect_ardour(data("ardour", "libs/ardour/test/profiling/sessions/1region/1region.ardour")),
        "musescore-studio": inspect_mscz(data("musescore-studio", "demos/Amazing_grace.mscz")),
        "zim-wiki": inspect_zim(data("zim-wiki", "tests/data/notebook-wiki.xml"),
                                data("zim-wiki", "tests/data/formats/parsetree.xml"),
                                text("zim-wiki", "tests/data/formats/wiki.txt"),
                                text("zim-wiki", "tests/data/formats/export.markdown")),
        "taskwarrior": inspect_task_literals(text("taskwarrior", "test/import.test.py"))
    }
    report = {"review_date": "2026-10-23", "recorded_at_utc": datetime.now(timezone.utc).isoformat(),
              "python": sys.version, "sqlite": sqlite3.sqlite_version, "platform": platform.platform(),
              "applications_installed_or_executed": False, "upstream_test_suites_executed": False,
              "inputs": inputs, "results": results, "source_questions": source_questions}
    result_path.write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(json.dumps({"retained_inputs": len(inputs), "applications": list(results),
                      "results": str(result_path)}, indent=2))


if __name__ == "__main__":
    main()
