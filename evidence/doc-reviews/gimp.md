# GIMP: documentation review

Reviewed 22 October 2026 from the GIMP User Manual (docs.gimp.org), the developer site, and the privacy policy only. Most pages on www.gimp.org failed certificate verification ("unable to verify the first certificate"), so the latest-release fact rests on a search summary of the official news page, not on the page itself: GIMP 3.2.6, dated 10 September 2026 (the news URL carries the date; the page text was not read). The manual fetched is "GIMP 3.0 User Manual", dated 05/11/2026 as printed. The licence of the software itself was not found in the pages read; the manual is under GFDL 1.2 or later.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## What the documentation says

**Storage and access (E1, E3)**
- XCF is GIMP's own format and "the only format that can store everything about an image", apart from undo history. The same page says most other programs cannot read XCF files. [getting images out](https://docs.gimp.org/3.0/en/gimp-images-out.html)
- Save writes only XCF; opening a JPG or PNG imports it as a new image, so a later Save writes an `.xcf`. [getting images out](https://docs.gimp.org/3.0/en/gimp-images-out.html), [export dialog](https://docs.gimp.org/3.0/en/gimp-export-dialog.html)
- A search summary says the XCF specification is on the developer site, calls XCF a "living" format, and says the code is the ultimate reference. The spec page itself failed (certificate error), so this is unconfirmed. [XCF spec](https://developer.gimp.org/core/standards/xcf/)
- File handling is done by plug-ins; most importable formats can also be exported. [getting images out](https://docs.gimp.org/3.0/en/gimp-images-out.html)

**Exit and migration (E2)**
- "Every other format preserves some image properties and loses others." Layers and transparency are named as at risk; the page does not say which format loses what. [getting images out](https://docs.gimp.org/3.0/en/gimp-images-out.html)
- Exporting does not modify the working image. Export As is Ctrl+Shift+E; File > Overwrite keeps the original format of a non-XCF file. [export dialog](https://docs.gimp.org/3.0/en/gimp-export-dialog.html)
- Lost properties per format on the export dialog page: not found in the docs. Bulk or batch migration of many XCF files: not found in the docs.

**Recovery (E3)**
- Crash recovery: not covered on the manual pages read (preferences, quick tasks). A search summary of the 2.10 RC1 news says GIMP tries to back up unsaved images after a crash and offers to reopen them, with no guarantee. That page failed to load, so treat it as unconfirmed. [2.10 RC1 news](https://www.gimp.org/news/2018/03/26/gimp-2-10-0-rc1-released/)
- Version compatibility between GIMP 2.10, 3.0 and 3.2 for XCF: not found in the docs (the 3.0 history page returned 404).
- Swap and tile cache are spill-to-disk working space, not a backup. [system resources](https://docs.gimp.org/3.0/en/gimp-prefs-system-resources.html)

**Continuing authority (E4) and dependencies**
- Privacy policy (via search summary; page itself blocked): no data collected or sent except an optional update check, an HTTPS request for a static file at most weekly, in some packages. Flathub, Snap and Microsoft Store builds may collect usage data under those stores' terms. [privacy policy](https://www.gimp.org/about/privacy.html)
- The update check is a Preferences option under Network Access, run at start-up and needing internet access. [system resources](https://docs.gimp.org/3.0/en/gimp-prefs-system-resources.html)
- Reading the online manual from inside GIMP makes HTTPS requests; remote file open or save exposes the IP address (summary of policy, unconfirmed). [privacy policy](https://www.gimp.org/about/privacy.html)
- Account requirement, governance, funding, succession and the software licence: not found in the pages read (about page and downloads page blocked).

**Consequential operations (E5)**
- Undo covers almost any action, but scripts deactivate the function. Levels are set in Preferences; the oldest steps are dropped when undo memory is exceeded, never below a minimum. Any new action after an undo removes Redo. [undo](https://docs.gimp.org/3.0/en/gimp-edit-undo.html), [system resources](https://docs.gimp.org/3.0/en/gimp-prefs-system-resources.html)
- Closing an image with unsaved changes asks for confirmation: "everything is gone, including the undo history." Only a Save as XCF marks the image clean; exporting does not. [close](https://docs.gimp.org/3.0/en/gimp-file-close.html)
- Exporting over an existing file prompts before replacing it. A warning appears if a selected mask or channel is not supported by the format. [export dialog](https://docs.gimp.org/3.0/en/gimp-export-dialog.html)
- Plug-in and script behavior, and what undo does on close: not found in the docs beyond the above.

## Gaps to test or read next
1. Round trip with a synthetic layered image (text layer, mask, group, 16-bit colour, ICC profile): save XCF, export PNG, TIFF, ORA and PSD, reopen each, and list what is lost.
2. Open the XCF in a third-party reader (for example any tool claimed to read it) and compare layers, modes and masks with GIMP's view.
3. Save in 3.2.6, try to open in 2.10 and 3.0; record the message and any lost layers.
4. Kill the process with unsaved edits and check whether a recovery prompt appears on restart.
5. Run with the network blocked and the update check on; note any failure or prompt.
6. Read next: developer.gimp.org XCF spec, www.gimp.org about, downloads, release notes and licence pages (blocked by certificate errors), and the 3.2.6 news page directly.
