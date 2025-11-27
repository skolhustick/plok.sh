import { parse as parseYaml } from 'yaml';
import type { BlogConfig, Result } from '@/types/blog';
import { ok, err } from '@/lib/result';
import { resolveTheme, resolveFont, DEFAULT_THEME, DEFAULT_FONT } from '@/lib/themes';
import { githubFetch } from '@/lib/github';

export const DEFAULT_CONFIG: BlogConfig = {
  title: 'Blog',
  description: '',
  theme: DEFAULT_THEME,
  font: DEFAULT_FONT,
  accent: null,
  show_toc: true,
  show_repo_link: true,
};

/**
 * Validate hex color format (#RGB or #RRGGBB)
 */
function isValidHexColor(color: string): boolean {
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(color);
}

/**
 * Parse YAML config text into partial BlogConfig
 */
export function parseConfigYaml(text: string): Partial<BlogConfig> {
  try {
    const parsed = parseYaml(text);
    if (!parsed || typeof parsed !== 'object') {
      return {};
    }
    return parsed as Partial<BlogConfig>;
  } catch {
    return {};
  }
}

/**
 * Validate and merge partial config with defaults
 */
export function validateConfig(partial: Partial<BlogConfig>): BlogConfig {
  return {
    title: typeof partial.title === 'string' ? partial.title : DEFAULT_CONFIG.title,
    description:
      typeof partial.description === 'string'
        ? partial.description
        : DEFAULT_CONFIG.description,
    theme: resolveTheme(partial.theme),
    font: resolveFont(partial.font),
    accent:
      typeof partial.accent === 'string' && isValidHexColor(partial.accent)
        ? partial.accent
        : DEFAULT_CONFIG.accent,
    show_toc:
      typeof partial.show_toc === 'boolean'
        ? partial.show_toc
        : DEFAULT_CONFIG.show_toc,
    show_repo_link:
      typeof partial.show_repo_link === 'boolean'
        ? partial.show_repo_link
        : DEFAULT_CONFIG.show_repo_link,
  };
}

/**
 * Fetch and parse blog.config.yaml from a repo
 */
export async function getRepoConfig(
  user: string,
  repo: string
): Promise<Result<BlogConfig>> {
  const contentsUrl = `https://api.github.com/repos/${user}/${repo}/contents/blog/blog.config.yaml`;

  const contentsResult = await githubFetch<{ download_url: string }>(contentsUrl, {
    revalidate: 300,
  });

  // Config is optional - return defaults if not found
  if (!contentsResult.ok) {
    if (contentsResult.error.code === 'NOT_FOUND') {
      return ok(DEFAULT_CONFIG);
    }
    // For other errors, still return defaults but log
    console.warn('Failed to fetch config:', contentsResult.error);
    return ok(DEFAULT_CONFIG);
  }

  const downloadUrl = contentsResult.value.download_url;
  if (!downloadUrl) {
    return ok(DEFAULT_CONFIG);
  }

  // Fetch raw YAML content
  try {
    const response = await fetch(downloadUrl, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return ok(DEFAULT_CONFIG);
    }

    const yamlText = await response.text();
    const partial = parseConfigYaml(yamlText);
    const config = validateConfig(partial);

    return ok(config);
  } catch {
    return ok(DEFAULT_CONFIG);
  }
}
