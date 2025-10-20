# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website and blog built with **Astro 5.1.1** using static site generation (SSG). The site features a blog system with tags and categories, dark/light theme toggle, and responsive design using Tailwind CSS.

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
- Check types for project: `pnpm astro check`

## Architecture Overview

### Routing Structure (File-Based)

Astro uses file-based routing in `src/pages/`:
- `index.astro` → `/` (home page with latest posts)
- `blog/[...page].astro` → `/blog`, `/blog/page/2`, etc. (paginated blog list)
- `blog/[post].astro` → `/blog/[post-id]` (individual post)
- `blog/tags/[tag].astro` → `/blog/tags/[tag-name]` (posts by tag)
- `blog/categories/[category].astro` → `/blog/categories/[category-name]` (posts by category)
- `robots.txt.ts` and `rss.xml.ts` → Generated SEO/feed files

### Content Management

Blog posts are managed via **Astro Content Collections** in the `content/blog/` directory.

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
- Theme preference stored in localStorage
- Applied via `class="dark"` on `<html>` element
- Tailwind's `dark:` modifier enables theme-specific styles
- Theme colors defined in `tailwind.config.mjs` under `theme.dark.*` and `theme.light.*`
- Theme toggle script lives in `Base.astro` layout

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

1. Create a new `.md` or `.mdx` file in `content/blog/`
2. Include required frontmatter (title, date, cover, description, category, tags)
3. Set `draft: false` when ready to publish
4. Place cover images in `src/assets/images/blogPostImages/`
5. Reference images using `@assets/images/blogPostImages/filename.jpg`

### Styling Conventions

- **Tailwind CSS**: Primary styling method (utility-first)
- **Global styles**: `src/styles/globals.css` (minimal, mostly Tailwind imports)
- **Scoped styles**: Use `<style>` blocks in Astro components when needed
- **Responsive design**: Mobile-first with breakpoints (`md:`, `lg:`, etc.)

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

- `astro.config.mjs`: Astro configuration, integrations, site URL
- `tailwind.config.mjs`: Theme colors, dark mode config
- `tsconfig.json`: TypeScript config with path aliases
- `src/content.config.ts`: Content collection schemas

## Build Output

Production build generates:
- Static HTML for all routes
- Optimized CSS (Tailwind purged)
- Optimized images (WebP, multiple sizes)
- RSS feed (`/rss.xml`)
- Sitemap (`/sitemap.xml`)
- Robots.txt (`/robots.txt`)
