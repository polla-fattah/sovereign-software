"""Read pinned public graphics/CAD samples without installing their applications.

Run: python evidence/third-pass/batch-5/inspect_artifacts.py
Downloaded code is inspected as text, never executed. Archives are not extracted.
"""

from collections import Counter
from datetime import datetime, timezone
import base64
import hashlib
import io
import json
from pathlib import Path
import platform
import re
import struct
import sys
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
import zipfile

ROOT = Path(__file__).resolve().parent


def digest(data):
    return hashlib.sha256(data).hexdigest()


def archive(data):
    z = zipfile.ZipFile(io.BytesIO(data))
    if len(z.infolist()) > 1000 or sum(i.file_size for i in z.infolist()) > 20_000_000:
        raise ValueError("Archive exceeds inspection limits")
    return z


def svg(data):
    root = ET.fromstring(data)
    ink = "{http://www.inkscape.org/namespaces/inkscape}"
    links, embedded = [], []
    for element in root.iter():
        for key, value in element.attrib.items():
            if key.rsplit("}", 1)[-1] != "href":
                continue
            if value.startswith("data:") and ";base64," in value:
                header, payload = value.split(",", 1)
                decoded = base64.b64decode(payload)
                embedded.append({"element": element.tag, "media_type": header,
                                 "bytes": len(decoded), "sha256": digest(decoded)})
            else:
                links.append(value)
    return {"root": root.tag, "creator_version": root.get(ink + "version"),
            "element_counts": dict(Counter(e.tag.rsplit("}", 1)[-1] for e in root.iter())),
            "layers": [dict(e.attrib) for e in root.iter() if e.get(ink + "groupmode") == "layer"],
            "path_effects": [dict(e.attrib) for e in root.iter() if e.tag == ink + "path-effect"],
            "editor_attributes": sorted({key for e in root.iter() for key in e.attrib
                                          if key.startswith(ink) or "sodipodi" in key}),
            "hrefs": links, "embedded_payloads": embedded, "rendered": False}


def kra(data):
    with archive(data) as z:
        root = ET.fromstring(z.read("maindoc.xml"))
        names = z.namelist()
        return {"members": [{"name": i.filename, "bytes": i.file_size} for i in z.infolist()],
                "xml_root": root.tag, "document_attributes": root.attrib,
                "image_attributes": [e.attrib for e in root.iter() if e.tag.rsplit("}", 1)[-1].lower() == "image"],
                "layers": [e.attrib for e in root.iter() if e.tag.rsplit("}", 1)[-1].lower() == "layer"],
                "merged_preview_present": "mergedimage.png" in names,
                "pixels_decoded_or_document_rebuilt": False}


def xcf(data):
    header = data[:14]
    if header != b"gimp xcf file\x00":
        raise ValueError("This bounded parser handles only the legacy version-0 fixture")
    width, height, base_type = struct.unpack_from(">III", data, 14)
    pos = 26
    properties = []
    while True:
        prop, size = struct.unpack_from(">II", data, pos)
        pos += 8
        if prop == 0:
            break
        if pos + size > len(data):
            raise ValueError("Out-of-range XCF property")
        properties.append({"type": prop, "bytes": size})
        pos += size
    offsets = []
    while True:
        offset = struct.unpack_from(">I", data, pos)[0]
        pos += 4
        if not offset:
            break
        offsets.append(offset)
    layers = []
    for offset in offsets:
        lw, lh, layer_type, name_length = struct.unpack_from(">IIII", data, offset)
        start = offset + 16
        if start + name_length > len(data):
            raise ValueError("Out-of-range layer name")
        layers.append({"offset": offset, "width": lw, "height": lh, "type": layer_type,
                       "name": data[start:start + name_length].rstrip(b"\x00").decode("utf-8")})
    return {"header": header.decode("ascii").rstrip("\x00"), "width": width, "height": height,
            "base_type": base_type, "properties": properties, "layers": layers,
            "pixels_decoded_or_document_rebuilt": False}


def sexpr(data):
    tokens = re.findall(r'"(?:\\.|[^"\\])*"|[()]|[^\s()]+', data.decode("utf-8"))
    stack, roots = [], []
    for token in tokens:
        if token == "(":
            node = []
            (stack[-1] if stack else roots).append(node)
            stack.append(node)
        elif token == ")":
            if not stack:
                raise ValueError("Unbalanced S-expression")
            stack.pop()
        else:
            if not stack:
                raise ValueError("Atom outside S-expression")
            stack[-1].append(json.loads(token) if token.startswith('"') else token)
    if stack or len(roots) != 1:
        raise ValueError("Incomplete S-expression")
    root = roots[0]
    def walk(node):
        yield node
        for child in node:
            if isinstance(child, list):
                yield from walk(child)
    nodes = list(walk(root))
    nets = {n[1]: n[2] for n in root if isinstance(n, list) and n and n[0] == "net"}
    pad_nets = [n for node in nodes if node and node[0] == "pad"
                for n in node if isinstance(n, list) and n and n[0] == "net"]
    return {"root": root[0], "version": next(n[1] for n in root if isinstance(n, list) and n[0] == "version"),
            "record_counts": dict(Counter(n[0] for n in nodes if n and isinstance(n[0], str))),
            "nets": nets, "pad_net_references": pad_nets,
            "unresolved_pad_net_ids": sorted({n[1] for n in pad_nets if n[1] not in nets}),
            "model_references": [n[1] for n in nodes if n and n[0] == "model"],
            "electrical_rules_or_manufacturing_checked": False}


