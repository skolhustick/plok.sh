---
title: "Introducing Header & Footer Templates"
date: 2025-11-29
description: "Add consistent branding, author bios, and CTAs to every post with two simple markdown files."
---

# Introducing Header & Footer Templates

Ever wanted to add your author bio to every post? Or a "Subscribe to my newsletter" link at the bottom of each article? Now you can—with zero config.

## The Problem

When you're running a blog, you often want consistent elements across all your posts:

- Your name and social links
- A "Thanks for reading!" message
- Links to related posts or your newsletter
- Branding or navigation elements

Previously, you'd have to copy-paste these into every single post. Tedious, error-prone, and a nightmare to update.

## The Solution: Two Magic Files

Just add these files to your `/blog` folder:

```
blog/
├── blog.header.md  ← Shows above every post
├── blog.footer.md  ← Shows below every post
├── hello-world.md
└── your-other-posts.md
```

That's it. Whatever markdown you put in `blog.header.md` appears at the top of every post. Whatever's in `blog.footer.md` appears at the bottom.

## Example: Author Footer

Here's what I use for my footer:

```markdown
---

👋 **Thanks for reading!**

I'm building plok.sh in public. Follow along on [Twitter](https://twitter.com/you) or check out the [source on GitHub](https://github.com/skolhustick/plok.sh).

Found this useful? Share it with a friend!
```

This now appears on every single post, automatically.

## Example: Navigation Header

Want consistent navigation? Add a `blog.header.md`:

```markdown
[← Home](https://plok.sh/you/repo) · [About](/you/repo/about) · [Projects](/you/repo/projects)

---
```

## Key Features

**Zero config** — Just create the files. No config flags, no frontmatter required.

**Standard markdown** — Use any markdown features: links, images, code blocks, whatever you want.

**Graceful degradation** — Files are optional. Missing files? No problem. Empty files? Ignored. Broken markdown? We handle it gracefully and still render your post.

**Consistent styling** — Header and footer content inherits your blog's theme and font settings.

## What About Per-Post Overrides?

For v1, header and footer are repo-level. Every post in the same repo shares the same header/footer. This keeps things simple.

If you want a specific post to look different, you can always include custom content directly in that post's markdown.

## Get Started

1. Create `blog/blog.header.md` and/or `blog/blog.footer.md`
2. Add your content
3. Push to GitHub
4. Done! ✨

Your header/footer will appear on all posts within ~30 seconds.

## What's Next?

We're always looking for ways to make plok.sh more useful. Some ideas on the radar:

- Per-post override options
- Template variables (like `{{post.title}}` or `{{post.date}}`)
- RSS feed generation

Got ideas? [Open an issue](https://github.com/skolhustick/plok.sh/issues) or reach out on Twitter!

---

*Header & footer templates are available now for all plok.sh blogs. No update needed—just create the files and you're good to go.*
