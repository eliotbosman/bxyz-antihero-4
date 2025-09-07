# Anti Hero — Automation Plan

This document outlines what we can automate for fast, repeatable site building: generating pages, sections, assets, and related plumbing. It’s designed to fit the current structure of `BXYZ25_AH_Sketch_1/`.

## Objectives
- **Speed**: Create pages/sections in seconds with consistent scaffolding.
- **Consistency**: Enforce naming, structure, and tokens across the codebase.
- **Safety**: Idempotent generators with dry-run and rollback.

## What we can automate
- **Pages**: Generate HTML files, route entries, skeleton content, meta tags.
- **Sections**: Reusable blocks (hero, grid, marquee, product list) with markup, CSS, and optional JS hooks.
- **Components**: Smaller partials (buttons, cards, badges) and utility classes.
- **Data-driven content**: Build pages/sections from JSON/YAML (e.g., collections, product grids).
- **Assets**: Copy/optimize images (`01_BXYZ_AH_IMG_TEST/`, `01_BXYZ_AH_PRD_TEST/`) and generate responsive `srcset`.
- **Fonts**: Already covered with `dedupe-fonts.js`; extend to auto-`@font-face` (see `fonts.generated.css`).
- **SEO**: Title/description, OpenGraph/Twitter tags, sitemap.xml, robots.txt.
- **Scaffolding**: Test stubs, story/demo page, and playground links.

## Inputs and conventions
- **Tokens**: Use `variables.css` for colors, spacing, typography vars.
- **Global CSS**: `base.css`, `style.css`, and any section CSS bundles.
- **JS hooks**: `animations.js` for scroll/GSAP hooks; optional per-section init function.
- **Templates dir**: `tools/templates/` for `.html`, `.css`, `.js` blueprints with placeholders like `{{Name}}`, `{{slug}}`.
- **Data dir**: `content/` for `.json` or `.yml` to drive generation.
- **Output dirs**: `pages/` for multipage setups; keep `index.html` as the home.

## Generators (proposed CLI)
- **Create Page**
  - Command: `node tools/create-page.js "Landing" --slug landing --layout default`
  - Generates: `pages/landing/index.html`, optional `pages/landing/landing.css`, adds to `site-map.json` and home nav.
- **Create Section**
  - Command: `node tools/create-section.js "HeroBanner" --variant image-left`
  - Generates: `sections/HeroBanner/HeroBanner.html|css|js`
  - Registers: Exports an init in `sections/index.js` and import in `animations.js` when needed.
- **Create Component**
  - Command: `node tools/create-component.js "Button"`
  - Generates: `components/Button/Button.html|css|js`, adds utility classes.
- **Generate Collection Pages**
  - Command: `node tools/generate-collection.js --data content/collections.json`
  - For each item, emits a page using `templates/page.collection.html`.

Each CLI supports: `--dry-run`, `--force`, `--path <dir>`, `--css single|split`, and prints a summary.

## Templating approach
- **Lightweight**: Use string templates with Handlebars/EJS, or pure JS template literals.
- **Placeholders**: `{{Title}}`, `{{Description}}`, `{{Slug}}`, `{{SectionName}}`.
- **Partials**: Header/footer/navigation stored under `templates/partials/` and included by the generator.

## File structure (proposed additions)
- `tools/`
  - `create-page.js`
  - `create-section.js`
  - `create-component.js`
  - `generate-collection.js`
  - `templates/`
    - `page.default.html`
    - `section.default.html|css|js`
    - `component.default.html|css|js`
    - `partials/{head,header,footer}.html`
- `pages/` (generated)
- `sections/` (generated)
- `components/` (generated)
- `content/` (source data)

## Routing and navigation
- **Site map**: Maintain `site-map.json` (title, slug, priority).
- **Index updates**: Generator can update `index.html` nav or a shared `partials/header.html`.
- **Sitemap.xml**: Auto-regenerate from `site-map.json`.

## Styles and tokens
- **Variable-first**: Use CSS vars from `variables.css` (e.g., typography scale, colors).
- **Scoping**: BEM-style or section-scoped classes (e.g., `.section-HeroBanner`).
- **Bundles**: Option to emit a single `style.css` import or per-section CSS file.

## Fonts integration
- **Dedup/near-dup**: via `dedupe-fonts.js` (done).
- **Face generation**: consolidate to `fonts.generated.css` and keep it linked in `index.html`.
- **Naming**: Generators should reference families via CSS vars (e.g., `var(--font-primary)`).

## Assets pipeline (optional)
- **Image variants**: Create `@1x/@2x/webp` variants and `srcset` tags.
- **Lazy loading**: Add `loading="lazy"` by default and sizes.
- **Compression**: Use `sharp` in `tools/` if/when Node deps are allowed.

## Accessibility & performance
- **A11y**: Provide alt text prompts, ARIA roles when applicable.
- **Lighthouse**: Optionally generate a quick checklist or run CI audits.
- **Anim perf**: Section JS hooks must be guarded for reduced motion.

## SEO defaults
- **Meta**: Title/description/og:image placeholders.
- **Feeds**: Optional `rss.xml`/`atom.xml` generator.
- **Robots**: Create `robots.txt` with sensible defaults.

## Testing & CI (future)
- **Smoke tests**: Validate generated HTML (missing assets, broken links).
- **Link check**: Simple crawler for internal 404s.
- **CI**: Run generators on PR to preview diffs and publish to a static host.

## Safety & ergonomics
- **Dry-run**: All generators print the plan with diffs.
- **Rollback**: Write changes to a temp area first, then swap on success.
- **Idempotency**: Re-running should not duplicate blocks; use markers in files.
- **Logging**: Clear summaries with counts and next steps.

## Quick start (when we decide to build it)
1. Create `tools/templates/` with base templates and partials.
2. Implement `tools/create-section.js` first (lowest risk, high reuse).
3. Add `--dry-run` and `--apply` modes, like `dedupe-fonts.js`.
4. Extend to `create-page.js` and `generate-collection.js`.
5. Wire optional imports into `index.html` or `partials/header.html`.

## Notes aligned to current repo
- Use existing `animations.js` to register any section initializers.
- Keep using `variables.css`, `base.css`, and `style.css` for tokens and global rules.
- Fonts are handled via `fonts.css` + `fonts.generated.css`; keep that pipeline intact.
