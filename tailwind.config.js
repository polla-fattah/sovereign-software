/* Tailwind build config. Rebuild the stylesheet with the command in README.md.
   Palette names are remapped onto the design tokens in DESIGN.md. */
module.exports = Object.assign({
  content: [
    './layouts/**/*.html',
    './content/**/*.md',
    './static/js/**/*.js',
  ],
}, {
    darkMode: 'class',
    theme: {
      extend: {
        fontFamily: {
          sans: ['Inter', 'ui-sans-serif', 'sans-serif'],
          serif: ['"PP Mori"', '"General Sans"', '"DM Serif Display"', 'Georgia', 'serif'],
          display: ['"PP Mori"', '"General Sans"', '"DM Serif Display"', 'Georgia', 'serif'],
          mono: ['"JetBrains Mono"', 'monospace'],
        },
        colors: {
          /* tokens */
          'forest-ink': '#003f2e',
          'vivid-emerald': '#039861',
          'cream-canvas': '#fdf9f7',
          'pure-paper': '#ffffff',
          'ink-black': '#333333',
          'faded-pencil': '#6e7673',
          'hairline-gray': '#d6d6d6',
          'mid-gray': '#a6a6a6',
          /* neutral remap: headings -> forest ink, body -> ink black, muted -> faded pencil, borders -> hairline */
          slate: {
            50: '#fdf9f7', 100: '#f6f1ed', 200: '#d6d6d6', 300: '#d6d6d6', 400: '#a6a6a6',
            500: '#6e7673', 600: '#6e7673', 700: '#333333', 800: '#333333', 900: '#003f2e', 950: '#003f2e',
          },
          stone: { 50: '#fdf9f7', 100: '#f6f1ed', 200: '#ece6e1' },
          /* former amber accent -> forest ink (text) / vivid emerald (rules, borders) */
          amber: {
            50: '#f1f8f4', 100: '#e3f1e9', 200: '#c3e3d2', 300: '#039861', 400: '#039861',
            450: '#039861', 500: '#039861', 600: '#003f2e', 700: '#003f2e', 800: '#003f2e', 900: '#003f2e',
          },
          emerald: {
            300: '#039861', 400: '#039861', 500: '#039861', 600: '#003f2e', 700: '#003f2e',
          },
          obsidian: { 950: '#003f2e', 900: '#003f2e', 800: '#003f2e', 700: '#003f2e' },
        }
      }
    }
  });
