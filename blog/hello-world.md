# plok.sh

Welcome to **plok.sh** — the simplest way to turn your GitHub repo into a blog.

No database. No auth. No dashboard. Just markdown files in a `/blog` folder.

---

## How It Works

1. Create a `/blog` folder in your repo
2. Add `.md` files
3. Visit `plok.sh/your-username/your-repo`

That's it. Your blog is live.

---

## Why plok.sh?

We believe in **GitHub as the database**. Your content lives where your code lives. Version controlled. Portable. Yours.

> "The best blog platform is the one you already have."

---

## Styling Test

Let's make sure everything renders beautifully.

### Text Formatting

This is **bold text** and this is *italic text*. You can also do ~~strikethrough~~ and `inline code`.

Here's a [link to GitHub](https://github.com) to test link styling.

### Lists

Unordered list:
- First item
- Second item
  - Nested item
  - Another nested item
- Third item

Ordered list:
1. Step one
2. Step two
3. Step three

### Blockquotes

> This is a blockquote. It should stand out from the rest of the content and look thoughtfully styled.
>
> — Someone wise, probably

### Code Blocks

Inline code looks like `const blog = "awesome"`.

Here's a JavaScript example:

```javascript
// Fetch your blog posts
async function getBlogPosts(user, repo) {
  const response = await fetch(
    `https://api.github.com/repos/${user}/${repo}/contents/blog`
  );
  const files = await response.json();
  return files.filter(f => f.name.endsWith('.md'));
}
```

Python works too:

```python
def hello_plok():
    """A simple greeting."""
    themes = ['github-light', 'github-dark', 'gruvbox-dark', 'nord', 'dracula']
    for theme in themes:
        print(f"Looking good in {theme}!")

if __name__ == "__main__":
    hello_plok()
```

And some TypeScript for good measure:

```typescript
interface BlogConfig {
  title: string;
  description?: string;
  theme: 'github-light' | 'github-dark' | 'gruvbox-dark' | 'nord';
  font: 'system' | 'inter' | 'jetbrains';
  show_toc: boolean;
}

const defaultConfig: BlogConfig = {
  title: "My Blog",
  theme: "github-dark",
  font: "system",
  show_toc: true,
};
```

### Tables

| Feature | plok.sh | Traditional CMS |
|---------|---------|-----------------|
| Setup time | 0 minutes | Hours |
| Database | None (GitHub) | Required |
| Auth system | None needed | Complex |
| Version control | Built-in | Add-on |
| Cost | Free | $$$$ |

### Headings Reference

We've got `h1` at the top, and here are the rest:

## Heading 2
### Heading 3
#### Heading 4

---

## Get Started

Ready to try it? Just:

1. Create a `blog/` folder in any public GitHub repo
2. Add a markdown file like `hello-world.md`
3. Visit `plok.sh/yourusername/yourrepo/hello-world`

Happy blogging! 🚀
