"""Retain and inspect pinned upstream source; never import or execute it.

Run: python evidence/third-pass/batch-3/inspect_sources.py
Existing inputs are checked against the previous result hashes and reused offline.
Source anchors reproduce the locations reviewed, not application behaviour tests.
"""

import ast
from datetime import datetime, timezone
import hashlib
import json
from pathlib import Path
import platform
import sys
import urllib.request

ROOT = Path(__file__).resolve().parent


def digest(data):
    return hashlib.sha256(data).hexdigest()


def inspect():
    plan = json.loads((ROOT / "inspection-plan.json").read_text(encoding="utf-8"))
    result_path = ROOT / "source-results.json"
    previous = json.loads(result_path.read_text(encoding="utf-8")) if result_path.exists() else {}
    expected = {item["local_path"]: item["sha256"] for item in previous.get("inputs", [])}
    retained, texts = [], {}
    for item in plan["inputs"]:
        app, repo, path = item["application"], item["repository"], item["path"]
        commit = plan["commits"][repo]
        if app == "forgejo":
            raw = f"https://codeberg.org/{repo}/raw/commit/{commit}/{path}"
            source = f"https://codeberg.org/{repo}/src/commit/{commit}/{path}"
        else:
            raw = f"https://raw.githubusercontent.com/{repo}/{commit}/{path}"
            source = f"https://github.com/{repo}/blob/{commit}/{path}"
        local = Path("inputs") / app / path
        destination = ROOT / local
        if destination.exists():
            data = destination.read_bytes()
        else:
            request = urllib.request.Request(raw, headers={"User-Agent": "Sovereign-source-review"})
            with urllib.request.urlopen(request, timeout=30) as response:
                data = response.read(2_000_001)
            if len(data) > 2_000_000:
                raise ValueError(f"Input too large: {path}")
            destination.parent.mkdir(parents=True, exist_ok=True)
            destination.write_bytes(data)
        checksum = digest(data)
        if local.as_posix() in expected and expected[local.as_posix()] != checksum:
            raise ValueError(f"Retained source hash mismatch: {local}")
        texts[(app, path)] = data.decode("utf-8")
        retained.append({**item, "commit": commit, "url": source, "raw_url": raw,
                         "local_path": local.as_posix(), "bytes": len(data), "sha256": checksum})

    questions = []
    for question in plan["questions"]:
        locations = []
        for path, anchors in question["anchors"].items():
            lines = texts[(question["application"], path)].splitlines()
            for anchor in anchors:
                matches = [i + 1 for i, line in enumerate(lines) if anchor in line]
                if not matches:
                    raise AssertionError(f"Missing reviewed anchor {question['id']}: {anchor}")
                locations.append({"path": path, "anchor": anchor, "lines": matches})
        questions.append({"application": question["application"], "id": question["id"],
                          "anchors_found": True, "locations": locations,
                          "scope": "Static source inspection; not an executed application test"})

    exporter = ast.parse(texts[("paperless-ngx", "src/documents/management/commands/document_exporter.py")])
    queries = next(n.value for n in ast.walk(exporter) if isinstance(n, ast.AnnAssign)
                   and isinstance(n.target, ast.Name) and n.target.id == "manifest_key_to_object_query")
    manifest_queries = {ast.literal_eval(k): ast.unparse(v) for k, v in zip(queries.keys, queries.values)}
    mixins = ast.parse(texts[("paperless-ngx", "src/documents/management/commands/mixins.py")])
    secret_fields = ast.literal_eval(next(n.value for n in ast.walk(mixins)
                                        if isinstance(n, ast.AnnAssign)
                                        and isinstance(n.target, ast.Name) and n.target.id == "CRYPT_FIELDS"))
    schema = json.loads(texts[("gitea", "modules/migration/schemas/issue.json")])
    results = {"review_date": "2026-10-23", "recorded_at_utc": datetime.now(timezone.utc).isoformat(),
               "python": sys.version, "platform": platform.platform(),
               "applications_installed_or_executed": False, "upstream_test_suites_executed": False,
               "inspection_plan_sha256": digest((ROOT / "inspection-plan.json").read_bytes()),
               "inputs": retained, "resolved_source_questions": questions,
               "parsed_structures": {"paperless_manifest_queries": manifest_queries,
                                     "paperless_encrypted_fields": secret_fields,
                                     "gitea_issue_schema": schema}}
    result_path.write_text(json.dumps(results, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(json.dumps({"retained_inputs": len(retained), "resolved_source_questions": len(questions),
                      "paperless_manifest_query_groups": len(manifest_queries),
                      "result": str(result_path)}, indent=2))


if __name__ == "__main__":
    inspect()
