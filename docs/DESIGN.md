# DESIGN.md — NandX Cyberpunk Neon Design System

Visual and UI specification for the **NandX Cyberpunk Neon** HTML theme template.

## 1. Aesthetic Direction

- **Theme**: High-Tech / Neo-Tokyo HUD / Dark Obsidian + Electric Neon.
- **Feel**: Sharp, tactical, futuristic, high-contrast—engineered for readability in dark mode rather than visual clutter.
- **Core Rule**: Neon glows are accents, not backgrounds. Dark surfaces carry the content; neon borders, labels, and states guide attention.

## 2. Color Palette & CSS Tokens

All tokens live in `:root` (`assets/css/tokens.css`) using the `--nx-` prefix.

### Surfaces & Backgrounds

| Token | Hex / Value | Usage |
| :--- | :--- | :--- |
| `--nx-bg-void` | `#06070d` | Page canvas / deepest background |
| `--nx-bg-surface` | `#0d101b` | Primary cards, panels, sidebar |
| `--nx-bg-elevated` | `#14192b` | Hover surfaces, dropdowns, modals |
| `--nx-bg-glass` | `rgba(13, 16, 27, 0.78)` | Translucent HUD bars (`backdrop-filter: blur(12px)`) |

### Text Hierarchy

| Token | Hex / Value | Usage |
| :--- | :--- | :--- |
| `--nx-text-primary` | `#e8f0ff` | Headings and primary body copy |
| `--nx-text-secondary` | `#94a3c4` | Descriptions, metadata, table labels |
| `--nx-text-muted` | `#5a688a` | Placeholders, disabled text, subtle indices |

### Neon Accents & Semantic States

| Token | Hex / Value | Usage |
| :--- | :--- | :--- |
| `--nx-cyan` | `#00f0ff` | Primary action, active nav, focus rings |
| `--nx-magenta` | `#ff2a85` | Secondary highlight, hero accents, tags |
| `--nx-lime` | `#39ff14` | Online / success / system nominal |
| `--nx-amber` | `#ffb800` | Warning / pending / caution |
| `--nx-danger` | `#ff3b5c` | Error / critical alert / destructive action |

### Borders & Glows

- `--nx-border-subtle`: `rgba(0, 240, 255, 0.16)`
- `--nx-border-strong`: `rgba(0, 240, 255, 0.55)`
- `--nx-glow-cyan`: `0 0 12px rgba(0, 240, 255, 0.35), 0 0 28px rgba(0, 240, 255, 0.12)`
- `--nx-glow-magenta`: `0 0 12px rgba(255, 42, 133, 0.35), 0 0 28px rgba(255, 42, 133, 0.12)`

## 3. Typography

- **Display / HUD Headings**: `'Orbitron', 'Rajdhani', sans-serif` — geometric, uppercase or wide tracking (`0.06em`–`0.12em`) for section headers, KPIs, and nav brand.
- **Body**: `'Space Grotesk', 'Inter', system-ui, sans-serif` — clean legibility for paragraphs and forms.
- **Monospace / Telemetry**: `'JetBrains Mono', 'Fira Code', monospace` — codes, badges, timestamps, terminal blocks, and tabular numbers (`font-variant-numeric: tabular-nums`).

### Type Scale (Suggested)

- `h1`: `clamp(2rem, 4vw, 3.25rem)`
- `h2`: `clamp(1.5rem, 2.5vw, 2.125rem)`
- `h3`: `1.25rem`
- `body`: `1rem` (`line-height: 1.6`)
- `hud-label`: `0.75rem`, uppercase, `letter-spacing: 0.1em`, monospace

## 4. Shape, Borders & Surface Textures

- **Chamfered Corners (HUD Cut)**: Use `clip-path` for signature angled corners on primary buttons, feature cards, and callout panels:
  ```css
  clip-path: polygon(
    0 10px, 10px 0,
    100% 0, 100% calc(100% - 10px),
    calc(100% - 10px) 100%, 0 100%
  );
  ```
- **Crisp Borders**: Pair `1px solid var(--nx-border-subtle)` on standard rectangular cards, or use a wrapper/pseudo-element when combining `clip-path` with neon borders.
- **Cyber Grid & Scanlines**:
  - Subtle `24px` or `32px` background grid at `3%–5%` cyan opacity.
  - Optional scanline overlay (`pointer-events: none`, very low opacity `<= 0.04`) that can be toggled off.

## 5. Motion & Effects

- **Transitions**: Snappy `150ms–220ms cubic-bezier(0.2, 0.8, 0.2, 1)` for hover, border glow, and button states.
- **Micro-FX**:
  - Status dot pulse (`--nx-lime` / `--nx-cyan`).
  - Subtle glitch or chromatic shift on hero title hover (`.nx-glitch`) and periodic 5-second burst (`.nx-glitch--auto`).
  - HUD float (`.nx-anim-float`) & neon glow pulse (`.nx-anim-glow`).
  - Terminal cursor blink (`.nx-cursor`) for code/status snippets.
