# Contributing to Incredible India Explorer

Thank you for considering contributing to Incredible India Explorer! We welcome contributions of all kinds — bug fixes, new explorer pages, UI improvements, documentation, and feature additions.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Adding a New Explorer Page](#adding-a-new-explorer-page)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)

## Code of Conduct

This project follows the [Contributor Covenant](CODE_OF_CONDUCT.md). By participating, you agree to maintain a respectful and inclusive environment.

## Getting Started

1. Fork the repository.
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/incredible-india-explorer.git
   ```
3. Open `index.html` in your browser — no build tools required.

The project is pure vanilla HTML, CSS, and JavaScript. There is no bundler, framework, or package manager setup needed.

## Development Workflow

1. Create a branch from `main`:
   ```bash
   git checkout -b fix/your-fix-name main
   ```
2. Make your changes following the [Coding Standards](#coding-standards).
3. Test locally by opening the relevant HTML files in your browser.
4. Check for console errors and responsive layout issues.
5. Commit and push, then open a Pull Request.

## Project Structure

```
incredible-india-explorer/
  index.html              -- Landing page with map, cuisine, festivals, quiz
  app.js                  -- Core application logic (navigation, map, theme, quiz)
  styles.css              -- Global stylesheet (~18k lines)
  pages-common.js         -- Shared logic for newer pages (tribes, coins, rivers)
  pages-common.css        -- Shared styles for newer pages
  router.js               -- SPA routing engine with lifecycle management
  data.js                 -- Map coordinates and state data
  journey.js              -- Bookmark ("My Journey") system
  search-index.js         -- Client-side search index
  auth.js / auth-core.mjs -- Authentication (Firebase + localStorage fallback)
  sw.js                   -- Service Worker with caching strategies
  js-modules/             -- Page-specific lazy-loaded JS modules
  assets/                 -- Images and icons
  states/                 -- Individual state detail pages
  docs/                   -- Additional documentation and test files
  .github/                -- Issue templates, PR template, workflows
```

## Coding Standards

### HTML
- Use semantic HTML5 elements (`<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`).
- Include `aria-label`, `role`, and `alt` attributes for accessibility.
- Use lowercase for tag and attribute names.

### CSS
- Use CSS custom properties from `:root` in `styles.css` for consistency.
- Follow the existing naming convention: `.kebab-case-classnames`.
- Support both dark (default) and light theme via `.light-theme` on `<body>`.
- Write responsive styles using the existing breakpoints (1024px, 768px, 640px).

### JavaScript
- Use vanilla JavaScript — no frameworks or libraries.
- Prefer `function` declarations over arrow functions for page-level logic.
- Use `const` and `let` (never `var` except when needed for wider scope).
- Expose shared APIs on `window` (e.g., `window.Journey`, `window.ToastNotifier`).
- Wrap modules in IIFE `(function() { ... })()` to avoid polluting global scope.
- Lazy-load page-specific modules via `window.lazyLoadScript()`.
- Handle errors gracefully with `try/catch` and user-facing toast notifications.

### Accessibility
- All interactive elements must be keyboard-accessible.
- Use `aria-live` regions for dynamic content updates.
- Maintain focus trapping for modals and overlays using `window.setupFocusTrap()`.

## Adding a New Explorer Page

Every new explorer page should integrate with the shared systems:

1. **Bookmark support** — Add a bookmark button on each card using `window.Journey.toggle()`.
2. **Search indexing** — Register your page's content via `window.Journey.registerSearchItems()`.
3. **Shared navigation** — Include the `.journey-nav-search` block and a link in the nav dropdown.
4. **Service Worker** — No extra work needed; the SW will cache your page automatically.

See the "My India Journey" section in [README.md](README.md) for detailed instructions.

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>: <short description>

<optional body>
```

Types:
- `feat:` — New feature or page
- `fix:` — Bug fix
- `docs:` — Documentation only
- `style:` — CSS or formatting changes (no logic change)
- `refactor:` — Code restructuring
- `perf:` — Performance improvement
- `a11y:` — Accessibility improvement
- `chore:` — Tooling, config, or CI changes

## Pull Request Process

1. Ensure your branch is based on the latest `main`.
2. Keep PRs focused — one change per PR.
3. Update documentation if your change affects the public API or setup.
4. Verify your changes work locally in both dark and light themes.
5. Fill out the [PR template](.github/PULL_REQUEST_TEMPLATE.md) completely.
6. A maintainer will review your PR. Address any feedback promptly.

## Issue Reporting

- Check existing issues before creating a new one.
- Use the appropriate issue template (bug, feature, enhancement, UI/UX).
- Provide clear steps to reproduce for bugs.
- Include screenshots or screen recordings for UI-related issues.
