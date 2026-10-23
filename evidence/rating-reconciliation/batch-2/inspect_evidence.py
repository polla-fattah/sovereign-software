"""Retain pinned source as data and re-read existing fixtures. No target app runs.

Usage: python evidence/rating-reconciliation/batch-2/inspect_evidence.py [--fetch]
Default is offline. --fetch downloads missing source only, verifying Git blob IDs.
"""
import argparse
import hashlib
import io
import json
import platform
from pathlib import Path
import re
import sqlite3
import sys
import urllib.request
import zipfile

BASE = Path(__file__).resolve().parent
ROOT = BASE.parents[2]
OLD = ROOT / 'evidence/third-pass'


def sha256(data):
    return hashlib.sha256(data).hexdigest()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--fetch', action='store_true')
    args = parser.parse_args()
    inputs = []
    for item in json.loads((BASE / 'inspection-plan.json').read_text())['inputs']:
        dest = BASE / item['local_path']
        assert dest.resolve().is_relative_to(BASE)
        if not dest.exists():
            if not args.fetch:
                raise FileNotFoundError(f'{dest}; run with --fetch once')
            request = urllib.request.Request(item['raw_url'], headers={'User-Agent': 'sovereign-evidence-audit'})
            with urllib.request.urlopen(request, timeout=30) as response:
                data = response.read(2_000_001)
            assert len(data) <= 2_000_000, 'source size limit'
            blob = hashlib.sha1(f'blob {len(data)}\0'.encode() + data).hexdigest()
            assert blob == item['git_blob_sha'], item['path']
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_bytes(data)
        data = dest.read_bytes()
        blob = hashlib.sha1(f'blob {len(data)}\0'.encode() + data).hexdigest()
        assert blob == item['git_blob_sha'], item['path']
        inputs.append(dict(item, bytes=len(data), sha256=sha256(data)))

    old = json.loads((OLD / 'artifact-results.json').read_text())['results']
    fixtures = []
    for app in ('anki', 'zotero'):
        record = next(r for r in old if r['application'] == app)
        data = (OLD / record['local_path']).read_bytes()
        assert sha256(data) == record['sha256']
        fixtures.append({'application': app, 'local_path': 'evidence/third-pass/' + record['local_path'],
                         'sha256': sha256(data), 'bytes': len(data)})
        if app == 'anki':
            with zipfile.ZipFile(io.BytesIO(data)) as archive:
                assert sum(i.file_size for i in archive.infolist()) < 10_000_000
                db = sqlite3.connect(':memory:')
                db.deserialize(archive.read('collection.anki2'))
                db.execute('PRAGMA query_only=ON')
                rows = db.execute('SELECT cards.id, cards.nid, notes.flds FROM cards JOIN notes ON cards.nid=notes.id').fetchall()
                media = json.loads(archive.read('media'))
                refs = [s for row in rows for s in re.findall(r'\[sound:([^\]]+)\]', row[2])]
                mappings = [{'member': member, 'name': name, 'bytes': len(archive.read(member)),
                             'sha256': sha256(archive.read(member))} for member, name in media.items()]
                fixtures[-1]['inspection'] = {
                    'integrity_check': db.execute('PRAGMA integrity_check').fetchone()[0],
                    'notes': db.execute('SELECT count(*) FROM notes').fetchone()[0],
                    'cards': db.execute('SELECT count(*) FROM cards').fetchone()[0],
                    'joined_card_note_rows': rows, 'sound_references': refs, 'media': mappings,
                    'all_sound_references_mapped': all(ref in media.values() for ref in refs),
                    'limits': 'One legacy note/card; four media bytes do not establish valid audio, modern package decoding or complete scheduling recovery.'}
                db.close()
        else:
            db = sqlite3.connect(':memory:')
            db.set_authorizer(lambda action, *rest: sqlite3.SQLITE_DENY if action in (sqlite3.SQLITE_ATTACH, sqlite3.SQLITE_DETACH) else sqlite3.SQLITE_OK)
            db.executescript(data.decode('utf-8-sig'))
            tables = [r[0] for r in db.execute("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name")]
            names = ('items', 'collections', 'collectionItems', 'itemAttachments', 'itemAnnotations', 'itemRelations')
            fixtures[-1]['inspection'] = {
                'integrity_check': db.execute('PRAGMA integrity_check').fetchone()[0],
                'table_count': len(tables),
                'selected_counts': {name: db.execute('SELECT count(*) FROM "' + name + '"').fetchone()[0] for name in names},
                'limits': 'Published schema DDL, not an application-origin populated library or restored attachments/citation mappings.'}
            db.close()

    # Recheck all retained source hashes for these backup apps without modifying the historical result.
    retained = []
    prior = json.loads((OLD / 'batch-3/source-results.json').read_text())
    for item in prior['inputs']:
        if item['application'] not in ('restic', 'borgbackup', 'kopia'):
            continue
        data = (OLD / 'batch-3' / item['local_path']).read_bytes()
        assert sha256(data) == item['sha256'], item['local_path']
        retained.append({'application': item['application'], 'local_path': 'evidence/third-pass/batch-3/' + item['local_path'],
                         'sha256': sha256(data), 'bytes': len(data), 'url': item['url']})
    result = {
        'review_date': '2026-10-23', 'python': sys.version, 'platform': platform.platform(), 'sqlite': sqlite3.sqlite_version,
        'plan_sha256': sha256((BASE / 'plan.json').read_bytes()),
        'inspection_plan_sha256': sha256((BASE / 'inspection-plan.json').read_bytes()),
        'runner_sha256': sha256(Path(__file__).read_bytes()),
        'applications_installed_or_executed': False, 'upstream_test_suites_executed': False,
        'published_schema_ddl_executed': True,
        'inputs': inputs, 'retained_backup_sources': retained, 'fixtures': fixtures,
        'interpretation': 'Hash checks and independent fixture queries are executed observations. Source findings are manual branch inspection, not behavior proved by finding a string. No full E3/E5 Pass follows automatically.'}
    (BASE / 'inspection-results.json').write_text(json.dumps(result, indent=2) + '\n', encoding='utf-8')
    print(json.dumps({'sources': len(inputs), 'retained_backup_sources': len(retained), 'fixtures': len(fixtures), 'target_apps_executed': False}))


if __name__ == '__main__':
    main()
