# AGENTS.md

Guidelines for AI coding agents working on **theme-nandx-cyberpunk-neon**.

## Project Goal

Build a clean, modular, framework-agnostic **Cyberpunk Neon HTML Theme Template** that the user can easily preview in a browser and port into any target project (static site, SPA, or server-rendered app).

## Architecture & Tech Stack

- **HTML5**: Semantic elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<aside>`, `<footer>`), proper heading hierarchy, and accessible ARIA attributes.
- **CSS3**: Vanilla modular CSS without mandatory preprocessors or bundlers.
  - Use CSS Custom Properties prefixed with `--nx-` (e.g., `--nx-cyan`, `--nx-bg-surface`) in `assets/css/tokens.css`.
  - Keep layout, base styles, and components cleanly separated so users can cherry-pick what they need.
  - Use modern CSS (`flexbox`, `grid`, `clamp()`, `:focus-visible`, `clip-path`).
- **JavaScript**: Minimal, dependency-free Vanilla JS (`assets/js/main.js`) for progressive enhancement only (mobile nav toggle, tabs, modals, theme/FX toggles). The layout and core UI must work even before JS runs.

## Visual & Accessibility Rules

Follow [DESIGN.md](./docs/DESIGN.md) as the source of truth. In addition:

1. **Readability First**: Never apply heavy neon `text-shadow` to body paragraphs or dense table data. Keep body text crisp on dark surfaces (`>= 4.5:1` contrast).
2. **Reduced Motion**: Wrap decorative animations (glitch, scanlines, pulse, border sweep) in `@media (prefers-reduced-motion: reduce)` overrides that disable or simplify motion.
3. **Keyboard & Focus**: Every interactive element (`button`, `a`, `input`, `select`) must have a clear `:focus-visible` state (e.g., high-contrast neon outline).
4. **No Heavy Assets**: Prefer CSS gradients, SVG icons (inline or lightweight), and Google Fonts with solid system fallbacks over large images or external UI frameworks.

## Coding Conventions

- Use 2-space indentation for HTML, CSS, and JS.
- Use clear, predictable class naming (e.g., `.nx-btn`, `.nx-btn--magenta`, `.nx-card`, `.nx-badge`).
- Avoid inline styles in HTML templates; put reusable styles in CSS classes or tokens.
- Keep relative paths valid when opening `*.html` via `file://` or a local HTTP server.

## Verification Checklist

Before finishing any UI or code task:

- Confirm all links between HTML pages and `assets/*` resolve properly.
- Verify responsive behavior at mobile (`375px`), tablet (`768px`), and desktop (`1280px+`) widths.
- Check that no horizontal overflow occurs on mobile viewports.
- Confirm interactive states (hover, focus-visible, active, disabled) are styled and distinct.
