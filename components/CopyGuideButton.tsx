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
title: "My Awesome Blog"
description: "Thoughts on code and life"
theme: "catppuccin-mocha"
font: "inter"
ga_id: "G-XXXXXXXXXX"
\`\`\`

### Available Themes (21 total)
github-light, github-dark, one-dark, gruvbox-dark, gruvbox-light, solarized-dark, solarized-light, nord, dracula, tokyo-night, monokai, rose-pine, rose-pine-moon, rose-pine-dawn, vesper, everforest, catppuccin-latte, catppuccin-frappe, catppuccin-macchiato, catppuccin-mocha, ayu-dark

### Available Fonts (8 total)
system, inter, manrope, space-grotesk, outfit, jetbrains, fira-code, geist-mono

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
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copy as Markdown
        </>
      )}
    </button>
  );
}