- **Accessibility**: `@media (prefers-reduced-motion: reduce)` must disable pulsing, glitching, and continuous animations.

## 6. Core Components & Templates

### Components (`components.css`)
- **Buttons (`.nx-btn`)**: Primary (Cyan), Secondary (Magenta), Ghost/HUD, Danger, Icon buttons, Button Groups (`.nx-btn-group`), Dropdowns (`.nx-dropdown`), Disabled.
- **Cards (`.nx-card`)**: Standard panel, Chamfered HUD panel with corner accent & header bar, Stat/KPI card, Color Swatches (`.nx-swatch`).
- **Navigation & Structure**: Sticky glass HUD navbar, responsive mobile drawer, dashboard sidebar with active neon rail, Breadcrumbs (slash, `.nx-breadcrumb--arrow`, `.nx-breadcrumb--hud`), Pagination, Horizontal & Vertical Tabs, Accordion / Collapse.
- **Forms & Inputs**: Terminal-style inputs, textareas, selects, checkboxes, radios, neon toggle switches, Range Sliders, Star/Cyber Rating, File Upload Dropzone, error/success validation states.
- **Feedback & Overlays**: Badges/chips, standard & dismissible alert banners, Toast / Floating Notifications, Modals (default, small, large form, danger, auth, scrollable), Tooltips & Popovers, Preloader / Spinners / Skeletons.
- **Data & Content Display**: Data tables with hover row highlight, Progress bars (sizes, striped, stacked) / Cyber radial gauges / Pure CSS Bar Charts / SVG Area, Line, Donut & Sparkline Charts, List Groups, Timeline, Code / Terminal block with syntax styling.

### Template Pages
1. **`index.html`** — Landing / Theme Showcase (Hero, feature grid, live preview cards, CTA).
2. **`components.html`** — Complete UI Kit reference (colors, typography, all components & states).
3. **`dashboard.html`** — Cyber HUD Admin / Telemetry layout (sidebar, stat cards, activity table, system status).
4. **`widgets.html`** — KPI & Data Widgets (statistic cards, pure-CSS/SVG sparklines, radial gauges, activity feed).
5. **`charts.html`** — Data Visualization Charts (area/line chart, vertical bar chart, donut chart, horizontal breakdown).
6. **`tables.html`** — Data Table & Grid layout (search/filter toolbar, sortable columns, row selection, status badges, pagination, responsive scroll).
7. **`forms.html`** — Form Layouts (single & multi-column grids, input groups, toggles, selects, range slider, rating, file upload dropzone, validation states).
8. **`task-board.html`** — Task / Kanban Board & To-Do layout (status columns, draggable-style cards, priority tags, quick-add).
9. **`invoice.html`** — Billing / Invoice layout (operator/client details, itemized table, tax/total summary, print-friendly styles).
10. **`search-result.html`** — Search Results & Empty State layout (search bar, filter tabs, highlighted results, empty-state fallback).
11. **`alerts.html`** — Alerts & Notifications showcase (standard alerts, dismissible alerts, and floating toast triggers).
12. **`animations.html`** — Animations & Micro-FX showcase (glitch hover, neon glow pulse, float, status pulse, spinner, cursor blink, scanlines).
13. **`breadcrumbs.html`** — Breadcrumbs & HUD Trails showcase (slash, magenta arrow, boxed HUD, and page header breadcrumbs).
14. **`buttons.html`** — Buttons Showcase (color variants, sizes, icon buttons, disabled states, button groups, dropdowns, full-width blocks).
15. **`modals.html`** — Modal Popups & Dialogs showcase (default, small, large form, danger, auth, and scrollable modals).
16. **`progress-bar.html`** — Progress Bars & Gauges showcase (semantic colors, sizes, striped, stacked segments, and SVG radial gauges).
17. **`login.html`** — Authentication layout (centered neon HUD card, login/register tabs, password toggle, social/SSO buttons).
18. **`reset-password.html`** — Password Recovery & Lock Screen layout (reset request flow & operator lock screen).
19. **`profile.html`** — User Profile & Settings (avatar/operator card, bio/stats, security & notification preferences).
20. **`coming-soon.html`** — Coming Soon / Maintenance & Offline UI state (HUD countdown, status message, notify form).
21. **`error.html`** — General System Error page (exception code, diagnostic message, recovery links).
22. **`404.html`** — Error / Signal Lost page (glitch 404 display, terminal diagnostic message, back-to-home CTA).
23. **`500.html`** — 500 Core Overload page (server fault log, retry button, back-to-home CTA).
