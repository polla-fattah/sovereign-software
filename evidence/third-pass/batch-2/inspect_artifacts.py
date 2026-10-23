"""Inspect pinned upstream fixtures without installing their applications.

Run from the repository root:
    python evidence/third-pass/batch-2/inspect_artifacts.py

Uses Python's standard library. No downloaded application code is executed.
"""

import base64
from collections import Counter
from datetime import datetime, timezone
import gzip
import hashlib
import io
import json
import math
from pathlib import Path
import platform
import re
import sys
import urllib.request
import xml.etree.ElementTree as ET
import zlib

ROOT = Path(__file__).resolve().parent
COMMITS = {
    "CadQuery/cadquery": "33361dc1b5b70bc83ce36f1b34a01ca85dfca80a",
    "darktable-org/darktable": "6556cd7dbb0e69f95d165dda8b69e7270c327f6d",
    "JabRef/jabref": "1e2e9a089986e317cd7f82f4c0114b8950164925",
    "gnu-octave/octave": "5208f34c2b13b447c68c956be2a0b1d67476a80d",
    "KDE/kdenlive": "80b74ffa95390f4cc8d75a4e886e7ff47373583e",
    "keepassxreboot/keepassxc": "d5e43b779d5e23c23963d53b806dcda5dd38f50e",
}
FIXTURES = [
    ("cadquery", "CadQuery/cadquery", "tests/testdata/red_cube_blue_cylinder.step"),
    ("darktable", "darktable-org/darktable", "src/tests/benchmark/darktable-bench-4.2.xmp"),
    ("jabref", "JabRef/jabref", "jabsrv/src/test/resources/org/jabref/http/server/groups-server-test.bib"),
    ("gnu-octave", "gnu-octave/octave", "examples/data/penny.mat"),
    ("gnu-octave", "gnu-octave/octave", "examples/data/west0479.mat"),
    ("kdenlive", "KDE/kdenlive", "tests/dataset/test-nesting-effects.kdenlive"),
    ("keepassxc", "keepassxreboot/keepassxc", "tests/data/NewDatabase.xml"),
]
SOURCES = [
    ("cadquery", "CadQuery/cadquery", "cadquery/cqgi.py"),
    ("cadquery", "CadQuery/cadquery", "cadquery/occ_impl/exporters/assembly.py"),
    ("darktable", "darktable-org/darktable", "src/common/exif.cc"),
    ("jabref", "JabRef/jabref", "jablib/src/main/java/org/jabref/logic/bibtex/FileFieldWriter.java"),
    ("jabref", "JabRef/jabref", "jablib/src/main/java/org/jabref/logic/exporter/GroupSerializer.java"),
    ("gnu-octave", "gnu-octave/octave", "liboctinterp/load-save/ls-mat-ascii.cc"),
    ("gnu-octave", "gnu-octave/octave", "liboctinterp/load-save/load-save.cc"),
    ("kdenlive", "KDE/kdenlive", "src/project/dialogs/archivewidget.cpp"),
    ("keepassxc", "keepassxreboot/keepassxc", "src/cli/Export.cpp"),
    ("keepassxc", "keepassxreboot/keepassxc", "src/core/Database.cpp"),
    ("keepassxc", "keepassxreboot/keepassxc", "src/format/KeePass2Writer.cpp"),
    ("keepassxc", "keepassxreboot/keepassxc", "src/format/KdbxWriter.cpp"),
    ("keepassxc", "keepassxreboot/keepassxc", "src/format/KdbxXmlWriter.cpp"),
    ("keepassxc", "keepassxreboot/keepassxc", "src/format/CsvExporter.cpp"),
]


def sha256(data):
    return hashlib.sha256(data).hexdigest()


def fetch(application, repo, path, kind):
    commit = COMMITS[repo]
    url = f"https://raw.githubusercontent.com/{repo}/{commit}/{path}"
    request = urllib.request.Request(url, headers={"User-Agent": "Sovereign-evidence-inspection"})
    with urllib.request.urlopen(request, timeout=30) as response:
        data = response.read(2_000_001)
    if len(data) > 2_000_000:
        raise ValueError("Input exceeds size limit")
    destination = ROOT / "inputs" / kind / application / path
    destination.parent.mkdir(parents=True, exist_ok=True)
    if destination.exists() and destination.read_bytes() != data:
        raise ValueError(f"Retained input differs: {destination}")
    destination.write_bytes(data)
    return data, {"application": application, "repository": repo, "commit": commit,
        "path": path, "url": url, "local_path": destination.relative_to(ROOT).as_posix(),
        "bytes": len(data), "sha256": sha256(data)}


def inspect_step(data):
    text = data.decode("utf-8")
    types = Counter(re.findall(r"#\d+\s*=\s*([A-Z_0-9]+)\s*\(", text))
    return {"iso_10303_21": text.lstrip().startswith("ISO-10303-21;"),
        "entity_types": dict(sorted(types.items())),
        "products": re.findall(r"PRODUCT\s*\(\s*'([^']*)'\s*,\s*'([^']*)'", text),
        "colour_records": re.findall(r"COLOUR_RGB\s*\([^;]+", text),
        "geometry_reconstructed": False}


