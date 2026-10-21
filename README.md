# Sovereign Personal Software — Hugo Static Site

This repository contains the complete, zero-dependency **Hugo** source code for the **Sovereign Personal Software Manifesto, Index & 7-Gate Evaluator**.

## Directory Structure

```text
sovereign-hugo-site/
├── hugo.toml                        # Root Hugo configuration
├── content/
│   ├── _index.md                    # Homepage frontmatter & overview
│   └── manifesto.md                 # Standalone Markdown edition of the Manifesto
├── data/
│   ├── directory.json               # Audited Sovereign Software Index dataset
│   └── gates.json                   # The 7 Engineering Evaluation Gates dataset
├── layouts/
│   ├── _default/
│   │   ├── baseof.html              # Master HTML shell
│   │   └── single.html              # Standalone single-page template
│   ├── partials/
│   │   ├── head.html                # Typography, Tailwind config & grid styles
│   │   ├── header.html              # Top telemetry bar & navigation header
│   │   └── footer.html              # Sovereign footer
│   └── index.html                   # Full 5-tab interactive portal template
└── static/
    └── js/
        └── sovereign.js             # Sub-millisecond local evaluator & filter logic
```

## Running Locally (100% Offline after initial load)

1. Ensure [Hugo](https://gohugo.io/) is installed (`hugo version`).
2. Start the local development server:
   ```bash
   hugo server -D
   ```
3. Open `http://localhost:1313/` in your browser.
4. To compile production static HTML into `./public`:
   ```bash
   hugo --minify
   ```

## Self-hosted assets (no CDN, no third-party requests)

The site loads nothing from outside its own origin.

- **Fonts** live in `static/fonts/` and are declared in `static/css/fonts.css`: Inter and JetBrains Mono (SIL OFL 1.1) and General Sans (Fontshare, ITF Free Font License).
- **CSS** is compiled once with the Tailwind v3 standalone CLI into `static/css/tailwind.css`, which is committed. Rebuild it whenever you add or change utility classes in layouts, content or `static/js`:

  ```bash
  ./tools/tailwindcss.exe -c tailwind.config.js -i tailwind.input.css -o static/css/tailwind.css --minify
  ```

- The CLI binary is not committed (`tools/` is git-ignored). Download `tailwindcss-windows-x64.exe` from the [Tailwind v3.4.17 release](https://github.com/tailwindlabs/tailwindcss/releases/tag/v3.4.17), save it as `tools/tailwindcss.exe`, and check it against `sha256sums.txt` from the same release.
