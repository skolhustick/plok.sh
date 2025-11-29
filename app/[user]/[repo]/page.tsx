import { Shell } from '@/components/Shell';
import { PostList } from '@/components/PostList';
import { ConfigBadge } from '@/components/ConfigBadge';
import { getBlogPosts, getBlogPartial } from '@/lib/github';
import { getRepoConfig, DEFAULT_CONFIG } from '@/lib/config';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ user: string; repo: string }>;
}

export const revalidate = 300; // 5 minutes

export async function generateMetadata({ params }: Props) {
  const { user, repo } = await params;
  const configResult = await getRepoConfig(user, repo);
  const config = configResult.ok ? configResult.value.config : null;

  return {
    title: config?.title || `${repo} - plok.sh`,
    description: config?.description || `Blog posts from ${user}/${repo}`,
  };
}

export default async function RepoPage({ params }: Props) {
  const { user, repo } = await params;

  const [configResult, postsResult, headerContent, footerContent] = await Promise.all([
    getRepoConfig(user, repo),
    getBlogPosts(user, repo),
    getBlogPartial(user, repo, 'blog.header.md'),
    getBlogPartial(user, repo, 'blog.footer.md'),
  ]);

  const config = configResult.ok ? configResult.value.config : DEFAULT_CONFIG;
  const hasConfigFile = configResult.ok ? configResult.value.hasConfigFile : false;
  const hasHeader = !!headerContent;
  const hasFooter = !!footerContent;

  if (!postsResult.ok) {
    if (postsResult.error.code === 'NOT_FOUND') {
      return (
        <Shell
          breadcrumbs={[
            { label: user, href: `/${user}` },
            { label: repo },
          ]}
          customerGaId={config?.ga_id ?? undefined}
          noWrapper
        >
          <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold text-[var(--fg)] mb-4">
                No Blog Found
              </h1>
              <p className="text-[var(--muted)]">
                This repo doesn&apos;t have a <code className="bg-[var(--code-bg)] px-1 rounded">/blog</code> folder.
              </p>
            </div>
          </div>
        </Shell>
      );
    }
    return (
      <Shell
        breadcrumbs={[
          { label: user, href: `/${user}` },
          { label: repo },
        ]}
        customerGaId={config?.ga_id ?? undefined}
        noWrapper
      >
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-[var(--fg)] mb-4">Error</h1>
            <p className="text-[var(--muted)]">{postsResult.error.message}</p>
          </div>
        </div>
      </Shell>
    );
  }

  return (
    <Shell
      breadcrumbs={[
        { label: user, href: `/${user}` },
        { label: repo },
      ]}
      customerGaId={config?.ga_id ?? undefined}
      noWrapper
    >
      <div className="max-w-4xl mx-auto px-6 py-12">
        <header className="mb-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[var(--fg)]">
                {config?.title || repo}
              </h1>
              {config?.description && (
                <p className="mt-2 text-[var(--muted)]">{config.description}</p>
              )}
            </div>
            <ConfigBadge 
              config={config} 
              hasConfigFile={hasConfigFile} 
              hasHeader={hasHeader}
              hasFooter={hasFooter}
              user={user} 
              repo={repo} 
            />
          </div>
          {config?.show_repo_link && (
            <a
              href={`https://github.com/${user}/${repo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-sm text-[var(--link)] hover:text-[var(--link-hover)]"
            >
              View on GitHub →
            </a>
          )}
        </header>

        <PostList posts={postsResult.value} user={user} repo={repo} />
      </div>
    </Shell>
  );
}
