---
title: Advanced Patterns
date: 2025-11-24
description: Subfolders, frontmatter tricks, and power-user workflows.
---

# Advanced Patterns

You've got the basics down: `/blog` folder, markdown files, done. But plok.sh has a few more tricks up its sleeve.

Let me show you what's possible.

---

## Subfolders for Organization

Your blog doesn't have to be flat. Nest to your heart's content:

```
blog/
├── blog.config.yaml
├── welcome.md
├── rust/
│   ├── ownership-explained.md
│   └── async-deep-dive.md
├── devops/
│   ├── docker-tips.md
│   └── kubernetes-basics.md
└── personal/
    └── why-i-code.md
```

The URLs follow the structure:

- `plok.sh/you/repo/welcome`
- `plok.sh/you/repo/rust/ownership-explained`
- `plok.sh/you/repo/devops/docker-tips`

Organize however makes sense to you.

---

## Frontmatter

Every post can have optional frontmatter:

```yaml
---
title: My Custom Title
date: 2025-11-24
description: This shows in previews and metadata
---
```

### What Each Field Does

| Field | Purpose |
|-------|---------|
| `title` | Overrides the filename for display |
| `date` | Shows in the post header, affects nothing else |
| `description` | Used for meta tags and social previews |

All fields are optional. No frontmatter? We'll use the filename as the title.

---

## The Config File

`blog/blog.config.yaml` controls your entire blog:

```yaml
title: "My Rust Blog"
description: "Thoughts on systems programming"
theme: tokyo-night
font: jetbrains
show_toc: true
show_repo_link: true
ga_id: G-XXXXXXXXXX
```

### Options Explained

**`title`** — Your blog's name. Shows in the header and browser tab.

**`description`** — Meta description for SEO and social sharing.

**`theme`** — Pick from 21 themes. See [/themes](/themes) for the full list.

**`font`** — One of: `system`, `inter`, `manrope`, `space-grotesk`, `outfit`, `jetbrains`, `fira-code`, `geist-mono`.

**`show_toc`** — `true` to show table of contents on posts (default: `true`).

**`show_repo_link`** — `true` to show a link back to your GitHub repo.

**`ga_id`** — Optional Google Analytics measurement ID.

---

## Multiple Blogs Per User

Nothing stops you from having multiple blogs:

- `plok.sh/you/tech-blog` — Your programming posts
- `plok.sh/you/travel-notes` — Your travel writing  
- `plok.sh/you/recipes` — Your cooking experiments

Each repo is independent. Different themes, different configs, different vibes.

---

## Workflow Tips

### Write Locally, Push to Publish

```bash
# Write your post
vim blog/new-post.md

# Preview locally (if you've cloned plok.sh)
pnpm dev

# Or just push and check the live site
git add . && git commit -m "new post" && git push
```

### Edit on GitHub Directly

For quick fixes, just edit on GitHub's web interface. Click the pencil icon, make your change, commit. The site updates within minutes (GitHub's cache).

### Use GitHub Mobile

The GitHub mobile app lets you edit files too. Write posts from your phone. I've done it. It's not *comfortable*, but it works.

---

## Power User: Custom Domain

Want `blog.yourdomain.com` instead of `plok.sh/you/repo`?

Self-host plok.sh (it's open source) and point your domain at it. The code is at [github.com/skolhustick/plok.sh](https://github.com/skolhustick/plok.sh).

Or just use the free hosted version. We don't mind.

---

## What We Don't Support (Yet)

Being honest about limitations:

- **Private repos** — Not yet. Would need auth.
- **Images from repo** — Use external image hosts for now, or reference images from your repo's raw URL.
- **Custom CSS** — Themes only. No arbitrary styles.
- **JavaScript in posts** — Security reasons. Markdown only.
- **RSS feeds** — Coming eventually. PRs welcome.

---

## Go Build Something

You've got the tools. A `/blog` folder, some markdown, and 5 minutes.

What are you going to write about?

---

*This post took 20 minutes to write. Shipping it took 3 seconds.* ⚡
