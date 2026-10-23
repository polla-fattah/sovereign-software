"""Reproduce batches 6-12 using pinned public inputs, without importing target code.

Run: python evidence/third-pass/inspect_remaining.py 6
Source-anchor checks locate reviewed code; they are not application behaviour tests.
"""

from collections import Counter
from contextlib import closing
from datetime import datetime, timezone
from fractions import Fraction
import gzip
import hashlib
import io
import json
from pathlib import Path
import re
import sqlite3
import shutil
import sys
import tempfile
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
import zipfile

ROOT = Path(__file__).resolve().parent


def sha(data):
    return hashlib.sha256(data).hexdigest()


def inspect(data, kind):
    if kind == "gzip-xml":
        data = gzip.decompress(data)
        kind = "xml"
    if kind == "json":
        obj = json.loads(data)
        result = {"root_type": type(obj).__name__, "value": obj}
        if isinstance(obj, dict) and "nodes" in obj and "edges" in obj:
            ids = {n["id"] for n in obj["nodes"]}
            result["unresolved_edge_nodes"] = [e for e in obj["edges"]
                if e.get("fromNode") not in ids or e.get("toNode") not in ids]
        return result
    if kind == "xml":
        root = ET.fromstring(data)
        return {"root": root.tag, "attributes": root.attrib,
                "element_counts": dict(Counter(e.tag for e in root.iter())),
                "text": " ".join(root.itertext())[:4000],
                "selected_attributes": [e.attrib for e in root.iter() if e.attrib][:80]}
    if kind == "gnucash":
        root = ET.fromstring(data)
        local = lambda e: e.tag.rsplit("}", 1)[-1]
        def value(parent, name):
            return next((e.text for e in parent if local(e) == name), None)
        accounts = {value(e, "id"): value(e, "name") for e in root.iter()
                    if local(e) == "account" and any(local(c) == "id" for c in e)}
        transactions = []
        for transaction in root.iter():
            if local(transaction) != "transaction":
                continue
            splits = [e for e in transaction.iter() if local(e) == "split"]
            if not splits:
                continue
            transactions.append({"id": value(transaction, "id"),
                "description": value(transaction, "description"), "splits": len(splits),
                "value_sum": str(sum((Fraction(value(s, "value")) for s in splits), Fraction(0))),
                "account_refs": [value(s, "account") for s in splits]})
        return {"accounts": accounts, "transactions": transactions,
                "all_value_sums_zero": all(t["value_sum"] == "0" for t in transactions),
                "unresolved_account_refs": sorted({v for t in transactions for v in t["account_refs"] if v not in accounts}),
                "prices_schedules_budgets_or_reconcile_semantics_validated": False}
    if kind == "zip-xml":
        with zipfile.ZipFile(io.BytesIO(data)) as archive:
            infos = archive.infolist()
            if len(infos) > 1000 or sum(i.file_size for i in infos) > 20_000_000:
                raise ValueError("Archive exceeds bounded inspection size")
            return {"members": [{"name": i.filename, "bytes": i.file_size} for i in infos],
                    "xml": {i.filename: inspect(archive.read(i), "xml") for i in infos
                            if i.filename in ("content.xml", "META-INF/manifest.xml", "meta.xml", "styles.xml")}}
    if kind == "sqlite":
        with closing(sqlite3.connect(":memory:")) as db:
            db.deserialize(data)
            db.execute("PRAGMA query_only=ON")
            db.execute("PRAGMA trusted_schema=OFF")
            result = {"integrity_check": db.execute("PRAGMA integrity_check").fetchall(),
                      "schema": db.execute("SELECT name,type,sql FROM sqlite_master ORDER BY name").fetchall()}
            if db.execute("SELECT count(*) FROM sqlite_master WHERE name='gpkg_contents'").fetchone()[0]:
                result["gpkg_contents"] = db.execute("SELECT * FROM gpkg_contents").fetchall()
                result["gpkg_geometry_columns"] = db.execute("SELECT * FROM gpkg_geometry_columns").fetchall()
                result["gpkg_spatial_ref_sys"] = db.execute("SELECT srs_name,srs_id,organization,organization_coordsys_id FROM gpkg_spatial_ref_sys").fetchall()
                tables = db.execute("SELECT table_name FROM gpkg_contents WHERE data_type='features'").fetchall()
                result["feature_rows"] = {t: db.execute('SELECT count(*) FROM "' + t.replace('"', '""') + '"').fetchone()[0] for (t,) in tables}
                result["geometry_decoded_or_gdal_roundtrip_tested"] = False
            return result
    text = data.decode("utf-8")
    if kind == "sql-schema":
        with closing(sqlite3.connect(":memory:")) as db:
            db.set_authorizer(lambda action, a, b, c, d: sqlite3.SQLITE_DENY
                if action in (sqlite3.SQLITE_ATTACH, sqlite3.SQLITE_DETACH) else sqlite3.SQLITE_OK)
            db.executescript(text)
            return {"schema": db.execute("SELECT name,type,sql FROM sqlite_master ORDER BY name").fetchall(),
                    "integrity_check": db.execute("PRAGMA integrity_check").fetchall(),
                    "populated_application_data_restored": False}
    if kind == "todo-spec":
        blocks = re.findall(r"```[^\n]*\n(.*?)```", text, re.S)
        return {"published_example_blocks": blocks, "clients_executed": False}
    if kind == "org":
        return {"headings": re.findall(r"^(\*+) (.*)$", text, re.M),
                "links": re.findall(r"\[\[([^\]]+)\]", text),
                "properties": re.findall(r"^:([A-Za-z_]+):\s*(.*)$", text, re.M),
                "source_languages": re.findall(r"^#\+begin_src\s+(\S+)", text, re.M | re.I),
                "executed": False}
    if kind == "ledger":
        return {"dated_directives": re.findall(r"^(\d{4}[-/]\d{2}[-/]\d{2})\s+(.+)$", text, re.M),
                "posting_lines": [line for line in text.splitlines() if re.match(r"^\s+[A-Z][A-Za-z0-9:-]+\s+", line)],
                "cost_literals": re.findall(r"\{[^}]+\}", text), "balances_recomputed": False}
    if kind == "todo":
        return {"lines": text.splitlines(),
                "completion_markers": sum(line.startswith("x ") for line in text.splitlines())}
    return {"characters": len(text), "lines": len(text.splitlines()), "executed": False}