def inspect_xmp(data):
    root = ET.fromstring(data)
    dt = "{http://darktable.sf.net/}"
    rdf = "{http://www.w3.org/1999/02/22-rdf-syntax-ns#}"
    histories = root.findall(f".//{dt}history/{rdf}Seq/{rdf}li")
    decoded = []
    for node in root.iter():
        for key, value in node.attrib.items():
            if key.startswith(dt) and key[len(dt):] in {"params", "blendop_params", "mask_points", "mask_src"} and value:
                compressed = value.startswith("gz")
                binary = zlib.decompress(base64.b64decode(value[4:])) if compressed else bytes.fromhex(value)
                decoded.append({"property": key[len(dt):], "compressed": compressed,
                    "bytes": len(binary), "sha256": sha256(binary)})
    return {"root_tag": root.tag, "history_count": len(histories),
        "operations": [node.get(dt + "operation") for node in histories],
        "module_versions": sorted({node.get(dt + "modversion", "") for node in histories}),
        "decoded_parameter_blocks": decoded, "image_rendered": False}


def inspect_bib(data):
    text = data.decode("utf-8")
    groups = []
    for match in re.finditer(r"^(\d+) (\w+):([^\n]+)", text, re.M):
        level, kind, payload = match.groups()
        groups.append({"depth": int(level), "kind": kind,
            "name": payload.split(r"\;", 1)[0].rstrip(";")})
    return {"entries": [{"type": m[0], "key": m[1]} for m in
        re.findall(r"@(Article|Misc)\{([^,]+),", text, re.I)],
        "groups": groups, "jabref_meta_comment_present": "@Comment{jabref-meta: grouping:" in text,
        "full_bibtex_parser_executed": False}


def inspect_mat(data):
    text = data.decode("utf-8")
    header = dict(re.findall(r"^# (name|type|rows|columns|nnz): (.+)$", text, re.M))
    rows, columns = int(header["rows"]), int(header["columns"])
    body = [line.split() for line in text.splitlines() if line.strip() and not line.startswith("#")]
    sparse = header["type"] == "sparse matrix"
    if sparse:
        if len(body) != int(header["nnz"]) or any(len(line) != 3 for line in body):
            raise ValueError("Sparse matrix dimensions do not match payload")
        coordinates = [(int(line[0]), int(line[1])) for line in body]
        if len(set(coordinates)) != len(coordinates) or not all(1 <= r <= rows and 1 <= c <= columns for r, c in coordinates):
            raise ValueError("Invalid sparse matrix coordinates")
        values = [float(line[2]) for line in body]
    else:
        if header["type"] != "matrix" or len(body) != rows or any(len(line) != columns for line in body):
            raise ValueError("Matrix dimensions do not match payload")
        values = [float(token) for line in body for token in line]
    return {"file_format": "Octave text, despite .mat extension", "creator_header": text.splitlines()[0],
        "name": header["name"], "type": header["type"], "shape": [rows, columns],
        "stored_values": len(values), "min_stored": min(values), "max_stored": max(values),
        "sum": math.fsum(values), "dimensions_validated": True, "octave_executed": False}


def inspect_kdenlive(data):
    root = ET.fromstring(data)
    names = Counter(node.tag for node in root.iter())
    return {"root_tag": root.tag, "mlt_version": root.get("version"),
        "element_counts": dict(sorted(names.items())),
        "resource_values": sorted({node.text or "" for node in root.findall(".//property[@name='resource']")}),
        "document_versions": [node.text for node in root.findall(".//property[@name='kdenlive:docproperties.version']")],
        "filters": [{"id": node.get("id"), "in": node.get("in"), "out": node.get("out"),
            "properties": {p.get("name"): p.text for p in node.findall("property")}} for node in root.findall(".//filter")],
        "video_rendered": False}


def inspect_keepass(data):
    root = ET.fromstring(data)
    binaries = []
    for binary in root.findall("./Meta/Binaries/Binary"):
        decoded = base64.b64decode(binary.text)
        if binary.get("Compressed") == "True":
            decoded = gzip.decompress(decoded)
        binaries.append({"id": binary.get("ID"), "bytes": len(decoded), "sha256": sha256(decoded)})
    references = [{"key": node.findtext("Key"), "ref": node.find("Value").get("Ref")}
        for node in root.findall(".//Entry/Binary")]
    return {"root_tag": root.tag, "generator": root.findtext("./Meta/Generator"),
        "group_count": len(root.findall(".//Group")),
        "entry_count_including_history": len(root.findall(".//Entry")),
        "history_entry_count": len(root.findall(".//History/Entry")),
        "binary_payloads": binaries, "attachment_references": references,
        "all_attachment_refs_resolve": all(r["ref"] in {b["id"] for b in binaries} for r in references),
        "encrypted_vault_opened": False}


def main():
    inspectors = {"cadquery": inspect_step, "darktable": inspect_xmp, "jabref": inspect_bib,
        "gnu-octave": inspect_mat, "kdenlive": inspect_kdenlive, "keepassxc": inspect_keepass}
    report = {"observed_at_utc": datetime.now(timezone.utc).isoformat(),
        "python": sys.version, "platform": platform.platform(),
        "target_applications_executed": False, "fixtures": [], "sources": []}
    for application, repo, path in FIXTURES:
        data, record = fetch(application, repo, path, "fixtures")
        record["inspection"] = inspectors[application](data)
        report["fixtures"].append(record)
    for application, repo, path in SOURCES:
        _, record = fetch(application, repo, path, "source")
        report["sources"].append(record)
    output = ROOT / "artifact-results.json"
    output.write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(json.dumps({"report": str(output), "fixtures": report["fixtures"],
        "source_files_retained": len(report["sources"])}, indent=2))


if __name__ == "__main__":
    main()
