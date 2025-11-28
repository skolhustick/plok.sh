import { Shell } from '@/components/Shell';
import { RepoList } from '@/components/RepoList';
import { getUserBlogRepos, hasGitHubToken } from '@/lib/github';
import { getRepoConfig } from '@/lib/config';
import { notFound } from 'next/navigation';
import type { RepoSummary } from '@/types/blog';
import { UserNotFound } from '@/components/UserNotFound';

interface Props {
  params: Promise<{ user: string }>;
}

export const revalidate = 3600; // 1 hour

export async function generateMetadata({ params }: Props) {
  const { user } = await params;
  return {
    title: `${user}'s Blogs - plok.sh`,
    description: `Browse ${user}'s repos with blogs`,
  };
}

export default async function UserPage({ params }: Props) {
  const { user } = await params;

  // Check if token is available
  if (!hasGitHubToken()) {
    return (
      <Shell breadcrumbs={[{ label: user }]} theme="rose-pine" font="geist-mono">
        <div className="max-w-4xl mx-auto px-6 py-12">
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
    // For other errors (like user not found from GitHub API), show a cute error with refresh
    return (
      <Shell breadcrumbs={[{ label: user }]} theme="rose-pine" font="geist-mono">
        <UserNotFound user={user} />
      </Shell>
    );
  }

  // Fetch blog configs for each repo to get titles/descriptions/themes
  const reposWithConfigs: RepoSummary[] = await Promise.all(
    result.value.map(async (repo) => {
      const configResult = await getRepoConfig(user, repo.name);
      if (configResult.ok) {
        return {
          ...repo,
          blogTitle: configResult.value.config.title,
          blogDescription: configResult.value.config.description,
          blogTheme: configResult.value.config.theme,
          blogFont: configResult.value.config.font,
        };
      }
      return repo;
    })
  );

  return (
    <Shell breadcrumbs={[{ label: user }]} theme="rose-pine" font="geist-mono">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex justify-center mb-10">
          <a 
            href={`https://github.com/${user}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--code-bg)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors group"
          >
            <svg className="w-5 h-5 text-[var(--muted)] group-hover:text-[var(--fg)] transition-colors" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span className="text-sm font-medium text-[var(--muted)] group-hover:text-[var(--fg)] transition-colors">
              @{user}
            </span>
          </a>
        </div>
        <RepoList repos={reposWithConfigs} user={user} />
      </div>
    </Shell>
  );
}
