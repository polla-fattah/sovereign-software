"""Execute only installed Git/SQLite in owned disposable folders; preserve audit results.

Run: python evidence/rating-reconciliation/batch-1/check_runtime.py
The adjacent plan.json is declared before these checks. No target is installed.
"""
from contextlib import closing
import hashlib
import json
from pathlib import Path
import shutil
import sqlite3
import sys
import tempfile

HERE = Path(__file__).resolve().parent
REPO = HERE.parents[2]
sys.path.insert(0, str(REPO / "evidence" / "third-pass"))
from remaining_runtime_checks import command
from inspect_remaining import sqlite_experiment


def digest(data):
    return hashlib.sha256(data).hexdigest()


def git_check():
    executable = shutil.which("git")
    if not executable:
        raise RuntimeError("Existing Git runtime unavailable; no installation attempted")
    with tempfile.TemporaryDirectory(prefix="sovereign-ratings-git-") as directory:
        root = Path(directory).resolve()
        hooks = root / "empty-hooks"
        hooks.mkdir()
        commands = []
        def git(cwd, *args, required=True):
            result = command([executable, "-c", "core.autocrlf=false", "-c",
                "core.hooksPath=" + str(hooks), "-c", "init.templateDir=" + str(hooks),
                "-c", "commit.gpgsign=false", "-c", "tag.gpgsign=false", *args], cwd, required)
            commands.append({"cwd": str(cwd), **result})
            return result
        def init(path):
            path.mkdir()
            git(path, "init", "-q", "-b", "main")
            git(path, "config", "user.name", "Synthetic custodian")
            git(path, "config", "user.email", "audit@example.invalid")
        def refs(path):
            return git(path, "for-each-ref", "--format=%(refname) %(objectname)")["stdout"]
        def history(path):
            return git(path, "log", "--all", "--date-order", "--format=%H|%P|%an|%ae|%aI|%cn|%ce|%cI|%s")["stdout"]
        def files(path):
            names = git(path, "ls-files", "-z")["stdout"].split("\0")
            return {n: digest((path / n).read_bytes()) for n in names if n and (path / n).is_file()}
        source, sub = root / "source", root / "sub-source"
        init(source)
        init(sub)
        (sub / "sub.txt").write_text("separate repository content\n", encoding="utf-8")
        git(sub, "add", ".")
        git(sub, "commit", "-qm", "submodule baseline")
        (source / "record.txt").write_text("original record\n", encoding="utf-8")
        (source / ".gitignore").write_text("*.cache\n", encoding="utf-8")
        git(source, "add", ".")
        git(source, "commit", "-qm", "baseline record")
        git(source, "branch", "feature")
        git(source, "tag", "-a", "v1", "-m", "unsigned annotation")
        git(source, "-c", "protocol.file.allow=always", "submodule", "add", "-q", str(sub), "modules/demo")
        git(source, "commit", "-qam", "record submodule")
        (source / "record.txt").write_text("stashed record\n", encoding="utf-8")
        git(source, "stash", "push", "-q", "-m", "preserved stash")
        git(source, "config", "audit.marker", "separate configuration survives")
        expected = {"refs": refs(source), "history": history(source), "files": files(source),
                    "config": digest((source / ".git/config").read_bytes()),
                    "submodule_commit": git(sub, "rev-parse", "HEAD")["stdout"].strip(),
                    "submodule_file": digest((sub / "sub.txt").read_bytes())}
        artifacts = HERE / "artifacts" / "git"
        artifacts.mkdir(parents=True, exist_ok=True)
        # These paths contain only generated synthetic material, never user repositories.
        main_bundle, sub_bundle = root / "main.bundle", root / "sub.bundle"
        git(source, "bundle", "create", str(main_bundle), "--all")
        git(sub, "bundle", "create", str(sub_bundle), "--all")
        shutil.copyfile(main_bundle, artifacts / "main.bundle")
        shutil.copyfile(sub_bundle, artifacts / "sub.bundle")
        shutil.copyfile(source / ".git/config", artifacts / "local-config.txt")
        # Make the original locations unavailable before reconstructing the backup.
        for path in (source, sub):
            target = root / (path.name + "-unavailable")
            assert path.resolve().is_relative_to(root) and target.resolve().is_relative_to(root)
            path.rename(target)
        mirror, restored = root / "restored.git", root / "restored"
        git(root, "clone", "-q", "--mirror", str(main_bundle), str(mirror))
        restored.mkdir()
        shutil.copytree(mirror, restored / ".git")
        shutil.copyfile(artifacts / "local-config.txt", restored / ".git/config")
        git(restored, "checkout", "-q", "-f", "main")
        (restored / "modules").mkdir(exist_ok=True)
        # The .gitmodules original source URL is unavailable; recover this submodule from its own preserved bundle.
        (restored / "modules/demo").rmdir()
        git(root, "clone", "-q", str(sub_bundle), str(restored / "modules/demo"))
        checks = {"refs_equal": refs(restored) == expected["refs"],
                  "history_metadata_equal": history(restored) == expected["history"],
                  "tracked_files_equal": files(restored) == expected["files"],
                  "local_configuration_equal": digest((restored / ".git/config").read_bytes()) == expected["config"],
                  "submodule_commit_equal": git(restored / "modules/demo", "rev-parse", "HEAD")["stdout"].strip() == expected["submodule_commit"],
                  "submodule_file_equal": digest((restored / "modules/demo/sub.txt").read_bytes()) == expected["submodule_file"],
                  "original_paths_unavailable": not source.exists() and not sub.exists(),
                  "fsck_ok": git(restored, "fsck", "--full")["returncode"] == 0}
        (restored / "record.txt").write_text("authorized committed revision\n", encoding="utf-8")
        git(restored, "add", "record.txt")
        git(restored, "commit", "-qm", "disposable reset target")
        tip = git(restored, "rev-parse", "HEAD")["stdout"].strip()
        preview = git(restored, "diff", "HEAD~1", "HEAD", "--", "record.txt")["stdout"]
        git(restored, "reset", "--hard", "HEAD~1")
        reflog = git(restored, "reflog", "show", "--format=%H %gs")["stdout"]
        git(restored, "reset", "--hard", tip)
        scratch = restored / "disposable-untracked.txt"
        scratch.write_text("recover from a separate backup, not Git history\n", encoding="utf-8")
        backup = scratch.read_bytes()
        clean_preview = git(restored, "clean", "-n", "--", scratch.name)["stdout"]
        preview_retained = scratch.exists()
        forced = git(restored, "clean", "-f", "--", scratch.name)["stdout"]
        removed = not scratch.exists()
        scratch.write_bytes(backup)
        checks.update({"reset_diff_inspectable": "authorized committed revision" in preview,
                       "reset_tip_in_reflog": tip in reflog,
                       "committed_revision_recovered": (restored / "record.txt").read_text() == "authorized committed revision\n",
                       "clean_preview_retains_file": preview_retained and scratch.name in clean_preview,
                       "clean_force_deletes_file": removed and scratch.name in forced,
                       "untracked_restored_from_external_copy": scratch.read_bytes() == backup})
        assert all(checks.values()), checks
        return {"version": git(root, "--version")["stdout"].strip(), "checks": checks,
                "expected": expected, "commands": commands,
                "limits": "No LFS/signature/authentication/corruption/hook execution test; clean cannot recover an untracked file from Git without a separate copy."}


