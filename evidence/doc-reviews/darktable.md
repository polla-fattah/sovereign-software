# darktable: documentation review

Reviewed 22 October 2026 from the darktable development manual, darktable.org, and the repository README only. The stable 5.6 manual was not fetched, so wording may differ. Latest release: 5.6.2 (website post, 4 October 2026); the GitHub releases page showed no entries. Licence: GPL 3.0 or later.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## What the documentation says

**Storage and access (E1, E3)**
- Metadata, tags, and processing steps are stored in XMP and DTDATA sidecar files beside the raw files and also in the library database (`library.db`, with `data.db`). Once an image is imported, "the database takes precedence" over the XMP file. [sidecar files](https://docs.darktable.org/usermanual/development/en/overview/sidecar-files/sidecar/), [history stack](https://docs.darktable.org/usermanual/development/en/darkroom/pixelpipe/history-stack/)
- The only explicit statement of data not in sidecars is that custom sort sequence numbers are not stored there, with a warning that this "could be destructive" on reimport. A complete list of database-only data was not found. No specification of the XMP schema or of how the history is encoded was found; the history is described as binary XMP tags. [sidecar files](https://docs.darktable.org/usermanual/development/en/overview/sidecar-files/sidecar/), [storage preferences](https://docs.darktable.org/usermanual/development/en/preferences-settings/storage/)
- Originals: "Your original image is never modified", and files are opened read-only. [darktable.org](https://www.darktable.org/), [sidecar files](https://docs.darktable.org/usermanual/development/en/overview/sidecar-files/sidecar/)

**Exit and migration (E2)**
- Moving to another computer: "Multiple machines are not natively supported". Syncing raw files plus XMPs works across platforms but does not carry settings, presets, or styles. Syncing the whole config directory needs identical absolute paths and is not cross-platform. [multiple computers](https://docs.darktable.org/usermanual/development/en/special-topics/multiple-computers/)
- Export formats include JPEG, JPEG 2000, OpenEXR, PDF, PNG, PPM, TIFF, WebP, XCF, and JPEG XL (some optional at build time). Styles export as `.dtstyle` XML; the FAQ says presets and styles are specific to darktable. Edits can be embedded in some exported files and loaded back as a sidecar, but the manual does not say other tools can interpret them. Only Lightroom-style XMP is imported (never written), the FAQ says that code is "old and somewhat broken", and the results are never identical. [darktable-cli](https://docs.darktable.org/usermanual/development/en/special-topics/program-invocation/darktable-cli/), [styles](https://docs.darktable.org/usermanual/development/en/module-reference/utility-modules/shared/styles/), [Lightroom import](https://docs.darktable.org/usermanual/development/en/overview/sidecar-files/sidecar-import/), [FAQ](https://www.darktable.org/about/faq/)

**Recovery (E3)**
- Automatic database snapshots: the backups page says 15 daily snapshots plus one at version updates, while the storage preferences describe a configurable snapshot (default weekly, 10 kept). The two were not reconciled. [backups](https://docs.darktable.org/usermanual/development/en/preferences-settings/backups/), [storage preferences](https://docs.darktable.org/usermanual/development/en/preferences-settings/storage/)
- Writing sidecars is configurable (never, on import by default, after edit); it is "strongly recommended" to write them, and the docs say to back up the XMP files with the raw files. Rebuilding from raw plus XMP restores edits when images are reimported, but what a rebuild loses is not listed. [storage preferences](https://docs.darktable.org/usermanual/development/en/preferences-settings/storage/), [sidecar files](https://docs.darktable.org/usermanual/development/en/overview/sidecar-files/sidecar/)
- Upgrades are one-way: a newer release may change the database structure, upgrades are "definitive", a backup is made first, and an older version cannot open a newer database. Newer versions read older edits; newer edits are generally not compatible with older versions, and unknown parts of newer XMP files are discarded. Deprecated modules stay usable only for edits that already use them. Master builds "might corrupt your database and XMP files". [README](https://github.com/darktable-org/darktable), [deprecated modules](https://docs.darktable.org/usermanual/development/en/darkroom/processing-modules/deprecated/)

**Continuing authority (E4) and dependencies**
- No update-check, telemetry, or privacy statement was found, and no explicit "works offline" statement. Online features are optional: export to online storage with accounts, optional AI models downloaded on request, and Lua scripts. [security preferences](https://docs.darktable.org/usermanual/development/en/preferences-settings/security/), [README](https://github.com/darktable-org/darktable)
- Two major releases a year at the solstices (5.6.0 on 21 June 2026). No maintainer list, legal entity, funding statement, or support policy for old releases was found. Platform statements differ between the README (macOS 15 and later on Apple Silicon) and the install page (macOS 13.5 and later). [README](https://github.com/darktable-org/darktable), [news](https://www.darktable.org/news/)

**Consequential operations (E5)**
- "Remove" takes images out of the library and leaves files and sidecars; "delete" removes the library entry and the XMP and DTDATA sidecars, and the image file too if no duplicates remain, with trash use set in preferences. Confirmations are on by default for removing, deleting, and discarding history. [selected image](https://docs.darktable.org/usermanual/development/en/module-reference/utility-modules/lighttable/selected-image/), [security preferences](https://docs.darktable.org/usermanual/development/en/preferences-settings/security/)
- Compress history, discard history, and load sidecar file "can not be undone". Applying a style in overwrite mode discards existing history. "Refresh exif" may overwrite metadata changed in darktable. [history stack](https://docs.darktable.org/usermanual/development/en/module-reference/utility-modules/lighttable/history-stack/), [styles](https://docs.darktable.org/usermanual/development/en/module-reference/utility-modules/shared/styles/)
- Edits made to an XMP by other software after import are overwritten when darktable next syncs, unless startup update checking is on. [sidecar files](https://docs.darktable.org/usermanual/development/en/overview/sidecar-files/sidecar/)

## Gaps to test or read next
1. Edit a set of RAW images with collections, tags, ratings, colour labels, and duplicates; wipe `library.db`; reimport from raw plus XMP on a clean install; and list what is lost.
2. Open the same library in an older version after upgrading.
3. Test whether another tool can read the XMP history or only the embedded preview.
4. Pages not read: collections, film rolls, labels, tagging, presets, workflow, `darktable-generate-cache`, miscellaneous preferences, credits, and the GitHub release notes.
5. Reconcile the two backup statements and the platform minimums against current behavior.
