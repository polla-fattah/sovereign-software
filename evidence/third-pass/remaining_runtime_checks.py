"""Controlled checks using already-installed Git/Hugo, only in disposable folders."""

import hashlib
import os
from pathlib import Path
import shutil
import subprocess
import tempfile


def command(args, cwd, required=True):
    environment = dict(os.environ)
    if Path(args[0]).stem.lower() == "git":
        environment = {k: v for k, v in environment.items() if not k.upper().startswith("GIT_")}
        environment["GIT_CONFIG_NOSYSTEM"] = "1"
        environment["GIT_CONFIG_GLOBAL"] = os.devnull
    if Path(args[0]).stem.lower() == "hugo":
        environment = {k: v for k, v in environment.items() if not k.upper().startswith("HUGO_")}
    result = subprocess.run(args, cwd=cwd, env=environment, text=True, capture_output=True, timeout=60)
    if required and result.returncode:
        raise RuntimeError(str(args) + ": " + result.stderr)
    return {"args": args, "returncode": result.returncode,
            "stdout": result.stdout, "stderr": result.stderr}


def git_checks():
    executable = shutil.which("git")
    if not executable:
        return {"available": False, "resolved": False}
    with tempfile.TemporaryDirectory(prefix="sovereign-git-") as directory:
        root = Path(directory)
        hooks = root / "empty-hooks"
        hooks.mkdir()
        version = command([executable, "--version"], root)["stdout"].strip()
        def git(path, *args, required=True):
            return command([executable, "-c", "core.autocrlf=false", "-c",
                "core.hooksPath=" + str(hooks), "-c", "init.templateDir=" + str(hooks),
                "-c", "commit.gpgsign=false", "-c", "tag.gpgsign=false", *args], path, required)
        def init(path):
            path.mkdir()
            git(path, "init", "-q", "-b", "main")
            git(path, "config", "user.name", "Synthetic recovery test")
            git(path, "config", "user.email", "audit@example.invalid")
        def refs(path):
            return dict(line.split(" ", 1) for line in git(path, "for-each-ref",
                "--format=%(refname) %(objectname)")["stdout"].splitlines())
        repo, sub = root / "source", root / "sub-source"
        init(repo)
        init(sub)
        (sub / "sub.txt").write_text("separate submodule content\n", encoding="utf-8")
        git(sub, "add", "sub.txt")
        git(sub, "commit", "-qm", "synthetic submodule")
        (repo / "a.txt").write_text("initial\n", encoding="utf-8")
        git(repo, "add", "a.txt")
        git(repo, "commit", "-qm", "initial")
        git(repo, "branch", "side")
        git(repo, "tag", "-a", "v1", "-m", "unsigned synthetic annotation")
        git(repo, "-c", "protocol.file.allow=always", "submodule", "add", "-q", str(sub), "modules/demo")
        git(repo, "commit", "-qam", "add submodule declaration")
        (repo / "a.txt").write_text("stashed change\n", encoding="utf-8")
        git(repo, "stash", "push", "-q", "-m", "synthetic stash")
        git(repo, "config", "audit.marker", "not-repository-history")
        (repo / ".git" / "hooks").mkdir(exist_ok=True)
        (repo / ".git" / "hooks" / "audit-marker.txt").write_text("not a runnable hook", encoding="utf-8")
        bundle = root / "all.bundle"
        git(repo, "bundle", "create", str(bundle), "--all")
        heads = git(repo, "bundle", "list-heads", str(bundle))["stdout"]
        normal, mirror = root / "normal", root / "mirror.git"
        git(root, "clone", "-q", str(bundle), str(normal))
        git(root, "clone", "-q", "--mirror", str(bundle), str(mirror))
        source_refs, mirror_refs, normal_refs = refs(repo), refs(mirror), refs(normal)
        check = git(mirror, "fsck", "--full")
        config = git(normal, "config", "--get", "audit.marker", required=False)
        incremental = root / "incremental.bundle"
        git(repo, "bundle", "create", str(incremental), "v1..main")
        empty = root / "empty"
        init(empty)
        verify_full = git(empty, "bundle", "verify", str(bundle), required=False)
        verify_incremental = git(empty, "bundle", "verify", str(incremental), required=False)
        result = {"available": True, "runtime_version": version,
                  "source_refs": source_refs, "bundle_heads": heads,
                  "normal_clone_refs": normal_refs, "mirror_clone_refs": mirror_refs,
                  "mirror_refs_equal_source": mirror_refs == source_refs,
                  "stash_ref_in_normal_clone": "refs/stash" in normal_refs,
                  "stash_ref_in_mirror_clone": "refs/stash" in mirror_refs,
                  "repository_local_config_copied": config.returncode == 0 if hasattr(config, "returncode") else config["returncode"] == 0,
                  "marker_hook_copied": (normal / ".git" / "hooks" / "audit-marker.txt").exists(),
                  "submodule_file_present_in_normal_clone": (normal / "modules/demo/sub.txt").exists(),
                  "mirror_fsck": check, "full_bundle_verifies_in_empty": verify_full["returncode"] == 0,
                  "incremental_bundle_verifies_in_empty": verify_incremental["returncode"] == 0,
                  "incremental_verification": verify_incremental,
                  "bundle_sha256": hashlib.sha256(bundle.read_bytes()).hexdigest(),
                  "signed_commits_tags_lfs_or_corruption_tested": False}
        assert result["mirror_refs_equal_source"] and result["stash_ref_in_mirror_clone"]
        assert not result["stash_ref_in_normal_clone"] and not result["marker_hook_copied"]
        assert not result["repository_local_config_copied"] and not result["submodule_file_present_in_normal_clone"]
        assert result["full_bundle_verifies_in_empty"] and not result["incremental_bundle_verifies_in_empty"]
        return result


def hugo_checks():
    executable = shutil.which("hugo")
    if not executable:
        return {"available": False, "resolved": False}
    with tempfile.TemporaryDirectory(prefix="sovereign-hugo-") as directory:
        root = Path(directory)
        version = command([executable, "version"], root)["stdout"].strip()
        (root / "content").mkdir()
        (root / "layouts" / "_default").mkdir(parents=True)
        (root / "hugo.toml").write_text('baseURL = "https://example.invalid/"\n', encoding="utf-8")
        (root / "layouts/single.html").write_text("<h1>{{ .Title }}</h1>{{ .Content }}", encoding="utf-8")
        (root / "layouts/list.html").write_text("{{ range .Pages }}{{ .Title }}{{ end }}", encoding="utf-8")
        source = root / "content/removed.md"
        source.write_text('+++\ntitle = "Synthetic"\n+++\nPreserved content.\n', encoding="utf-8")
        dest = root / "public"
        run1 = command([executable, "--quiet", "--destination", str(dest)], root)
        output = dest / "removed/index.html"
        initial = output.exists()
        source.unlink()
        run2 = command([executable, "--quiet", "--destination", str(dest)], root)
        stale = output.exists()
        run3 = command([executable, "--quiet", "--cleanDestinationDir", "--destination", str(dest)], root)
        clean = output.exists()
        if not initial:
            raise AssertionError(str({"initial": initial, "stale": stale, "clean": clean,
                "commands": [run1, run2, run3], "files": [str(p.relative_to(root)) for p in dest.rglob("*")]}))
        return {"available": True, "runtime_version": version,
                "initial_page_exists": initial, "deleted_source_stale_output_after_default_build": stale,
                "deleted_source_output_after_clean_destination": clean,
                "commands": [run1, run2, run3],
                "network_blocked_or_real_project_dependencies_tested": False}
