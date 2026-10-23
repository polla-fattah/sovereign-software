"""Retain and verify source bytes for manual E5 review, never execute upstream code.

Default is offline. --fetch downloads missing inputs once. Pinned Git blobs are
checked against the declared tree IDs; dated manuals are hashed, not versioned
as if they were a tested binary. This program verifies provenance, not behavior.
"""
import argparse
from concurrent.futures import ThreadPoolExecutor
import hashlib
import json
from pathlib import Path
import urllib.request

BASE = Path(__file__).resolve().parent
ROOT = BASE.parents[2]


def sha(data):
    return hashlib.sha256(data).hexdigest()


def blob(data):
    return hashlib.sha1(f'blob {len(data)}\0'.encode() + data).hexdigest()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--fetch', action='store_true')
    args = parser.parse_args()
    plan = json.loads((BASE / 'inspection-plan.json').read_text(encoding='utf-8'))

    def inspect(item):
        dest = BASE / item['local_path']
        assert dest.resolve().is_relative_to(BASE)
        if not dest.exists():
            if not args.fetch:
                raise FileNotFoundError(f'{dest}; use --fetch once')
            request = urllib.request.Request(item['raw_url'], headers={'User-Agent': 'sovereign-evidence-audit'})
            with urllib.request.urlopen(request, timeout=25) as response:
                data = response.read(2_000_001)
            assert len(data) <= 2_000_000
            if 'git_blob_sha' in item:
                assert blob(data) == item['git_blob_sha'], item['path']
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_bytes(data)
        data = dest.read_bytes()
        if 'git_blob_sha' in item:
            assert blob(data) == item['git_blob_sha'], item['path']
        return dict(item, bytes=len(data), sha256=sha(data))

    with ThreadPoolExecutor(max_workers=6) as pool:
        inputs = list(pool.map(inspect, plan['inputs']))
    retained = {}
    selected = set(json.loads((BASE / 'plan.json').read_text(encoding='utf-8'))['applications'])
    for manifest in plan['retained_manifests']:
        doc = ROOT / manifest
        for item in json.loads(doc.read_text(encoding='utf-8'))['inputs']:
            if item['application'] not in selected:
                continue
            dest = doc.parent / item['local_path']
            data = dest.read_bytes()
            assert sha(data) == item['sha256'], str(dest)
            if 'git_blob_sha' in item:
                assert blob(data) == item['git_blob_sha'], str(dest)
            relative = dest.relative_to(ROOT).as_posix()
            retained[relative] = dict(item, local_path=relative)
    result = {
        'review_date': '2026-10-24',
        'applications_installed_or_executed': False,
        'upstream_test_suites_executed': False,
        'plan_sha256': sha((BASE / 'plan.json').read_bytes()),
        'inspection_plan_sha256': sha((BASE / 'inspection-plan.json').read_bytes()),
        'runner_sha256': sha(Path(__file__).read_bytes()),
        'inputs': inputs, 'retained_inputs': list(retained.values()),
        'limits': 'Hash verification is not a behavioral test. Control judgments require manual review across callers and risk surfaces. No numerical, restore, platform-trash or plugin execution is claimed.'
    }
    (BASE / 'inspection-results.json').write_text(json.dumps(result, indent=2) + '\n', encoding='utf-8')
    print(json.dumps({'new_inputs': len(inputs), 'reverified_retained': len(retained), 'applications_executed': False}))


if __name__ == '__main__':
    main()
