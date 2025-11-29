import { parse as parseYaml } from 'yaml';
import { githubFetch } from '@/lib/github';

export interface LinkItem {
  label: string;
  url: string;
}

export interface LinksConfig {
  title?: string;
  description?: string;
  links: LinkItem[];
}

const EMPTY_LINKS: LinksConfig = {
  links: [],
};

/**
 * Validate URL is http or https
 */
function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Parse YAML text into LinksConfig with fault tolerance
 */
export function parseLinksYaml(text: string): LinksConfig {
  try {
    const parsed = parseYaml(text);
    if (!parsed || typeof parsed !== 'object') {
      return EMPTY_LINKS;
    }

    const result: LinksConfig = {
      links: [],
    };

    // Extract title
    if (typeof parsed.title === 'string' && parsed.title.trim()) {
      result.title = parsed.title.trim();
    }

    // Extract description
    if (typeof parsed.description === 'string' && parsed.description.trim()) {
      result.description = parsed.description.trim();
    }

    // Extract and validate links
    if (Array.isArray(parsed.links)) {
      for (const item of parsed.links) {
        if (!item || typeof item !== 'object') continue;
        
        const label = typeof item.label === 'string' ? item.label.trim() : '';
        const url = typeof item.url === 'string' ? item.url.trim() : '';
        
        // Skip items with missing label or invalid URL
        if (!label || !isValidUrl(url)) continue;
        
        result.links.push({ label, url });
      }
    }

    return result;
  } catch {
    return EMPTY_LINKS;
  }
}

/**
 * Fetch and parse links.yaml from a repo
 * Returns empty config on any error (never throws)
 */
export async function getLinksConfig(
  user: string,
  repo: string
): Promise<LinksConfig> {
  const contentsUrl = `https://api.github.com/repos/${user}/${repo}/contents/blog/links.yaml`;
  
  const contentsResult = await githubFetch<{ download_url: string }>(contentsUrl, { revalidate: 300 });
  
  if (!contentsResult.ok) {
    return EMPTY_LINKS;
  }
  
  const downloadUrl = contentsResult.value.download_url;
  if (!downloadUrl) {
    return EMPTY_LINKS;
  }
  
  try {
    const response = await fetch(downloadUrl, {
      next: { revalidate: 300 },
    });
    
    if (!response.ok) {
      return EMPTY_LINKS;
    }
    
    const yamlText = await response.text();
    
    if (!yamlText.trim()) {
      return EMPTY_LINKS;
    }
    
    return parseLinksYaml(yamlText);
  } catch (error) {
    console.error(`Failed to fetch links.yaml for ${user}/${repo}:`, error);
    return EMPTY_LINKS;
  }
}

/**
 * Check if links.yaml exists (lightweight check)
 */
export async function hasLinksFile(
  user: string,
  repo: string
): Promise<boolean> {
  const contentsUrl = `https://api.github.com/repos/${user}/${repo}/contents/blog/links.yaml`;
  const result = await githubFetch<{ download_url: string }>(contentsUrl, { revalidate: 300 });
  return result.ok;
}
