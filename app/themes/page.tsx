import { ThemeShowcase } from '@/components/ThemeShowcase';
import { renderMarkdown } from '@/lib/markdown';
import { DEFAULT_THEME } from '@/lib/themes';

export const metadata = {
  title: 'Themes - plok.sh',
  description: 'Pick your vibe with 14 beautiful themes for your plok.sh blog',
};

const SAMPLE_MARKDOWN = `
## Hello, beautiful ✨

This is how your blog will look. Pretty neat, right?

Here's some **bold** and *italic* text, plus \`inline code\` for good measure.

> "The best blog platform is the one you already have."

### Code looks great too

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}

greet('plok.sh');
\`\`\`

### Lists work perfectly

- Markdown support ✅
- Syntax highlighting ✅  
- 14 themes ✅
- Zero config needed ✅

That's it — you're ready to blog!
`;

export default async function ThemesPage() {
  const rendered = await renderMarkdown(SAMPLE_MARKDOWN, DEFAULT_THEME, 'theme-preview');

  return <ThemeShowcase initialHtml={rendered.html} />;
}
