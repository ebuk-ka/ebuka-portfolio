# Copilot instructions for Ebuka's Portfolio

## Quick project summary
- Simple **static portfolio** (no build system, no package manager). Primary files: `index.html`, `style.css`, `script.js`. Images live under `images/` (note: some assets are nested under `images/images/`).
- Intended behavior: responsive landing page with a header, theme toggle, hero section, and project links.

## High-level architecture & important files 🔧
- `index.html` — single-page content and the primary entry point. Navigation links use in-page anchors (e.g., `#projects`) or link to pages like `contact.html` (which is currently missing).
- `style.css` — theme-driven styling via CSS custom properties. Key variables: `--bg-color`, `--text-color`, `--muted-text`, `--accent-color`, and the `[data-theme="dark"]` override.
- `script.js` — theme toggle logic (reads/writes `localStorage.theme`, applies `data-theme` attribute on `<html>`). Use `#theme-toggle` button to change modes.
- `app.js` — empty placeholder. Avoid removing it without confirming intent; it may be reserved for future site behaviour.
- `images/` — contains assets (note there is a duplicated structure `images/images/` and some references to images that may be stale).

## Project-specific conventions & patterns ✅
- Theme handling: write JavaScript to toggle the `data-theme` attribute on `document.documentElement`. Prefer reading `localStorage` and falling back to `prefers-color-scheme` as done in `script.js`.
  - Example: check `root.getAttribute('data-theme') === 'dark'` and set `localStorage.setItem('theme', next)`.
- CSS variables are the single source of truth for color and small layout tweaks. Prefer updating variables in `:root` and `[data-theme="dark"]` rather than hard-coding colors across selectors.
- Class naming: hyphen-separated, semantic (e.g., `.hero`, `.cta-btn`, `.nav-links`, `.hero-image`). Follow the existing naming when adding new styles.
- Responsive breakpoints: media queries at 768px, 600px, 420px. Match them when adding responsive tweaks.

## Local development & debugging tips 🐞
- No build step — open `index.html` directly in a browser for quick checks. For a closer approximation of production file serving, run:
  - Python: `python -m http.server 8000` (run from project root) or
  - Node: `npx serve .` or use VS Code Live Server extension.
- Check the browser console for errors and missing assets (e.g., `contact.html` is linked but missing).
- When editing images, ensure relative paths match the file structure (`images/` vs `images/images/`) to avoid 404s.

## Common tasks & where to make changes ✍️
- Add a new page (e.g., `contact.html`): create the file at project root, reuse header markup, and link from `index.html`. Ensure anchor targets and class names match existing patterns.
- Update theme behavior: modify `script.js` and add tests by manual verification (click theme toggle; refresh to confirm persistence).
- Add interactive features: put new client-side logic in `script.js` or create a dedicated module file and reference it from `index.html`. Avoid adding server-side code — this project is static.

## Files to watch & sanity checks ⚠️
- `index.html`: verify all linked pages exist (e.g., `contact.html`) before merging PRs.
- `images/images/` duplication: prefer moving assets to top-level `images/` and normalizing paths.
- `app.js` empty file: confirm whether it's intended; if not used, consider removing it in a separate PR referencing intent.

## PR guidance for Copilot agents 🧭
- Keep changes minimal and focused: small PRs that update a single page or a single CSS module are preferred.
- When adding JS behavior, include a short manual test checklist in the PR description (e.g., "Click theme toggle → theme persists on reload").
- Don't assume build tooling or tests exist — add them explicitly and document how to run them if you introduce them.

---

If anything above is unclear or you'd like me to add explicit code snippets (e.g., a suggested `contact.html` scaffold or a small image-path normalization script), I can extend this file — tell me which sections to expand.