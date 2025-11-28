---
title: GitHub Is Your Database
date: 2025-11-25
description: Why we don't have a backend, and why that's a feature.
---

# GitHub Is Your Database

Every blogging platform eventually becomes a database company. They store your posts, your images, your drafts, your analytics. And then one day they pivot, get acquired, or just... disappear.

Your content goes with them.

plok.sh takes a different approach: **we don't store anything**.

---

## The Architecture

When you visit `plok.sh/username/repo/post`, here's what happens:

```
1. We call GitHub's API
2. We fetch the markdown file
3. We render it
4. We serve it
```

That's it. No database. No cache layer (well, okay, there's edge caching). No user accounts. No servers storing your content.

Your content lives on GitHub. We just... show it.

---

## Why This Matters

### 1. Portability

Don't like plok.sh anymore? Cool. Your content is still in your GitHub repo. Point a different renderer at it. Build your own. Export to something else. The markdown is yours.

### 2. Version Control

Every edit is a git commit. Want to see what your post looked like 6 months ago? `git log`. Want to revert a change? `git revert`. Want to see who edited what? `git blame`.

You've got decades of tooling built for exactly this.

### 3. Backups

Your content is backed up every time someone clones or forks your repo. GitHub itself has redundancy. Your blog survives because git survives.

### 4. Collaboration

Someone wants to fix a typo in your post? They can open a PR. You can have editors, reviewers, a whole workflow—using tools you already know.

---

## The Tradeoffs

I won't pretend this approach is perfect. There are real tradeoffs:

**No comments** — We'd need a database for that. Use GitHub Discussions on your repo if you want interaction.

**No analytics** — We don't track users. Add your own Google Analytics ID in the config if you need numbers.

**Rate limits** — GitHub's API has rate limits. We cache aggressively, but if your blog goes *extremely* viral, you might hit them.

**Public only** — Your repo needs to be public. Private blogs aren't a thing (yet).

---

## The Philosophy

There's a reason Unix pipes work so well: each tool does one thing, and you compose them.

plok.sh does one thing: render your GitHub markdown as a blog.

GitHub does one thing: store and version your files.

Together, they're a blogging platform. Apart, they're still useful on their own.

That's the architecture I believe in. Small, composable, replaceable. No lock-in. No vendor dependency (except GitHub, I suppose, but if GitHub disappears we have bigger problems).

---

## Try It

```
1. Create a /blog folder
2. Add markdown files
3. Visit plok.sh/you/repo
```

Your content stays yours. We just make it pretty.

---

*This post is stored at `github.com/skolhustick/plok.sh/blog/github-is-your-database.md`. Feel free to check.* 🗃️