def three_mf(data):
    if not data.startswith(b"PK"):
        try:
            root = ET.fromstring(data)
        except ET.ParseError as error:
            text = data.decode("utf-8")
            return {"container_format": "Normalized regression text, not a packaged 3MF",
                    "xml_parse_error": str(error),
                    "raw_element_counts": dict(Counter(re.findall(r"<([\w:.-]+)(?:\s|>)", text))),
                    "raw_colour_attributes": re.findall(r'(?:displaycolor|color)="([^"]*)"', text)}
        return {"container_format": "Plain XML regression expectation, not a packaged 3MF",
                "attributes": root.attrib,
                "counts": dict(Counter(e.tag.rsplit("}", 1)[-1] for e in root.iter())),
                "colour_records": [e.attrib for e in root.iter() if e.tag.rsplit("}", 1)[-1] in ("color", "base")]}
    with archive(data) as z:
        models = []
        for name in z.namelist():
            if not name.endswith(".model"):
                continue
            root = ET.fromstring(z.read(name))
            ns = {"m": root.tag.split("}")[0].strip("{")}
            models.append({"name": name, "attributes": root.attrib,
                "counts": dict(Counter(e.tag.rsplit("}", 1)[-1] for e in root.iter())),
                "build_items": [e.attrib for e in root.findall(".//m:build/m:item", ns)],
                "colour_records": [e.attrib for e in root.iter()
                                   if e.tag.rsplit("}", 1)[-1] in ("color", "base")],
                "triangle_properties": [e.attrib for e in root.iter()
                                        if e.tag.endswith("}triangle") and ("pid" in e.attrib or "p1" in e.attrib)]})
        return {"container_format": "ZIP", "members": z.namelist(), "models": models, "geometry_reconstructed": False}


def binary_stl(data):
    count = struct.unpack_from("<I", data, 80)[0]
    if len(data) != 84 + 50 * count:
        raise ValueError("STL triangle count/length mismatch")
    triangles = [struct.unpack_from("<12fH", data, 84 + 50 * i) for i in range(count)]
    return {"header": data[:80].rstrip(b"\x00").decode("ascii"),
            "triangles": count, "attribute_values": sorted({t[-1] for t in triangles}),
            "units_or_source_parameters": "No semantic unit or source-parameter fields decoded from this format"}


def main():
    plan = json.loads((ROOT / "inspection-plan.json").read_text(encoding="utf-8"))
    result_path = ROOT / "artifact-results.json"
    previous = json.loads(result_path.read_text(encoding="utf-8")) if result_path.exists() else {}
    hashes = {i["local_path"]: i["sha256"] for i in previous.get("inputs", [])}
    files, inputs = {}, []
    for item in plan["inputs"]:
        repo, commit, path = item["repository"], item["commit"], item["path"]
        if item["host"] == "gitlab":
            url = f"https://gitlab.com/{repo}/-/raw/{commit}/{path}"
            source = f"https://gitlab.com/{repo}/-/blob/{commit}/{path}"
        else:
            url = f"https://raw.githubusercontent.com/{repo}/{commit}/{path}"
            source = f"https://github.com/{repo}/blob/{commit}/{path}"
        local = Path("inputs") / item["application"] / path
        dest = ROOT / local
        if dest.exists():
            data = dest.read_bytes()
        else:
            request = urllib.request.Request(urllib.parse.quote(url, safe=":/"), headers={"User-Agent": "Sovereign-evidence-review"})
            with urllib.request.urlopen(request, timeout=30) as response:
                data = response.read(2_000_001)
            if len(data) > 2_000_000:
                raise ValueError("Input exceeds size limit")
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_bytes(data)
        blob = hashlib.sha1(b"blob " + str(len(data)).encode("ascii") + b"\0" + data).hexdigest()
        if blob != item["git_blob_sha"]:
            raise ValueError(f"Bytes differ from pinned Git object: {path}")
        checksum = digest(data)
        if local.as_posix() in hashes and checksum != hashes[local.as_posix()]:
            raise ValueError(f"Retained input hash mismatch: {path}")
        inputs.append({**item, "url": source, "raw_url": url, "local_path": local.as_posix(),
                       "sha256": checksum, "bytes": len(data)})
        files[(item["application"], path)] = data
    def get(app, suffix):
        return next(data for (a, path), data in files.items() if a == app and path.endswith(suffix))
    observations = {
        "inkscape": {"gears": svg(get("inkscape", "gears.svg")), "embedded": svg(get("inkscape", "data_uri.svg"))},
        "krita": kra(get("krita", "store_test.kra")),
        "gimp": xcf(get("gimp", ".xcf")),
        "kicad": sexpr(get("kicad", ".kicad_pcb")),
        "openscad": {"3mf_colour_expectation": three_mf(get("openscad", "lazyunion-color-cubes-expected.3mf")),
                     "3mf_archive": three_mf(get("openscad", "import.3mf")),
                     "stl": binary_stl(get("openscad", ".stl"))},
    }
    source_locations = []
    for question in plan.get("source_questions", []):
        locations = []
        for path, anchors in question["anchors"].items():
            lines = files[(question["application"], path)].decode("utf-8").splitlines()
            for anchor in anchors:
                matches = [i+1 for i, line in enumerate(lines) if anchor in line]
                if not matches:
                    raise AssertionError(f"Reviewed source anchor missing: {anchor}")
                locations.append({"path": path, "anchor": anchor, "lines": matches})
        source_locations.append({**question, "locations": locations})
    result = {"review_date": plan["review_date"], "recorded_at_utc": datetime.now(timezone.utc).isoformat(),
              "python": sys.version, "platform": platform.platform(), "applications_executed": False,
              "ratings_reconciliation": plan["ratings_reconciliation"], "inputs": inputs,
              "observations": observations, "source_locations": source_locations}
    result_path.write_text(json.dumps(result, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(json.dumps({"inputs": len(inputs), "observed_applications": list(observations),
                      "result": str(result_path)}, indent=2))


if __name__ == "__main__":
    main()
