import { Shell } from '@/components/Shell';
import { PostView } from '@/components/PostView';
import { getPostContent, getBlogPartial } from '@/lib/github';
import { getRepoConfig } from '@/lib/config';
import { renderMarkdown, renderPartialMarkdown } from '@/lib/markdown';
import { DEFAULT_CONFIG } from '@/lib/config';
import { resolveTheme } from '@/lib/themes';
import { notFound } from 'next/navigation';
import { humanizeSlug } from '@/lib/slug';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ user: string; repo: string; slug: string[] }>;
}

export const revalidate = 300; // 5 minutes

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { user, repo, slug } = await params;
  const slugPath = slug.join('/');
  const displayName = humanizeSlug(slug[slug.length - 1]);
  
  const ogImageUrl = `https://plok.sh/api/og?user=${encodeURIComponent(user)}&repo=${encodeURIComponent(repo)}&slug=${encodeURIComponent(slugPath)}`;
  
  return {
    title: `${displayName} - ${repo} - plok.sh`,
    openGraph: {
      title: `${displayName} - ${repo}`,
      siteName: 'plok.sh',
      type: 'article',
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${displayName} - ${repo}`,
      images: [ogImageUrl],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { user, repo, slug } = await params;
  const slugPath = slug.join('/');

  // Fetch config, content, and partials in parallel
  const [configResult, contentResult, headerContent, footerContent] = await Promise.all([
    getRepoConfig(user, repo),
    getPostContent(user, repo, slugPath),
    getBlogPartial(user, repo, 'blog.header.md'),
    getBlogPartial(user, repo, 'blog.footer.md'),
  ]);

  const config = configResult.ok ? configResult.value.config : DEFAULT_CONFIG;
  const theme = resolveTheme(config.theme);

  if (!contentResult.ok) {
    if (contentResult.error.code === 'NOT_FOUND') {
      notFound();
    }

    // Render error state with raw content fallback
    return (
      <Shell
        breadcrumbs={[
          { label: user, href: `/${user}` },
          { label: repo, href: `/${user}/${repo}` },
          { label: slug[slug.length - 1] },
        ]}
        noWrapper
      >
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded mb-8">
            <h2 className="text-red-500 font-semibold mb-2">Error loading post</h2>
            <p className="text-[var(--muted)]">{contentResult.error.message}</p>
          </div>
        </div>
      </Shell>
    );
  }

  // Render markdown
  let rendered;
  try {
    rendered = await renderMarkdown(
      contentResult.value,
      theme,
      slugPath
    );
  } catch (error) {
    // Fallback: show escaped raw content
    const escaped = contentResult.value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    return (
      <Shell
        breadcrumbs={[
          { label: user, href: `/${user}` },
          { label: repo, href: `/${user}/${repo}` },
          { label: slug[slug.length - 1] },
        ]}
        customerGaId={config.ga_id ?? undefined}
        noWrapper
      >
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded mb-8">
            <h2 className="text-yellow-500 font-semibold mb-2">
              Markdown parsing failed
            </h2>
            <p className="text-[var(--muted)]">Showing raw content below.</p>
          </div>
          <pre className="p-4 bg-[var(--code-bg)] rounded overflow-x-auto text-sm whitespace-pre-wrap">
            {escaped}
          </pre>
        </div>
      </Shell>
    );
  }

  // Render header/footer partials (non-blocking - failures return null)
  const [headerHtml, footerHtml] = await Promise.all([
    headerContent ? renderPartialMarkdown(headerContent, theme) : null,
    footerContent ? renderPartialMarkdown(footerContent, theme) : null,
  ]);

  return (
    <Shell
      breadcrumbs={[
        { label: user, href: `/${user}` },
        { label: repo, href: `/${user}/${repo}` },
        { label: slug[slug.length - 1] },
      ]}
      customerGaId={config.ga_id ?? undefined}
      noWrapper
    >
      <div className="max-w-4xl mx-auto px-6 py-12">
        <PostView
          html={rendered.html}
          toc={rendered.toc}
          config={config}
          title={rendered.title}
          date={rendered.date}
          description={rendered.description}
          hasFrontmatter={rendered.hasFrontmatter}
          user={user}
          repo={repo}
          slug={slugPath}
          headerHtml={headerHtml ?? undefined}
          footerHtml={footerHtml ?? undefined}
        />
      </div>
    </Shell>
  );
}
