"""Recheck retained fixtures and pinned control source without installing target apps.

Default is offline; --fetch retrieves missing pinned source after Git blob checking.
The imported helper is our earlier standard-library inspection script, not upstream
application implementation. It is loaded without invoking its main/write routine.
"""
import argparse
import hashlib
import importlib.util
import json
from pathlib import Path
import platform
import sqlite3
import sys
import urllib.request

BASE = Path(__file__).resolve().parent
ROOT = BASE.parents[2]
OLD = ROOT / 'evidence/third-pass/batch-4'


def sha(data):
    return hashlib.sha256(data).hexdigest()


def blob(data):
    return hashlib.sha1(f'blob {len(data)}\0'.encode() + data).hexdigest()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--fetch', action='store_true')
    args = parser.parse_args()
    plan = json.loads((BASE / 'inspection-plan.json').read_text(encoding='utf-8'))
    inputs = []
    for item in plan['inputs']:
        dest = BASE / item['local_path']
        assert dest.resolve().is_relative_to(BASE)
        if not dest.exists():
            if not args.fetch:
                raise FileNotFoundError(f'{dest}; use --fetch once')
            request = urllib.request.Request(item['raw_url'], headers={'User-Agent': 'sovereign-evidence-audit'})
            with urllib.request.urlopen(request, timeout=30) as response:
                data = response.read(2_000_001)
            assert len(data) <= 2_000_000
            assert blob(data) == item['git_blob_sha'], item['path']
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_bytes(data)
        data = dest.read_bytes()
        assert blob(data) == item['git_blob_sha'], item['path']
        inputs.append(dict(item, bytes=len(data), sha256=sha(data)))

    previous = json.loads((OLD / 'artifact-results.json').read_text(encoding='utf-8'))
    retained = []
    files = {}
    for item in previous['inputs']:
        dest = OLD / item['local_path']
        data = dest.read_bytes()
        assert sha(data) == item['sha256'], item['path']
        assert blob(data) == item['git_blob_sha'], item['path']
        retained.append({'application': item['application'], 'local_path': dest.relative_to(ROOT).as_posix(),
                         'sha256': sha(data), 'git_blob_sha': blob(data), 'bytes': len(data), 'url': item['url']})
        files[(item['application'], item['path'])] = (data, dest)

    helper = OLD / 'inspect_artifacts.py'
    spec = importlib.util.spec_from_file_location('retained_fixture_reader', helper)
    reader = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(reader)
    def data(app, path):
        return files[(app, path)][0]
    def file(app, path):
        return files[(app, path)][1]
    observations = {
        'calibre': reader.inspect_calibre(file('calibre', 'src/calibre/db/tests/metadata.db')),
        'audacity': reader.inspect_sqlite(file('audacity', 'src/project/tests/data/test.aup4')),
        'ardour': reader.inspect_ardour(data('ardour', 'libs/ardour/test/profiling/sessions/1region/1region.ardour')),
        'musescore-studio': reader.inspect_mscz(data('musescore-studio', 'demos/Amazing_grace.mscz')),
        'zim-wiki': reader.inspect_zim(data('zim-wiki', 'tests/data/notebook-wiki.xml'),
                                      data('zim-wiki', 'tests/data/formats/parsetree.xml'),
                                      data('zim-wiki', 'tests/data/formats/wiki.txt').decode(),
                                      data('zim-wiki', 'tests/data/formats/export.markdown').decode()),
        'taskwarrior': reader.inspect_task_literals(data('taskwarrior', 'test/import.test.py').decode()),
    }
    results = {'review_date': '2026-10-24', 'python': sys.version, 'platform': platform.platform(),
               'sqlite': sqlite3.sqlite_version, 'plan_sha256': sha((BASE / 'plan.json').read_bytes()),
               'inspection_plan_sha256': sha((BASE / 'inspection-plan.json').read_bytes()),
               'runner_sha256': sha(Path(__file__).read_bytes()), 'helper_sha256': sha(helper.read_bytes()),
               'applications_installed_or_executed': False, 'upstream_test_suites_executed': False,
               'inputs': inputs, 'retained_inputs': retained, 'observations': observations,
               'limits': 'Queries and parsers executed, target implementation did not. Historical samples retain their limited scope. Read errors are not discarded or generalized to all projects. No equivalent audio/layout or application restoration is claimed.'}
    (BASE / 'inspection-results.json').write_text(json.dumps(results, indent=2, ensure_ascii=True) + '\n', encoding='utf-8')
    print(json.dumps({'new_sources': len(inputs), 'retained_inputs': len(retained), 'fixtures_reinspected': len(observations), 'applications_executed': False}))


if __name__ == '__main__':
    main()
