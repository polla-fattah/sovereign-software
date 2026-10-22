# calibre: documentation review

Reviewed 22 October 2026 from the calibre manual (9.16.0), calibre-ebook.com, and the repository only. Latest release: 9.16.0 (9 October 2026). Licence: GPL v3. Marked [S] below means the point rests on a model summary of a truncated page and should be rechecked.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## What the documentation says

**Storage and access (E1, E3)**
- Books are copied into a library folder "arranged into sub-folders by Author and Title". Metadata is in `metadata.db`, "a sqlite database" at the top level. The folder suffix number is the book's database id. The FAQ warns that adding files or folders manually "may be automatically deleted", and says the author/title layout "is not going to change". No schema documentation was found. [FAQ](https://manual.calibre-ebook.com/faq.html)
- Calibre keeps an OPF metadata backup in each book's folder. [GUI manual](https://manual.calibre-ebook.com/gui.html), [calibredb](https://manual.calibre-ebook.com/generated/en/calibredb.html)
- The FAQ says never to open a library from an untrusted source because it is a security risk. [FAQ](https://manual.calibre-ebook.com/faq.html)

**Exit and migration (E2)**
- Copying the library folder "preserves all your metadata, tags, custom columns, etc.". "Export/import all calibre data" moves books, settings, and plugins (calibre 2.47 or later). [FAQ](https://manual.calibre-ebook.com/faq.html)
- Save to disk and `calibredb export` write all formats, the cover, and the metadata as OPF. Re-import "without any loss of information" is claimed, except the date. Conversion results "can vary greatly" by input format, PDF is called "a terrible format to convert from", and calibre is "not a substitute for a full blown e-book editor". [GUI manual](https://manual.calibre-ebook.com/gui.html), [conversion](https://manual.calibre-ebook.com/conversion.html), [FAQ](https://manual.calibre-ebook.com/faq.html)
- Where annotations and reading position are stored, and what is outside the OPF files, was not documented in the pages read.

**Recovery (E3)**
- OPF backups are written every time metadata changes. `restore_database` regenerates the database from them, and the manual warns that it "completely regenerates your database. You will lose all saved searches, user categories, plugboards, stored per-book conversion settings, and custom recipes". Restored metadata is only as accurate as the OPF files. [calibredb](https://manual.calibre-ebook.com/generated/en/calibredb.html)
- Do not put a library on a networked drive; Google Drive "is incompatible with calibre" and data loss will follow, and sync tools must not run while calibre does. [FAQ](https://manual.calibre-ebook.com/faq.html)
- Whether newer calibre opens older libraries, whether older calibre opens newer ones, and one-way database upgrades were not documented in the pages read. Minimum operating systems are stated (Windows 10 1809, macOS 14). [Windows](https://calibre-ebook.com/download_windows), [macOS](https://calibre-ebook.com/download_osx)

**Continuing authority (E4) and dependencies**
- Privacy page: "calibre, the software, uses no statistics service" and collects no user information; the website uses Google Analytics and ads. No automatic update; an update notification can be turned off [S]. [privacy](https://calibre-ebook.com/privacy), [FAQ](https://manual.calibre-ebook.com/faq.html)
- Metadata downloads use Google Books and Amazon, triggered by the user. AI features are described as optional and not loaded unless run. The content server is documented with a warning to enable a username and password before exposing it. The changelog lists fixes for authenticated-user issues including remote code execution and arbitrary file write. [metadata](https://manual.calibre-ebook.com/metadata.html), [server](https://manual.calibre-ebook.com/server.html), [what's new](https://calibre-ebook.com/whats-new)
- Plugins are third party, installed in one click; no vetting or risk warning was found. [about](https://calibre-ebook.com/about)
- Developed "primarily by Kovid Goyal" with volunteers, and funded by donations and Patreon. No succession statement was found. The FAQ's answer to worries about future development is to use Save to disk. [about](https://calibre-ebook.com/about), [FAQ](https://manual.calibre-ebook.com/faq.html)
- DRM: calibre does not support it and will not convert DRM books, because support could become a tool for removing it. [DRM](https://manual.calibre-ebook.com/drm.html)

**Consequential operations (E5)**
- Remove books "deletes books permanently", but removed books sit in a trash folder for a few days and can be restored. `calibredb remove --permanent` skips the Recycle Bin. [GUI manual](https://manual.calibre-ebook.com/gui.html), [calibredb](https://manual.calibre-ebook.com/generated/en/calibredb.html)
- Bulk metadata edits can use regular expressions, with the warning "If you have any doubts about what is going to happen, do not mix search/replace with other changes". Changing author names has "no undo" after confirmation. Edit book creates checkpoints you can revert to, and some automated fixes "can sometimes have unexpected effects". [metadata](https://manual.calibre-ebook.com/metadata.html), [FAQ](https://manual.calibre-ebook.com/faq.html), [edit](https://manual.calibre-ebook.com/edit.html)

## Gaps to test or read next
1. Build a library with custom columns, saved searches, user categories, virtual libraries, plugboards, and conversion settings; run Restore database from OPF on a copy; and list exactly what disappears.
2. Open `metadata.db` in a SQLite tool and rebuild the library layout without calibre.
3. Move a library to a clean machine and compare, and test an older calibre on a newer library.
4. Round trip a converted book and compare content.
5. Not found: virtual library fate on restore, annotation storage, repair actions of Check library, and one-way database upgrades.
6. Pages not read: Preferences pages, the plugin index, the changelog file, and the ebook-convert page.
