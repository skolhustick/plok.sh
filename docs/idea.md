# RepoBlog (working title)

> GitHub repo → `/blog` markdown → fast blog

---

## Philosophy (non-negotiable)

- **GitHub is the database.** We do not add one.
- **No auth.** No dashboards. No editor. No "accounts".
- **Fault tolerant by default:** missing/broken config, missing posts, GitHub hiccups → graceful output.
- **Fast via caching, not heroics:**
  - Next.js ISR for HTML caching
  - Raw GitHub CDN for markdown bytes
- **Minimal surface area:**
  - Predefined themes only (editor-inspired)
  - Predefined fonts only
  - No custom CSS, no custom JS, no HTML injection inside markdown
- **Security:** treat all repo content as untrusted input.

---

## Product shape (routes)

| Route | Description |
|-------|-------------|
| `/` | Landing + docs on one page. Contains: "How it works", URL examples, config schema, theme list. |
| `/[user]` | List public repos of user that contain `/blog`. Only show repos that have a `blog/` folder. |
| `/[user]/[repo]` | Repo blog index (TOC): Reads `/blog` directory, lists `.md` files. Each item links to `/[user]/[repo]/[slug]`. |
| `/[user]/[repo]/[slug]` | Post page: Fetch markdown, render HTML (Shiki code highlighting), build per-post TOC from headings, apply theme/font from config (or defaults). |

---

## URL rules

- Post slug maps to filename:
  - `/[user]/[repo]/hello-world` → `/blog/hello-world.md`
- Nested folders optional later (v1: flat `/blog/*.md` only).
- If users insist on subfolders later:
  - Accept `/[...slug]` and map to `/blog/${slugParts.join("/")}.md`

---

## Data sources (GitHub)

We use two mechanisms:

### A) GitHub Contents API (directory listing + file existence + raw links)

- **List blog posts:**
  ```
  GET https://api.github.com/repos/{user}/{repo}/contents/blog
  ```
- **Read config:**
  ```
  GET https://api.github.com/repos/{user}/{repo}/contents/blog.config.yaml
  ```
- Each file object may include `download_url` — use that to fetch raw markdown/config reliably.

### B) raw.githubusercontent.com (fallback direct raw fetch)

- If needed:
  ```
  https://raw.githubusercontent.com/{user}/{repo}/{branch}/blog/{slug}.md
  ```
- Prefer Contents API `download_url` to avoid branch guessing.

---

## Rate limits and how we avoid becoming a cautionary tale

- Without token, GitHub REST API is limited (~60 req/hr/IP). Vercel IPs are shared → ugly.
- We **MUST** support `GITHUB_TOKEN` (classic token with `public_repo` is enough).
- ISR revalidation ensures most requests never touch GitHub.
- For `/[user]` listing repos-with-`/blog`:
  - Implement using GitHub GraphQL in ONE request (efficient).
  - If token is missing, degrade: show an instruction page "Set token to enable `/user` discovery".

---

## Caching strategy (no KV in v1)

- Use Next.js fetch caching + ISR:
  - `/[user]` → revalidate: 3600 (1 hour)
  - `/[user]/[repo]` → revalidate: 300 (5 min)
  - `/[user]/[repo]/[slug]` → revalidate: 300 (5 min)
  - `/` → revalidate: static
- "Stale until revalidated" behavior is acceptable by design.
- If GitHub is down during regen:
  - Serve last cached HTML if it exists (Next generally does).
  - If first request ever: show friendly "Source unavailable" page, not a crash.

---

## Fault tolerance requirements (must implement)

### Config handling
- If config missing → defaults.
- If config invalid YAML → defaults + ignore bad fields.
- Unknown theme/font values → fallback to defaults.

### Blog folder handling
- If `/blog` folder missing:
  - `/[user]/[repo]` shows "No blog found in this repo."
  - `/[user]` filters it out (when filtering is enabled).

### Post handling
- If post file missing → 404 page.
- If markdown parsing fails → render a minimal error section + show raw text fallback (escaped).

### Networking handling
- All GitHub fetches:
  - Timeouts (e.g., 8s) + controlled errors
  - Never throw uncaught exceptions to the runtime
  - Return typed `Result` objects

---

## Theming

### Theme names (initial set)

- `github-light`
- `github-dark`
- `one-dark`
- `gruvbox-dark`
- `gruvbox-light`
- `solarized-dark`
- `solarized-light`
- `nord`
- `dracula`
- `tokyo-night`
- `monokai`

### How themes work

Each theme is just CSS variables (tokens):

```css
--bg, --fg, --muted, --border, --accent,
--code-bg, --code-fg,
--link, --link-hover
```

Apply via:

