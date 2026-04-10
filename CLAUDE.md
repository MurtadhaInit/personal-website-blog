# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website and blog built with **Astro 5** using static site generation (SSG). The site features a blog system with tags and categories, a dark/light theme toggle, and responsive design using **Tailwind CSS v4** (via the `@tailwindcss/vite` plugin). The **React** and **MDX** integrations are also enabled (see `astro.config.mjs`) so posts can use `.mdx` and components can use JSX when needed.

## Development Commands

### Essential Commands
```bash
# Start development server (with hot reload)
bun dev

# Build for production (outputs to /dist)
bun build

# Preview production build locally
bun preview

# Type checking
bun check

# Format code
bun format
```

**Note**: This project uses **Bun** as the package manager (specified in package.json).

### Single File Operations
- No test suite currently exists
- Format a single file: `prettier --write path/to/file.{js,ts,astro}`
- Check types for project: `bun check` (runs `astro check` under `@astrojs/check`)

## Architecture Overview

### Routing Structure (File-Based)

Astro uses file-based routing in `src/pages/`:
- `index.astro` → `/` (home page with latest posts)
- `blog/[...page].astro` → `/blog`, `/blog/2`, etc. (paginated blog list; Astro's `paginate()` default, no `page/` segment)
- `blog/posts/[post].astro` → `/blog/posts/[post-id]` (individual post; renders MDX/MD via `<Content components={{ h2: H2, p: P }} />`)
- `blog/tags/[tag].astro` → `/blog/tags/[tag-name]` (posts by tag)
- `blog/categories/[category].astro` → `/blog/categories/[category-name]` (posts by category)
- `404.astro` → not-found page
- `robots.txt.ts` and `rss.xml.ts` → Generated SEO/feed files

### Content Management

Blog posts are managed via **Astro Content Collections** in the `content/blog/` directory. Both `.md` and `.mdx` files are supported — the collection loader uses the glob pattern `**/*.{md,mdx}` (see `src/content.config.ts`).

**Schema** (defined in `src/content.config.ts`):
```typescript
{
  title: string (max 60 chars)
  date: Date
  author: string (default: "Murtadha A.")
  cover: image (optimized at build time)
  coverAlt: string
  description: string (max 160 chars for SEO)
  draft: boolean
  category: string (single category)
  tags: string[] (multiple tags)
}
```

**Key behaviors**:
- Posts with `draft: true` are excluded from publication
- Posts with future dates are automatically hidden
- Posts are sorted by date (newest first) by default
- Use `filterPosts()` utility in `src/utils/utils.ts` for filtering

### Component Architecture

**Layouts** (`src/layouts/`):
- `Base.astro`: Root layout with header, footer, theme management, and Astro view transitions
- `BlogPost.astro`: Specialized layout for blog posts with sidebar (related posts, tags)

**Key Components** (`src/components/`):
- `Header.astro`: Navigation with responsive menu and theme toggle
- `Footer.astro`: Footer navigation (filtered by `footerNav: true` in navData.ts)
- `PostCard.astro`: Blog post preview card with cover image
- `TagsCloud.astro`: Tag display with optional post counts
- `RelatedPosts.astro`: Scores and displays related posts by shared tags
- `Pagination.astro`: Page navigation for blog list
- `posts/*.astro`: HTML-element overrides injected into MDX rendering (e.g. `H2.astro`, `P.astro`). These are passed to the `<Content components={{...}} />` prop in `src/pages/blog/posts/[post].astro` — add new overrides here and wire them in the same place

**Static Data** (`src/data/`):
- `navData.ts`: Header/footer navigation structure
- `contactLinks.ts`: Social media links
- `technologies.ts`: Tech stack displayed on home page

### Path Aliases

TypeScript path aliases are configured in `tsconfig.json`:
```typescript
import Header from "@components/Header.astro"
import { filterPosts } from "@utils/utils.ts"
import profilePic from "@assets/images/profile.jpg"
```

Available aliases: `@components`, `@layouts`, `@styles`, `@assets`, `@data`, `@utils`

### Theme System

The site uses a manual dark/light theme toggle:
- Theme preference stored in `localStorage` under the key `theme`
- Applied via `class="dark"` on the `<html>` element
- The dark variant is wired up via `@custom-variant dark (&:where(.dark, .dark *));` in `src/styles/global.css` (Tailwind v4 — no JS config file)
- Theme colors are declared as CSS custom properties inside an `@theme` block in `src/styles/global.css` (e.g. `--color-theme-light-fill`, `--color-theme-dark-accent`). Tailwind v4 automatically exposes these as utility classes like `bg-theme-light-fill` and `text-theme-dark-accent`
- An inline anti-flash script in `Base.astro`'s `<head>` applies the stored/system theme before the page renders; the full toggle + system-sync logic lives in a `<script>` at the bottom of `Base.astro` and re-binds on each `astro:page-load` event (required because of `<ClientRouter />` view transitions)

### Utility Functions

**`src/utils/utils.ts`**:
- `slugify(text)`: Convert strings to URL-safe slugs
- `filterPosts(posts, { noDrafts, noFuturePosts, sortByDate, limit })`: Filter and sort posts
- `getRelatedPosts(originalPost, allPosts)`: Score posts by tag relevancy
- `getAllCategories(posts)`: Extract unique categories

**`src/utils/TagsUtils.ts`**:
- `getAllTags(posts)`: Extract unique tags
- `tagsToNumberOfPosts(tags, posts, limit)`: Map tags to post counts

### Adding New Blog Posts

1. Create a new `.md` or `.mdx` file in `content/blog/` — the filename becomes the post ID and URL slug (`/blog/posts/<filename>`)
2. Include required frontmatter (title, date, cover, coverAlt, description, draft, category, tags)
3. Set `draft: false` when ready to publish (draft posts and posts with future dates are filtered out by `filterPosts()`)
4. Place cover images in `src/assets/images/blogPostImages/` and reference them in the `cover` frontmatter field using `@assets/images/blogPostImages/filename.jpg`
5. For `.mdx` posts that need custom HTML element rendering, edit or add components in `src/components/posts/` and pass them into `<Content components={{...}} />` in `src/pages/blog/posts/[post].astro`

### Styling Conventions

- **Tailwind CSS v4**: Primary styling method (utility-first). Integrated via `@tailwindcss/vite` — there is **no** `tailwind.config.*` file. All configuration (theme tokens, dark variant, fonts) lives in `src/styles/global.css`
- **Global styles**: `src/styles/global.css` (singular — imports Tailwind, declares `@theme` tokens, `@custom-variant dark`, and registers fonts via `@font-face`)
- **Scoped styles**: Use `<style>` blocks in Astro components when needed
- **Responsive design**: Mobile-first with breakpoints (`md:`, `lg:`, etc.)
- **Custom fonts**: Atkinson Hyperlegible Next (`.woff2` files in `public/fonts/`) is registered via `@font-face` in `global.css` and set as the default sans font via `--font-sans`. Additional variants (`AtkinsonNextRegular`, `AtkinsonNextBold`) are also registered but may only be referenced contextually

### Static Site Generation

All pages are pre-rendered at build time:
- `getStaticPaths()` generates routes for dynamic pages (blog posts, tags, categories)
- `getCollection("blog")` loads content at build time
- No runtime database queries or API calls
- Output is fully static HTML/CSS/JS in `/dist`

### Icon System

Uses `astro-icon` with multiple icon sets:
- Material Design Icons (`mdi:*`)
- Line MD (`line-md:*`)
- Devicon Plain (`devicon-plain:*`)
- Simple Icons (`simple-icons:*`)

Icon configuration in `astro.config.mjs` specifies exactly which icons to include (tree-shakeable).

## Project-Specific Conventions

1. **Author default**: All blog posts default to "Murtadha A." if author not specified
2. **Date handling**: Use `Date` objects in frontmatter, formatted in templates
3. **SEO limits**: Titles max 60 chars, descriptions max 160 chars
4. **Navigation filtering**: Use `footerNav` boolean in `navData.ts` to control footer visibility
5. **Image optimization**: Always use Astro's `<Image>` component, not `<img>` tags
6. **Related posts**: Calculated by scoring shared tags between posts
7. **Tag display**: Often randomly sorted for visual variety

## Configuration Files

- `astro.config.mjs`: Astro config — integrations (`icon`, `sitemap`, `react`, `mdx`), the `@tailwindcss/vite` plugin, and `site: "https://murtadha.dev"` (must stay in sync with the `CNAME`)
- `src/styles/global.css`: **Tailwind v4 configuration** lives here (`@theme`, `@custom-variant dark`, `@font-face`) — this replaces the old `tailwind.config.mjs`
- `tsconfig.json`: Extends `astro/tsconfigs/strict`; defines path aliases and enables React JSX (`"jsx": "react-jsx"`, `"jsxImportSource": "react"`)
- `src/content.config.ts`: Content collection schema (zod) and loader (glob-based)
- `.prettierrc.js`: Prettier config with `prettier-plugin-astro` + `prettier-plugin-tailwindcss` (Tailwind plugin must load last so it can see the Astro parser)

## Build Output

Production build generates:
- Static HTML for all routes
- Optimized CSS (Tailwind purged)
- Optimized images via `sharp` (WebP, multiple sizes)
- RSS feed (`/rss.xml`)
- Sitemap (`/sitemap-index.xml` + `/sitemap-0.xml`, per `@astrojs/sitemap` defaults)
- Robots.txt (`/robots.txt`)

## Deployment

The site is deployed to **GitHub Pages** from the `main` branch via `.github/workflows/deploy.yml`, which uses `withastro/action@v3` (Node 20) to install, build, and upload. The custom domain is pinned via `public/CNAME` (`murtadha.dev`), and must stay consistent with the `site` field in `astro.config.mjs` so absolute URLs (sitemap, RSS, canonical links) resolve correctly. The `dev` branch is used for in-progress work; only merges to `main` trigger a deploy.
