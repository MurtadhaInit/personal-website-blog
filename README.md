# Personal Website and Blog

> My personal website and blog — Astro 6, MDX, and Tailwind v4, deployed continuously to GitHub Pages. Live at [murtadha.dev](https://murtadha.dev).

[![Last commit](https://img.shields.io/github/last-commit/MurtadhaInit/personal-website-blog?style=flat-square&logo=git&logoColor=white)](https://github.com/MurtadhaInit/personal-website-blog/commits/main)
[![Deploy](https://img.shields.io/github/actions/workflow/status/MurtadhaInit/personal-website-blog/deploy.yml?style=flat-square&logo=githubactions&logoColor=white&label=deploy&branch=main)](https://github.com/MurtadhaInit/personal-website-blog/actions/workflows/deploy.yml)
[![Site](https://img.shields.io/website?url=https%3A%2F%2Fmurtadha.dev&style=flat-square&label=site)](https://murtadha.dev)
[![Repo size](https://img.shields.io/github/repo-size/MurtadhaInit/personal-website-blog?style=flat-square)](https://github.com/MurtadhaInit/personal-website-blog)
[![License](https://img.shields.io/github/license/MurtadhaInit/personal-website-blog?style=flat-square)](LICENSE)

## Overview

This is the source for my personal website and blog. It's a fully static site — every route is pre-rendered at build time, the output is plain HTML/CSS/JS with no runtime server, and the deploy pipeline is a `git push` to `main`. Blog content lives alongside the code as MDX with a zod-validated frontmatter schema, so adding a post is creating a directory and writing markdown.

The stack is deliberately modern: Astro 6 for the SSG framework, Tailwind CSS v4 (no JavaScript config — all configuration lives in CSS), MDX with custom typography component overrides, Astro view transitions for SPA-like navigation, and self-hosted fonts via Astro's Fonts API.

## Highlights

- **Static-site generation with Astro 6.** Every route is pre-rendered at build time. No runtime server; no client-side hydration except where explicitly opted in.
- **Tailwind CSS v4 with zero JavaScript config.** Theme tokens, the dark variant, and font registration all live in `src/styles/global.css` via `@theme` and `@custom-variant` blocks — no `tailwind.config.*` file.
- **Dark / light theme based on device preference or by choice.** Toggle state is stored in `localStorage`. An inline script in the document head applies the stored (or system) theme before first paint, and rebinds on every Astro view transition.
- **Content collections with schema validation.** Posts in `content/blog/` are loaded via a glob loader and validated against a zod schema (`src/content.config.ts`). Draft posts and future-dated posts are filtered out automatically.
- **MDX with custom typography overrides.** Components in `src/components/posts/` restyle markdown output (headings, paragraphs, lists, blockquotes, strong, …) to match the site's typography. Inline `<code>` is styled via a scoped CSS rule so Shiki's syntax highlighting for fenced code blocks stays untouched.
- **Self-hosted fonts via Astro's Fonts API.** Atkinson Hyperlegible Next and Mono are downloaded and self-hosted at build time, with the sans variant preloaded. No runtime request to Google.
- **Continuous deployment.** Every push to `main` triggers `.github/workflows/deploy.yml`, which builds via `withastro/action@v6` and publishes to GitHub Pages. The custom domain is pinned via `public/CNAME` and kept in sync with the `site` field in `astro.config.ts`.

## Quick Start

My package manager of choice is [Bun](https://bun.sh).

```bash
bun install        # install dependencies
bun dev            # start the dev server with hot reload
bun build          # production build to /dist
bun preview        # preview the production build locally
bun check          # type checking via astro check
bun format         # prettier
```

## Project Structure

```
content/blog/         # MDX blog posts (one directory per post; dir name = slug)
public/               # static assets served as-is (GitHub Pages CNAME, favicon, …)
src/
├── assets/           # images and other build-processed assets
├── components/       # reusable Astro components
│   └── posts/        # MDX element overrides (H2, P, Li, Blockquote, …)
├── content.config.ts # blog collection schema (zod) and loader
├── data/             # static data files (navigation, projects, contact links)
├── layouts/          # page layouts (Base, BlogPost)
├── pages/            # file-based routes
├── styles/           # global.css with Tailwind v4 config + theme tokens
└── utils/            # helpers (filterPosts, slugify, getReadingTime, …)
```

## License

Code in this repository is licensed under the [MIT License](LICENSE). Blog content under `content/` is licensed separately under [Creative Commons Attribution 4.0 International (CC BY 4.0)](LICENSE-CONTENT) — quote, excerpt, or translate freely with attribution.