```html
<html data-theme="gruvbox-dark" data-font="jetbrains">
```

### Fonts (predefined)

- `system`
- `inter`
- `jetbrains`

No external font CDNs in v1; ship fonts or use system stack.

---

## Config file (`blog.config.yaml`)

**Location:** repo root.

**Schema (all optional):**

```yaml
title: "My Repo Blog"
description: "Notes"
theme: "gruvbox-dark"     # must be in allowed list
font: "system"            # system | inter | jetbrains
accent: "#fabd2f"         # optional override
show_toc: true
show_repo_link: true
```

**Rules:**

- `accent` must be validated as hex color (`#RGB`, `#RRGGBB`). If invalid → ignore.
- No custom CSS hooks beyond `accent`.

---

## Markdown rendering rules

- **Disallow raw HTML** embedded in markdown (avoid injection): `markdown-it: { html: false }`
- **Support:** Headings, Lists, Links, Code fences, Blockquotes, Tables

### Syntax highlighting

- Shiki via markdown-it integration.
- Use a Shiki theme aligned to blog theme (mapping table).

### TOC extraction

- Collect `h2`/`h3` headings while parsing tokens.
- Generate `id` anchors (slugify heading text) and list of `{ level, text, id }`

### Title logic

- If first heading is H1 → use as post title and optionally remove it from body render.
- Else title = slug (humanized).

---

## Repo index (TOC) logic

1. Fetch `/blog` directory listing.
2. Filter files: include `*.md`, exclude `README.md` optional.
3. For each post: `slug` = filename without `.md`, `title = humanizeSlug(slug)`.
4. Sort posts alphabetically by slug (v1).

---

## `/[user]` repo discovery (best-effort)

### Preferred (token available): GitHub GraphQL

```graphql
query($login: String!, $first: Int!, $after: String) {
  user(login: $login) {
    repositories(first: $first, after: $after, privacy: PUBLIC, orderBy: {field: UPDATED_AT, direction: DESC}) {
      pageInfo { hasNextPage endCursor }
      nodes {
        name
        description
        url
        object(expression: "HEAD:blog") { __typename }
      }
    }
  }
}
```

Filter nodes where `object.__typename == "Tree"`.

### Fallback (no token)

Disable `/[user]` page with a friendly message: "Repo discovery requires a GitHub token."

---

## Tech stack requirements

- Next.js App Router
- TypeScript
- Tailwind CSS + `@tailwindcss/typography`
- `markdown-it` + `shiki`
- `yaml` parser

**Runtime:** Node.js runtime for pages that render Shiki. Speed comes from caching, not edge compute.

---

## File tree

```
repo-blog/
├── app/
│   ├── layout.tsx
│   ├── globals.css
│   ├── page.tsx
│   ├── not-found.tsx
│   └── [user]/
│       ├── page.tsx
│       ├── loading.tsx
│       ├── error.tsx
│       └── [repo]/
│           ├── page.tsx
│           ├── loading.tsx
│           ├── error.tsx
│           └── [slug]/
│               ├── page.tsx
│               ├── loading.tsx
│               └── error.tsx
├── components/
│   ├── Shell.tsx
│   ├── RepoCard.tsx
│   ├── RepoList.tsx
│   ├── PostList.tsx
│   ├── PostView.tsx
│   └── Toc.tsx
├── lib/
│   ├── github.ts
│   ├── config.ts
│   ├── markdown.ts
│   ├── themes.ts
│   ├── slug.ts
│   └── result.ts
├── types/
│   └── blog.ts
├── tailwind.config.ts
├── postcss.config.js
├── next.config.js
├── package.json
├── README.md
└── .env.example
```

---

## Implementation details per file

### `types/blog.ts`

Define types:
- `BlogConfig`
- `RepoSummary`
- `PostSummary`
- `TocItem`
- `RenderedPost`
- `Result<T>`

### `lib/result.ts`

Implement tiny Result helper:
- `ok(value)`
- `err(code, message, meta?)`

Codes:
- `NOT_FOUND`
- `GITHUB_RATE_LIMIT`
- `GITHUB_ERROR`
- `PARSE_ERROR`
- `UNKNOWN`

### `lib/slug.ts`

- `slugifyHeading(text): string`
- `humanizeSlug(slug): string` — replace `-`/`_` with spaces, Title Case

### `lib/themes.ts`

- `THEME_LIST` const
- `FONT_LIST` const
- `resolveTheme(input): themeName`
- `resolveFont(input): fontName`
- `mapThemeToShikiTheme(themeName): shikiThemeName` (optional)

### `lib/config.ts`

