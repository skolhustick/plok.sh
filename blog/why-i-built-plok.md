---
title: Why I Built plok.sh
date: 2025-11-27
description: The story of scratching my own itch and accidentally building something useful.
---

# Why I Built plok.sh

I've been writing software for over a decade. Mostly Rust these days—systems stuff, CLI tools, the occasional web backend when I can't avoid it.

And like most engineers, I've started approximately 47 blogs. WordPress, Ghost, Jekyll, Hugo, Gatsby, Astro, hand-rolled static site generators... you name it, I've abandoned it.

The pattern was always the same:

1. Get excited about a new blog platform
2. Spend 3 hours tweaking config files
3. Write one post
4. Never touch it again
5. Repeat in 6 months

---

## The Problem

Every blog platform wants to be *your* platform. They want you to learn their templating language, their folder structure, their deployment pipeline. They want you to care about things you don't care about.

I just want to write markdown and have it show up somewhere.

That's it. That's the whole requirement.

---

## The Epiphany

One day I was documenting a Rust project. I had a `/docs` folder with markdown files, and GitHub was rendering them beautifully. I thought:

> "Why can't my blog be this simple?"

And then:

> "Wait. Why *can't* it?"

Your GitHub repo already has:
- Version control
- A web interface
- Markdown rendering
- Public URLs
- Authentication (for editing)

The only thing missing is... a nice frontend.

---

## Enter plok.sh

So I built it. A thin layer over GitHub that:

1. Reads your `/blog` folder
2. Renders markdown with proper syntax highlighting
3. Applies a theme
4. Serves it at a clean URL

No database. No auth system. No deployment pipeline. Your GitHub repo *is* the backend.

```
Push to GitHub → Live on plok.sh
```

The feedback loop is instant. Edit a file on GitHub's web interface, refresh, done.

---

## What I Learned

Building plok.sh taught me something I should've known already: **the best tool is the one you'll actually use**.

I don't need custom shortcodes. I don't need a comment system. I don't need analytics dashboards. I need a place to write markdown that doesn't make me feel like I'm configuring Kubernetes.

If you're like me—a developer who wants to write occasionally without ceremony—give plok.sh a try.

Create a `/blog` folder. Add a markdown file. Visit the URL.

That's it. That's the whole thing.

---

*Now if you'll excuse me, I have some Rust to write.* 🦀