def sqlite_check():
    previous = sqlite_experiment()
    with tempfile.TemporaryDirectory(prefix="sovereign-ratings-sqlite-") as directory:
        file = Path(directory) / "db.sqlite"
        trace = []
        with closing(sqlite3.connect(file)) as db:
            db.execute("PRAGMA foreign_keys=ON")
            db.set_trace_callback(trace.append)
            db.executescript("""CREATE TABLE parent(id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE child(id INTEGER PRIMARY KEY, parent_id REFERENCES parent(id), value TEXT);
CREATE TABLE audit(event TEXT);
CREATE TRIGGER child_insert AFTER INSERT ON child BEGIN INSERT INTO audit VALUES('insert'); END;
CREATE VIEW joined AS SELECT child.id,parent.name,child.value FROM child JOIN parent ON parent.id=child.parent_id;
INSERT INTO parent VALUES(1,'parent'); INSERT INTO child VALUES(1,1,'baseline');""")
            db.commit()
            dump = "\n".join(db.iterdump())
            with closing(sqlite3.connect(":memory:")) as restored:
                restored.executescript(dump)
                restored.execute("PRAGMA foreign_keys=ON")
                restored.execute("INSERT INTO child VALUES(2,1,'restored trigger')")
                trigger_works = restored.execute("SELECT count(*) FROM audit").fetchone()[0] == 2
                view_works = restored.execute("SELECT * FROM joined ORDER BY id").fetchall() == [(1, 'parent', 'baseline'), (2, 'parent', 'restored trigger')]
                fk_clean = restored.execute("PRAGMA foreign_key_check").fetchall() == []
            db.execute("BEGIN")
            db.execute("DELETE FROM child")
            delete_visible = db.execute("SELECT count(*) FROM child").fetchone()[0] == 0
            db.rollback()
            delete_undone = db.execute("SELECT count(*) FROM child").fetchone()[0] == 1
            db.execute("BEGIN")
            db.execute("UPDATE child SET value='outer'")
            db.execute("SAVEPOINT review")
            db.execute("UPDATE child SET value='inner'")
            db.execute("ROLLBACK TO review")
            savepoint_works = db.execute("SELECT value FROM child").fetchone()[0] == "outer"
            db.rollback()
            error = None
            try:
                db.execute("INSERT INTO child VALUES(2,999,'invalid reference')")
            except sqlite3.IntegrityError as exc:
                error = {"type": type(exc).__name__, "message": str(exc)}
            db.rollback()
            db.execute("BEGIN")
            db.execute("DROP TABLE child")
            db.rollback()
            drop_undone = db.execute("SELECT count(*) FROM child").fetchone()[0] == 1
            db.execute("UPDATE child SET value='authorized commit'")
            db.commit()
        with closing(sqlite3.connect(file)) as reopened:
            persisted = reopened.execute("SELECT value FROM child").fetchone()[0] == "authorized commit"
        checks = {"restored_trigger_executes": trigger_works, "restored_view_rows_match": view_works,
                  "restored_foreign_keys_clean": fk_clean, "delete_observed_then_rolled_back": delete_visible and delete_undone,
                  "savepoint_rollback": savepoint_works, "constraint_error_visible": error is not None,
                  "drop_table_rolled_back": drop_undone, "authorized_commit_persists": persisted,
                  "sql_trace_recorded": any("DROP TABLE" in sql for sql in trace)}
        assert all(checks.values()), checks
        return {"version": sqlite3.sqlite_version, "checks": checks, "constraint_error": error,
                "sql_trace": trace, "prior_dump_wal_backup_experiment": previous,
                "limits": "Trace is explicitly configured; SQLite is not a GUI, universal audit service or automatic authorization policy. No crash/power-loss trial."}


def main():
    plan = json.loads((HERE / "plan.json").read_text(encoding="utf-8"))
    result = {"review_date": "2026-10-23", "plan_sha256": digest((HERE / "plan.json").read_bytes()),
              "runner_sha256": digest(Path(__file__).read_bytes()), "python": sys.version,
              "installation_performed": False, "scope": plan, "git": git_check(), "sqlite": sqlite_check()}
    result["artifacts"] = [{"path": str(p.relative_to(HERE)).replace("\\", "/"), "sha256": digest(p.read_bytes())}
                           for p in sorted((HERE / "artifacts").rglob("*")) if p.is_file()]
    (HERE / "runtime-results.json").write_text(json.dumps(result, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"git": result["git"]["checks"], "sqlite": result["sqlite"]["checks"]}))


if __name__ == "__main__":
    main()