- `DEFAULT_CONFIG` constant
- `parseConfigYaml(text): Partial<BlogConfig>` with try/catch
- `validateConfig(partial): BlogConfig` with fallbacks + accent validation
- `getRepoConfig(user, repo)`: fetch `blog.config.yaml` via Contents API
  - If 404 → defaults
  - If exists → fetch `download_url` (raw YAML) → parse → validate

### `lib/github.ts`

Core:
- `const GITHUB_TOKEN = process.env.GITHUB_TOKEN`
- `githubRestFetch(url, { revalidate })`: fetch with headers:
  - `Accept: application/vnd.github+json`
  - `Authorization: token ...` (if present)
- `githubGraphQL(query, variables)`: POST to GraphQL endpoint
- `getBlogPosts(user, repo)`: list `/blog/*.md`
- `getPostContent(user, repo, slug)`: fetch raw markdown
- `getUserBlogRepos(user)`: GraphQL query for repos with `/blog`

### `lib/markdown.ts`

- `renderMarkdown(text, shikiTheme): Promise<RenderedPost>`
- Load highlighter once (module-level promise) keyed by theme name
- Return `RenderedPost`:
  - `title`: first H1 content if present, else `humanizeSlug(slug)`
  - `html`: rendered body
  - `toc`: collected headings

---

## Components

### `components/Shell.tsx`

Layout wrapper with header:
- Brand link to `/`
- Breadcrumbs when provided

### `components/RepoList.tsx` + `RepoCard.tsx`

Simple vertical list card UI. Each card links to `/[user]/[repo]`.

### `components/PostList.tsx`

List of posts for repo index:
- `title = humanizeSlug(slug)`
- Link to `/[user]/[repo]/[slug]`

### `components/PostView.tsx`

Props: `html` (string), `toc` (TocItem[]), `config` (BlogConfig)

Render:
- Main content with typography:
  ```tsx
  <article className="prose max-w-none ...">
    <div dangerouslySetInnerHTML={{ __html: html }} />
  </article>
  ```
- Optional TOC component on right on desktop

### `components/Toc.tsx`

Render list of anchors with indentation by level. Smooth scroll optional.

---

## Pages

### `app/layout.tsx`

- Apply theme + font data attrs (from route-level config fetch for post/repo pages)
- For landing page use defaults
- Include `globals.css`
- Set metadata defaults

### `app/page.tsx` (Landing + Docs)

Static content:
- "How to use"
- URL examples
- Config schema
- Theme list

### `app/[user]/page.tsx`

- Call `getUserBlogRepos(user)`
- If err token required: show message with instructions to set token
- Else render `RepoList`
- ISR: revalidate 3600

### `app/[user]/[repo]/page.tsx`

- Fetch config (so theme applies)
- Fetch blog index
- If `NOT_FOUND`: show "No `/blog` folder in this repo."
- Render `PostList`
- ISR: revalidate 300

### `app/[user]/[repo]/[slug]/page.tsx`

- Fetch config
- Fetch markdown
- Render via markdown renderer (with mapped shiki theme)
- Render `PostView`
- ISR: revalidate 300

---

## Styling (Tailwind + CSS vars)

### `app/globals.css`

- Tailwind base/components/utilities
- Define theme vars for each theme under `:root { ... }`
- Apply:
  ```css
  body { background: var(--bg); color: var(--fg); }
  ```
- Typography overrides:
  ```css
  .prose a { color: var(--link); }
  .prose code { background: var(--code-bg); }
  ```

### `tailwind.config.ts`

- Enable typography plugin
- Content paths for `app/`, `components/`

---

## Security headers (`next.config.js`)

Add headers:

- **Content-Security-Policy:**
  - `default-src 'self'`
  - `img-src 'self' https: data:`
  - `style-src 'self' 'unsafe-inline'` (Shiki may inline)
  - `script-src 'self'`
- **X-Content-Type-Options:** `nosniff`
- **Referrer-Policy:** `strict-origin-when-cross-origin`

---

## Env vars (`.env.example`)

```
GITHUB_TOKEN=  # recommended; required for /[user] repo discovery
```

---

## Acceptance checklist

- [ ] `/` loads and docs are readable
- [ ] `/[user]` works with token; without token shows friendly instruction
- [ ] `/[user]/[repo]` lists posts if `/blog` exists; otherwise friendly message
- [ ] `/[user]/[repo]/[slug]` renders markdown with highlighted code
- [ ] Missing config → default theme/font works
- [ ] Invalid YAML → defaults, still renders
- [ ] Markdown HTML injection attempts are displayed as text, not executed
- [ ] All pages revalidate on schedule; repeated visits don't spam GitHub

---

## Non-goals (explicitly not in v1)

- Custom CSS/themes
- Custom domains
- Search
- Comments
- Analytics
- Post dates from git history
- RSS
- Image proxying
