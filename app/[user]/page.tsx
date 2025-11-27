import { Shell } from '@/components/Shell';
import { RepoList } from '@/components/RepoList';
import { getUserBlogRepos, hasGitHubToken } from '@/lib/github';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ user: string }>;
}

export const revalidate = 3600; // 1 hour

export async function generateMetadata({ params }: Props) {
  const { user } = await params;
  return {
    title: `${user}'s Blogs - RepoBlog`,
    description: `Browse ${user}'s repos with blogs`,
  };
}

export default async function UserPage({ params }: Props) {
  const { user } = await params;

  // Check if token is available
  if (!hasGitHubToken()) {
    return (
      <Shell breadcrumbs={[{ label: user }]}>
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-[var(--fg)] mb-4">
              Token Required
            </h1>
            <p className="text-[var(--muted)] mb-6 max-w-md mx-auto">
              Repo discovery requires a GitHub token to avoid rate limits.
              The server admin needs to set the <code className="bg-[var(--code-bg)] px-1 rounded">GITHUB_TOKEN</code> environment variable.
            </p>
            <p className="text-sm text-[var(--muted)]">
              Alternatively, you can navigate directly to a repo:
              <code className="bg-[var(--code-bg)] px-2 py-1 rounded ml-2">
                /{user}/repo-name
              </code>
            </p>
          </div>
        </div>
      </Shell>
    );
  }

  const result = await getUserBlogRepos(user);

  if (!result.ok) {
    if (result.error.code === 'NOT_FOUND') {
      notFound();
    }
    return (
      <Shell breadcrumbs={[{ label: user }]}>
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-[var(--fg)] mb-4">
              Error
            </h1>
            <p className="text-[var(--muted)]">{result.error.message}</p>
          </div>
        </div>
      </Shell>
    );
  }

  return (
    <Shell breadcrumbs={[{ label: user }]}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-[var(--fg)] mb-8">
          {user}&apos;s Blogs
        </h1>
        <RepoList repos={result.value} user={user} />
      </div>
    </Shell>
  );
}