def sqlite_experiment():
    with tempfile.TemporaryDirectory(prefix="sovereign-sqlite-") as folder:
        root = Path(folder)
        source = root / "source.sqlite"
        db = sqlite3.connect(source)
        db.execute("PRAGMA journal_mode=WAL")
        db.execute("PRAGMA wal_autocheckpoint=0")
        db.executescript("""PRAGMA foreign_keys=ON;
CREATE TABLE parent(id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE child(id INTEGER PRIMARY KEY, parent_id REFERENCES parent(id), payload BLOB, flexible);
CREATE TABLE audit(event TEXT);
CREATE VIEW joined AS SELECT child.id,parent.name FROM child JOIN parent ON child.parent_id=parent.id;
CREATE TRIGGER child_audit AFTER INSERT ON child BEGIN INSERT INTO audit VALUES ('insert'); END;
INSERT INTO parent VALUES(1,'example');
INSERT INTO child VALUES(1,1,X'00FF','text'),(2,1,X'4142',12.5);
""")
        db.commit()
        shutil.copyfile(source, root / "main-only.sqlite")
        with closing(sqlite3.connect(root / "main-only.sqlite")) as main_only:
            copied_tables = main_only.execute("SELECT name FROM sqlite_master WHERE type='table'").fetchall()
        with closing(sqlite3.connect(root / "backup.sqlite")) as backup:
            db.backup(backup)
            backup_count = backup.execute("SELECT count(*) FROM child").fetchone()[0]
            backup_integrity = backup.execute("PRAGMA integrity_check").fetchall()
        dump = "\n".join(db.iterdump())
        with closing(sqlite3.connect(":memory:")) as restored:
            restored.executescript(dump)
            rows = restored.execute("SELECT id,hex(payload),typeof(flexible),flexible FROM child ORDER BY id").fetchall()
            original = db.execute("SELECT id,hex(payload),typeof(flexible),flexible FROM child ORDER BY id").fetchall()
            same = rows == original
            foreign_keys = restored.execute("PRAGMA foreign_key_check").fetchall()
            view = restored.execute("SELECT * FROM joined ORDER BY id").fetchall()
            triggers = restored.execute("SELECT count(*) FROM sqlite_master WHERE type='trigger'").fetchone()[0]
        db.close()
        assert same and backup_count == 2 and backup_integrity == [("ok",)] and not foreign_keys
        return {"runtime": "Python bundled SQLite", "version": sqlite3.sqlite_version,
                "not_a_test_of_pinned_current_upstream_commit": True,
                "main_file_only_tables_while_wal_open": copied_tables, "backup_child_rows": backup_count,
                "backup_integrity": backup_integrity, "dump_restore_rows_equal": same,
                "restored_rows": rows, "restored_view": view, "restored_trigger_count": triggers,
                "foreign_key_check": foreign_keys, "source_dump_sha256": sha(dump.encode())}


