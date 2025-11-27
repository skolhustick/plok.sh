import { ThemePreviewClient } from '@/components/ThemePreviewClient';
import { renderMarkdown } from '@/lib/markdown';
import { DEFAULT_THEME } from '@/lib/themes';

export const metadata = {
  title: 'Themes - plok.sh',
  description: 'Preview themes and build your blog config for plok.sh',
};

const SAMPLE_MARKDOWN = `
Welcome to the theme preview. This page demonstrates how your blog will look with different configurations applied.

---

## Typography

This is a paragraph with **bold text**, *italic text*, and \`inline code\`. You can also use ~~strikethrough~~ for deleted content.

Here's a [sample link](#) to test link styling, and here's another [hover over me](#) to see the hover state.

### Blockquotes

> "The best way to predict the future is to invent it."
>
> — Alan Kay

### Lists

Unordered list:
- First item with some content
- Second item
  - Nested item
  - Another nested one
- Third item

Ordered list:
1. First step
2. Second step
3. Third step

---

## Code Blocks

Inline code: \`const theme = "awesome"\`

JavaScript example:

\`\`\`javascript
// A simple greeting function
function greet(name) {
  const message = \`Hello, \${name}!\`;
  console.log(message);
  return message;
}

greet('plok.sh');
\`\`\`

TypeScript with types:

\`\`\`typescript
interface BlogConfig {
  title: string;
  theme: 'github-dark' | 'rose-pine' | 'nord';
  font: 'system' | 'inter' | 'geist-mono';
}

const config: BlogConfig = {
  title: "My Blog",
  theme: "rose-pine",
  font: "geist-mono",
};
\`\`\`

---

## Tables

| Feature | Status | Notes |
|---------|--------|-------|
| Markdown | ✅ | Full support |
| Syntax highlighting | ✅ | Via Shiki |
| Custom themes | ✅ | 14 themes |
| Dark mode | ✅ | Multiple options |

---

## Headings

### Heading 3
#### Heading 4

---

Place the generated config in your repo at \`/blog/blog.config.yaml\` and you're ready to go!
`;

export default async function ThemesPage() {
  // Pre-render markdown on server with default theme
  const rendered = await renderMarkdown(SAMPLE_MARKDOWN, DEFAULT_THEME, 'theme-preview');

  return (
    <ThemePreviewClient
      initialTheme={DEFAULT_THEME}
      initialHtml={rendered.html}
      initialToc={rendered.toc}
    />
  );
}
