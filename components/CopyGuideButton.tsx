'use client';

import { useState } from 'react';

const GUIDE_MARKDOWN = `# plok.sh Setup Guide

## What you need
- A GitHub account (free) - https://github.com/signup
- A public repository
- 5 minutes

## Step 1: Create a blog folder

In any public GitHub repo, create a folder called \`blog\`

\`\`\`
your-repo/
├── blog/           ← create this folder
│   └── posts.md
├── README.md
└── ...
\`\`\`

**Don't have a repo?**
1. Go to https://github.com/new
2. Name it anything (e.g., \`my-blog\`)
3. Make sure it's **Public**
4. Check "Add a README file"
5. Click "Create repository"

## Step 2: Add your first post

Create a \`.md\` file inside the \`blog\` folder. The filename becomes the URL.

**File:** \`blog/hello-world.md\`

\`\`\`markdown
---
title: Hello World
date: 2025-01-15
description: My first blog post
---

# Welcome to my blog!

This is my **first post** using plok.sh.

## It supports all Markdown

- Lists
- **Bold** and *italic*
- [Links](https://example.com)
- Code blocks
- And more!
\`\`\`

**URL:** \`plok.sh/your-username/your-repo/hello-world\`

## Step 3: Frontmatter

The stuff between the \`---\` lines is called **frontmatter**. It's metadata about your post. Optional but recommended!

\`\`\`yaml
---
title: My Post Title
date: 2025-01-15
description: A short summary for previews
---
\`\`\`

| Field | Purpose |
|-------|---------|
| \`title\` | Shows in post list and browser tab |
| \`date\` | Used to sort posts (newest first). Format: YYYY-MM-DD |
| \`description\` | Shows as preview in post list |

## Step 4: Visit your blog

Your blog is live at: \`plok.sh/your-username/your-repo\`

## Step 5: Customize (optional)

Add a config file to change themes, fonts, and more.

**File:** \`blog/blog.config.yaml\`

\`\`\`yaml
# Blog metadata
title: "My Awesome Blog"
description: "Thoughts on code and life"

# Appearance
theme: "catppuccin-mocha"
font: "inter"

# Features
show_toc: true
show_repo_link: true

# Analytics (optional)
ga_id: "G-XXXXXXXXXX"
\`\`\`

### Config Options Explained

| Option | Description | Default |
|--------|-------------|---------|
| \`title\` | Your blog's name. Shows in header and browser tab | "Blog" |
| \`description\` | Short tagline. Shows below title | "" |
| \`theme\` | Color scheme (21 available) | "rose-pine" |
| \`font\` | Typography choice | "geist-mono" |
| \`show_toc\` | Show table of contents on posts | true |
| \`show_repo_link\` | Show "View on GitHub" link | true |
| \`ga_id\` | Google Analytics Measurement ID | null |

### Available Themes (21 total)
github-light, github-dark, one-dark, gruvbox-dark, gruvbox-light, solarized-dark, solarized-light, nord, dracula, tokyo-night, monokai, rose-pine, rose-pine-moon, rose-pine-dawn, vesper, everforest, catppuccin-latte, catppuccin-frappe, catppuccin-macchiato, catppuccin-mocha, ayu-dark

### Available Fonts (8 total)
system, inter, manrope, space-grotesk, outfit, jetbrains, fira-code, geist-mono

## Step 6: Google Analytics (optional)

Track your visitors with Google Analytics.

### How to get your GA ID:
1. Go to https://analytics.google.com
2. Create an account or sign in
3. Create a new property for your blog
4. Go to **Admin → Data Streams → Web**
5. Copy your **Measurement ID** (starts with \`G-\`)

Add to your config:
\`\`\`yaml
ga_id: "G-XXXXXXXXXX"
\`\`\`

Your analytics data stays in YOUR Google Analytics account. plok.sh doesn't see your visitor data.

## FAQs

**Can I use this for documentation?**
Absolutely! Just create a \`/blog\` folder in your project repo and add your docs as markdown files. Great for changelogs, tutorials, or project guides.

**Do I need to sign up?**
Nope! plok.sh reads directly from public GitHub repos. No account, no API keys, no setup.

**Can I use a private repo?**
Not yet. plok.sh only works with public repositories. Private repo support may come in the future.

**Can I use a custom domain?**
Not currently. Your blog lives at \`plok.sh/username/repo\`. Custom domains are on the roadmap.

**How do I delete my blog?**
Just delete the \`/blog\` folder from your repo, or make the repo private. There's nothing to "delete" on plok.sh — we don't store your content.

**Is there a post limit?**
No limits. Add as many markdown files as you want. Just keep them in the \`/blog\` folder.

**Can I organize posts in subfolders?**
Not yet. All posts should be directly in the \`/blog\` folder. Subfolder support is planned.

**Does it support images?**
Yes! Use standard markdown image syntax. Host images in your repo or use external URLs like \`![alt](https://...)\`

## Tips

- **Use descriptive filenames:** \`how-to-learn-rust.md\` is better than \`post1.md\`
- **Changes appear instantly:** Push to GitHub and your blog updates automatically (~30 seconds)
- **Multiple blogs:** Each repo with a \`/blog\` folder becomes a separate blog

---

Learn more at https://plok.sh/guide
`;

export function CopyGuideButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(GUIDE_MARKDOWN);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-2 px-3 py-1.5 text-sm border border-[var(--border)] rounded-lg text-[var(--muted)] hover:text-[var(--fg)] hover:border-[var(--accent)] transition-colors"
    >
      {copied ? (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="2" width="20" height="20" rx="3" />
            <path d="M6 16V8l3 4 3-4v8" strokeLinejoin="round" />
            <path d="M17 10v5m0 0l-2-2m2 2l2-2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Copy Markdown
        </>
      )}
    </button>
  );
}
