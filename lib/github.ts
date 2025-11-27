import type { Result, RepoSummary, PostSummary } from '@/types/blog';
import { ok, err } from '@/lib/result';
import { humanizeSlug } from '@/lib/slug';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const FETCH_TIMEOUT = 8000; // 8 seconds

interface FetchOptions {
  revalidate?: number;
}

/**
 * Fetch from GitHub REST API with proper headers and error handling
 */
export async function githubFetch<T>(
  url: string,
  options: FetchOptions = {}
): Promise<Result<T>> {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
  };

  if (GITHUB_TOKEN) {
    headers.Authorization = `token ${GITHUB_TOKEN}`;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

    const response = await fetch(url, {
      headers,
      signal: controller.signal,
      next: options.revalidate ? { revalidate: options.revalidate } : undefined,
    });

    clearTimeout(timeoutId);

    if (response.status === 404) {
      return err('NOT_FOUND', 'Resource not found');
    }

    if (response.status === 403) {
      const remaining = response.headers.get('X-RateLimit-Remaining');
      if (remaining === '0') {
        return err('GITHUB_RATE_LIMIT', 'GitHub API rate limit exceeded');
      }
      return err('GITHUB_ERROR', 'Access forbidden');
    }

    if (!response.ok) {
      return err('GITHUB_ERROR', `GitHub API error: ${response.status}`);
    }

    const data = (await response.json()) as T;
    return ok(data);
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return err('GITHUB_ERROR', 'Request timed out');
    }
    return err('UNKNOWN', 'Failed to fetch from GitHub');
  }
}

/**
 * Fetch from GitHub GraphQL API
 */
export async function githubGraphQL<T>(
  query: string,
  variables: Record<string, unknown>
): Promise<Result<T>> {
  if (!GITHUB_TOKEN) {
    return err('TOKEN_REQUIRED', 'GitHub token is required for this operation');
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${GITHUB_TOKEN}`,
      },
      body: JSON.stringify({ query, variables }),
      signal: controller.signal,
      next: { revalidate: 3600 },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return err('GITHUB_ERROR', `GraphQL error: ${response.status}`);
    }

    const json = await response.json();

    if (json.errors) {
      return err('GITHUB_ERROR', json.errors[0]?.message || 'GraphQL error');
    }

    return ok(json.data as T);
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return err('GITHUB_ERROR', 'Request timed out');
    }
    return err('UNKNOWN', 'Failed to fetch from GitHub GraphQL');
  }
}

// ============================================================================
// GitHub Content Types
// ============================================================================

interface GitHubFile {
  name: string;
  type: 'file' | 'dir';
  download_url: string | null;
}

// ============================================================================
// Blog-specific GitHub Operations
// ============================================================================

/**
 * List blog posts from /blog directory
 */
export async function getBlogPosts(
  user: string,
  repo: string
): Promise<Result<PostSummary[]>> {
  const url = `https://api.github.com/repos/${user}/${repo}/contents/blog`;

  const result = await githubFetch<GitHubFile[]>(url, { revalidate: 300 });

  if (!result.ok) {
    return result;
  }

  const mdFiles = result.value
    .filter((file) => file.type === 'file' && file.name.endsWith('.md') && file.name !== 'blog.config.yaml');

  // Fetch content for each post to extract metadata
  const posts = await Promise.all(
    mdFiles.map(async (file) => {
      const slug = file.name.replace(/\.md$/, '');
      
      // Try to fetch the file content to extract title and metadata
      try {
        const contentResult = await githubFetch<{ download_url: string }>(file.url, { revalidate: 300 });
        if (contentResult.ok && contentResult.value.download_url) {
          const response = await fetch(contentResult.value.download_url, { next: { revalidate: 300 } });
          if (response.ok) {
            const content = await response.text();
            return extractPostMetadata(slug, content);
          }
        }
      } catch {
        // Fall back to slug-based title
      }
      
      return {
        slug,
        title: humanizeSlug(slug),
      };
    })
  );

  // Sort by date (newest first) or alphabetically if no date
  posts.sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    if (a.date) return -1;
    if (b.date) return 1;
    return a.slug.localeCompare(b.slug);
  });

  return ok(posts);
}

/**
 * Extract title, date, and description from post content
 */
function extractPostMetadata(slug: string, content: string): PostSummary {
  let title = humanizeSlug(slug);
  let date: string | undefined;
  let description: string | undefined;

  // Check for YAML frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[1];
    
    const titleMatch = frontmatter.match(/^title:\s*["']?(.+?)["']?$/m);
    if (titleMatch) title = titleMatch[1];
    
    const dateMatch = frontmatter.match(/^date:\s*["']?(.+?)["']?$/m);
    if (dateMatch) date = dateMatch[1];
    
    const descMatch = frontmatter.match(/^description:\s*["']?(.+?)["']?$/m);
    if (descMatch) description = descMatch[1];
  }

  // If no title from frontmatter, try first H1
  if (title === humanizeSlug(slug)) {
    const h1Match = content.match(/^#\s+(.+)$/m);
    if (h1Match) title = h1Match[1];
  }

  return { slug, title, date, description };
}

/**
 * Fetch raw markdown content for a post
 */
export async function getPostContent(
  user: string,
  repo: string,
  slug: string
): Promise<Result<string>> {
  const url = `https://api.github.com/repos/${user}/${repo}/contents/blog/${slug}.md`;

  const result = await githubFetch<{ download_url: string }>(url, { revalidate: 300 });

  if (!result.ok) {
    return result;
  }

  const downloadUrl = result.value.download_url;
  if (!downloadUrl) {
    return err('NOT_FOUND', 'Download URL not available');
  }

  try {
    const response = await fetch(downloadUrl, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return err('GITHUB_ERROR', `Failed to fetch content: ${response.status}`);
    }

    const content = await response.text();
    return ok(content);
  } catch {
    return err('UNKNOWN', 'Failed to fetch post content');
  }
}

/**
 * Get user's repos that have a /blog folder (requires token)
 */
export async function getUserBlogRepos(
  user: string
): Promise<Result<RepoSummary[]>> {
  const query = `
    query($login: String!, $first: Int!, $after: String) {
      user(login: $login) {
        repositories(first: $first, after: $after, privacy: PUBLIC, orderBy: {field: UPDATED_AT, direction: DESC}) {
          pageInfo { hasNextPage endCursor }
          nodes {
            name
            description
            url
            object(expression: "HEAD:blog") { __typename }
          }
        }
      }
    }
  `;

  interface RepoNode {
    name: string;
    description: string | null;
    url: string;
    object: { __typename: string } | null;
  }

  interface QueryResult {
    user: {
      repositories: {
        pageInfo: { hasNextPage: boolean; endCursor: string | null };
        nodes: RepoNode[];
      };
    } | null;
  }

  const result = await githubGraphQL<QueryResult>(query, {
    login: user,
    first: 100,
    after: null,
  });

  if (!result.ok) {
    return result;
  }

  if (!result.value.user) {
    return err('NOT_FOUND', 'User not found');
  }

  const repos = result.value.user.repositories.nodes
    .filter((repo) => repo.object?.__typename === 'Tree')
    .map((repo) => ({
      name: repo.name,
      description: repo.description,
      url: repo.url,
    }));

  return ok(repos);
}

/**
 * Check if token is configured
 */
export function hasGitHubToken(): boolean {
  return !!GITHUB_TOKEN;
}
