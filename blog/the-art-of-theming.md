---
title: The Art of Theming
date: 2025-11-26
description: 21 themes, 8 fonts, and the philosophy behind letting you choose.
---

# The Art of Theming

Let's talk about something most developers pretend not to care about: aesthetics.

We'll spend hours arguing about tabs vs spaces, but when it comes to how our blog *looks*? "Whatever, ship it."

I used to be the same way. Then I realized something.

---

## Your Theme Is Your Voice

When you read a blog, the theme isn't just decoration—it's tone. A stark black-and-white Solarized theme says something different than a warm Catppuccin Mocha.

Consider:

| Theme | Vibe |
|-------|------|
| `github-light` | "I write documentation at work" |
| `dracula` | "I'm a night owl who takes things seriously" |
| `rose-pine` | "I care about aesthetics and I'm not ashamed" |
| `gruvbox-dark` | "I've been using Vim since before you were born" |
| `tokyo-night` | "I watch anime and write TypeScript" |

I'm not judging. I use `rose-pine` myself.

---

## 21 Themes, Zero Config

plok.sh ships with 21 themes, and adding yours is a single line in `blog.config.yaml`:

```yaml
theme: catppuccin-mocha
```

That's it. No downloading theme packages. No copying CSS files. No "please run `npm install` and rebuild."

The themes are:

**Light themes:** `github-light`, `gruvbox-light`, `solarized-light`, `rose-pine-dawn`, `catppuccin-latte`

**Dark themes:** Everything else. Because we're developers.

---

## Fonts Matter Too

You've got 8 font options:

```yaml
font: jetbrains
```

The choices:

- `system` — Your OS's default. Fast, familiar.
- `inter` — The modern classic. Clean, professional.
- `manrope` — Geometric, friendly.
- `space-grotesk` — Techy, bold.
- `outfit` — Rounded, approachable.
- `jetbrains` — Monospace vibes for body text.
- `fira-code` — The ligature lover's choice.
- `geist-mono` — Vercel's monospace. Sharp.

I won't tell you which to use. But I will say: `geist-mono` with `rose-pine` hits different.

---

## Syntax Highlighting That Matches

Here's something that always bugged me about other blog platforms: you'd pick a dark theme, and your code blocks would render in some completely different color scheme.

plok.sh uses [Shiki](https://shiki.style/) and matches your code highlighting to your theme. If you're using `tokyo-night`, your code blocks are `tokyo-night`. No configuration needed.

```rust
fn main() {
    println!("This code block matches your theme.");
}
```

It's a small detail. But small details compound.

---

## Try Them All

Head to [plok.sh/themes](/themes) to see every combination live. Pick one. Change it later. It's just one line in a YAML file.

Your blog should look like *you*. Now it can.

---

*P.S. — If you want a theme we don't have, open a PR. The theme system is surprisingly simple.*