def main():
    batch = int(sys.argv[1])
    dest = ROOT / f"batch-{batch}"
    plan_path = dest / "inspection-plan.json"
    plan = json.loads(plan_path.read_text(encoding="utf-8"))
    report_path = dest / "artifact-results.json"
    prior = json.loads(report_path.read_text(encoding="utf-8")) if report_path.exists() else {}
    prior_hashes = {x["local_path"]: x["sha256"] for x in prior.get("inputs", [])}
    inputs, observations, texts = [], {}, {}
    for item in plan["inputs"]:
        local = Path("inputs") / item["application"] / item["path"]
        path = dest / local
        if path.exists():
            data = path.read_bytes()
        else:
            if "--offline" in sys.argv:
                raise FileNotFoundError("Retained input missing in offline mode: " + str(path))
            request = urllib.request.Request(urllib.parse.quote(item["raw_url"], safe=":/?=&%!"),
                headers={"User-Agent": "Sovereign-evidence-review"})
            with urllib.request.urlopen(request, timeout=30) as response:
                data = response.read(5_000_001)
            if len(data) > 5_000_000:
                raise ValueError(f"Input exceeds limit: {item['path']}")
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_bytes(data)
        if item.get("git_blob_sha"):
            blob = hashlib.sha1(b"blob " + str(len(data)).encode() + b"\0" + data).hexdigest()
            if blob != item["git_blob_sha"]:
                raise ValueError(f"Git object mismatch: {item['path']}")
        checksum = sha(data)
        if local.as_posix() in prior_hashes and checksum != prior_hashes[local.as_posix()]:
            raise ValueError(f"Retained file mismatch: {item['path']}")
        inputs.append({**item, "local_path": local.as_posix(), "bytes": len(data), "sha256": checksum})
        if item.get("probe"):
            observations[item["application"] + ":" + item["path"]] = inspect(data, item["probe"])
        else:
            texts[(item["application"], item["path"])] = data.decode("utf-8")
    questions = []
    for question in plan.get("source_questions", []):
        matches = []
        for path, anchors in question["anchors"].items():
            content = texts.get((question["application"], path))
            if content is None:
                content = (dest / "inputs" / question["application"] / path).read_text(encoding="utf-8")
            lines = content.splitlines()
            for anchor in anchors:
                found = [i+1 for i, line in enumerate(lines) if anchor in line]
                if not found:
                    raise AssertionError(f"Missing reviewed anchor {question['application']}: {anchor}")
                matches.append({"path": path, "anchor": anchor, "lines": found})
        questions.append({**question, "locations": matches, "scope": "Static inspection, not execution"})
    report = {"batch": batch, "review_date": "2026-10-23",
              "recorded_at_utc": datetime.now(timezone.utc).isoformat(), "python": sys.version,
              "applications_executed": False, "downloaded_application_implementation_executed": False,
              "published_schema_ddl_executed": any(i.get("probe") == "sql-schema" for i in plan["inputs"]),
              "sqlite_reader_version": sqlite3.sqlite_version,
              "inspection_code_sha256": sha(Path(__file__).read_bytes()),
              "rating_reconciliation": "Deferred to the next pass at the user's request",
              "inputs": inputs, "observations": observations, "source_questions": questions}
    if plan.get("sqlite_library_experiment"):
        report["applications_executed"] = True
        report["sqlite_library_experiment"] = sqlite_experiment()
        report["executed_components"] = ["Python bundled SQLite " + sqlite3.sqlite_version]
    if plan.get("available_tool_experiments"):
        report["runtime_check_code_sha256"] = sha((ROOT / "remaining_runtime_checks.py").read_bytes())
        from remaining_runtime_checks import git_checks, hugo_checks
        report["runtime_checks"] = {"git": git_checks(), "hugo": hugo_checks()}
        report["executed_components"] = [r.get("runtime_version") for r in report["runtime_checks"].values() if r.get("available")]
        report["applications_executed"] = bool(report["executed_components"])
    report_path.write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(json.dumps({"batch": batch, "inputs": len(inputs), "artifact_probes": len(observations),
                      "source_questions": len(questions), "result": str(report_path)}))


if __name__ == "__main__":
    main()
