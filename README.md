# NandX Cyberpunk Neon — HTML Theme Template

A framework-agnostic, dark-first **Cyberpunk Neon** HTML/CSS/JS theme template designed to be dropped into web apps, dashboards, landing pages, or admin panels.

## ✨ Highlights

- **Pure HTML, CSS & Vanilla JS** — Zero build step required; 23 ready-to-use HTML pages easy to port into React, Vue, Next.js, Laravel, or static sites.
- **Token-Driven Design** — All colors, glows, typography, spacing, and z-index layers are defined via CSS custom properties (`--nx-*`).
- **Cyberpunk HUD Aesthetic** — Chamfered corners (`clip-path`), crisp 1px neon borders, subtle grid/scanline overlays, and high-contrast dark surfaces.
- **Accessible by Default** — Readable body contrast (`>= 4.5:1`), visible keyboard focus rings, and `prefers-reduced-motion` support.

## 📁 Project Structure

```text
theme-nandx-cyberpunk-neon/
├── .gitignore
├── README.md
├── AGENTS.md              # Guidelines for AI coding agents
├── LICENSE                # MIT License
├── docs/
│   └── DESIGN.md          # Visual design system & component specs
├── index.html             # Theme showcase / landing template
├── dashboard.html         # Cyber HUD dashboard layout
├── widgets.html           # KPI cards, pure-CSS/SVG charts & gauges
├── charts.html            # Area, bar, donut & horizontal breakdown charts
├── tables.html            # Data table layout (search, filters, pagination)
├── forms.html             # Form layouts, validation, range/rating, upload
├── task-board.html        # Kanban / task board & to-do layout
├── invoice.html           # Billing & printable cyber invoice layout
├── search-result.html     # Search results & empty/filter state
├── alerts.html            # Alerts, dismissible banners & toast FX
├── animations.html        # CSS glitch, glow, float & scanline micro-FX
├── breadcrumbs.html       # Breadcrumbs & HUD navigation trails
├── buttons.html           # Buttons, sizes, groups & dropdowns
├── modals.html            # Dedicated modal popups & dialogs showcase
├── progress-bar.html      # Progress bars, stacked segments & radial gauges
├── login.html             # Authentication / login & register page
├── reset-password.html    # Password recovery & lock screen variants
├── profile.html           # User profile & account settings
├── coming-soon.html       # Countdown / maintenance / offline state
├── error.html             # General system exception / error page
├── 404.html               # Cyberpunk error / signal lost page
├── 500.html               # 500 internal server / core overload page
├── components.html        # UI kit & component reference
└── assets/
    ├── css/
    │   ├── tokens.css     # Color, typography, glow & spacing variables
    │   ├── base.css       # Reset, typography, scrollbars, grid/scanlines
    │   ├── components.css # Buttons, cards, forms, badges, tables, modals
    │   └── layouts.css    # Navbar, sidebar, grid shells
    └── js/
        └── main.js        # Minimal interactive helpers (toggles, modals, tabs)
```

## 🚀 Quick Start

1. Clone or copy this repository into your workspace.
2. Open `index.html` directly in a browser, or serve it locally:
   ```bash
   npx serve .
   # or
   python -m http.server 8080
   ```
3. To integrate into your own project, copy `assets/css/tokens.css` and `assets/css/components.css`, then customize the `--nx-*` CSS variables in `:root`.

## 📚 Documentation

- **[DESIGN.md](./docs/DESIGN.md)** — Color palette, typography, HUD geometry, motion rules, and component specifications.
- **[AGENTS.md](./AGENTS.md)** — Architecture rules, coding conventions, and quality checklists for AI agents working on this repo.

## 📄 License

This project is licensed under the **[MIT License](./LICENSE)**.
