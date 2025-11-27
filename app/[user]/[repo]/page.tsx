import { Shell } from '@/components/Shell';
import { PostList } from '@/components/PostList';
import { getBlogPosts } from '@/lib/github';
import { getRepoConfig } from '@/lib/config';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ user: string; repo: string }>;
}

export const revalidate = 300; // 5 minutes

export async function generateMetadata({ params }: Props) {
  const { user, repo } = await params;
  const configResult = await getRepoConfig(user, repo);
  const config = configResult.ok ? configResult.value : null;

  return {
    title: config?.title || `${repo} - plok.sh`,
    description: config?.description || `Blog posts from ${user}/${repo}`,
  };
}

export default async function RepoPage({ params }: Props) {
  const { user, repo } = await params;

  const [configResult, postsResult] = await Promise.all([
    getRepoConfig(user, repo),
    getBlogPosts(user, repo),
  ]);

  const config = configResult.ok ? configResult.value : null;

  if (!postsResult.ok) {
    if (postsResult.error.code === 'NOT_FOUND') {
      return (
        <Shell
          breadcrumbs={[
            { label: user, href: `/${user}` },
            { label: repo },
          ]}
          theme={config?.theme}
          font={config?.font}
        >
          <div className="max-w-4xl mx-auto px-4 py-12">
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
        theme={config?.theme}
        font={config?.font}
      >
        <div className="max-w-4xl mx-auto px-4 py-12">
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
      theme={config?.theme}
      font={config?.font}
    >
      <div className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--fg)]">
            {config?.title || repo}
          </h1>
          {config?.description && (
            <p className="mt-2 text-[var(--muted)]">{config.description}</p>
          )}
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
