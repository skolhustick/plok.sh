# plok.sh

**GitHub to blog, instantly.** Turn any GitHub repo's `/blog` folder into a beautiful, themed blog—no signup, no config, no deploy.

🌐 **Live:** [plok.sh](https://plok.sh)

---

## ✨ Features

- **Zero setup** — No accounts, no databases, no deployment. Just push markdown to GitHub.
- **Instant publishing** — Your posts go live at `plok.sh/username/repo/post-slug`
- **21 themes** — From GitHub Light to Catppuccin, Rose Pine, Dracula, Nord, and more
- **8 fonts** — System, Inter, Manrope, Space Grotesk, Outfit, JetBrains Mono, Fira Code, Geist Mono
- **Syntax highlighting** — Powered by Shiki with theme-matched code blocks
- **Table of contents** — Auto-generated from your headings
- **Frontmatter support** — Optional title, date, and description
- **Mobile-friendly** — Responsive design that works everywhere
- **Fast** — Edge-cached responses, no client-side JavaScript bloat

---

## 🚀 Quick Start

### 1. Create a `/blog` folder in any public GitHub repo

```
your-repo/
├── blog/
│   ├── hello-world.md
│   └── another-post.md
└── README.md
```

### 2. Write markdown posts

```markdown
---
title: Hello World
date: 2025-01-15
description: My first post
---

# Hello World

Your content here...
```

### 3. Visit your blog

```
https://plok.sh/your-username/your-repo
```

That's it! No build step, no deploy, no waiting.

---

## ⚙️ Configuration

Create `blog/blog.config.yaml` to customize your blog:

```yaml
title: My Awesome Blog
description: Thoughts on code and life
theme: tokyo-night
font: jetbrains
show_toc: true
show_repo_link: true
ga_id: G-XXXXXXXXXX  # Optional Google Analytics
```

### Available Themes

| Theme | Variants |
|-------|----------|
| GitHub | `github-light`, `github-dark` |
| Rose Pine | `rose-pine`, `rose-pine-moon`, `rose-pine-dawn` |
| Catppuccin | `catppuccin-latte`, `catppuccin-frappe`, `catppuccin-macchiato`, `catppuccin-mocha` |
| Gruvbox | `gruvbox-light`, `gruvbox-dark` |
| Solarized | `solarized-light`, `solarized-dark` |
| Others | `one-dark`, `nord`, `dracula`, `tokyo-night`, `monokai`, `vesper`, `everforest`, `ayu-dark` |

### Available Fonts

`system`, `inter`, `manrope`, `space-grotesk`, `outfit`, `jetbrains`, `fira-code`, `geist-mono`

---

## 📁 URL Structure

| URL | What it shows |
|-----|---------------|
| `plok.sh/username` | All repos with a `/blog` folder |
| `plok.sh/username/repo` | All posts in that repo's blog |
| `plok.sh/username/repo/post-slug` | Individual post |
| `plok.sh/username/repo/folder/post` | Nested posts supported |

---

## 🛠️ Self-Hosting

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- GitHub Personal Access Token (for API rate limits)

### Setup

```bash
# Clone the repo
git clone https://github.com/skolhustick/plok.sh.git
cd plok.sh

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your GITHUB_TOKEN

# Run development server
pnpm dev
```

### Environment Variables

```env
GITHUB_TOKEN=ghp_xxxxxxxxxxxx  # Required for API access
```

### Deploy

Deploy to any platform that supports Next.js:

- **Vercel** (recommended) — Zero config deployment
- **Netlify** — Works with Next.js adapter
- **Docker** — `pnpm build && pnpm start`

---

## 🏗️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4
- **Markdown:** markdown-it + Shiki
- **Deployment:** Edge-optimized

---

## 📝 License

MIT — use it however you want.

---

## 🤝 Contributing

PRs welcome! Feel free to:

- Add new themes
- Improve mobile experience
- Fix bugs
- Suggest features

---

<p align="center">
  <strong>plok.sh</strong> — Because blogging should be as easy as pushing to GitHub.
</p>

