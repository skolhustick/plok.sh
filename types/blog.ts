// ============================================================================
// Core Types for plok.sh
// ============================================================================

export interface BlogConfig {
  title: string;
  description: string;
  theme: string;
  font: string;
  accent: string | null;
  show_toc: boolean;
  show_repo_link: boolean;
  ga_id: string | null;
}

export interface RepoSummary {
  name: string;
  description: string | null;
  url: string;
  blogTitle?: string;
  blogDescription?: string;
  blogTheme?: string;
  blogFont?: string;
  postCount?: number;
}

export interface PostSummary {
  slug: string;
  title: string;
  date?: string;
  description?: string;
}

export interface TocItem {
  level: number;
  text: string;
  id: string;
}

export interface RenderedPost {
  title: string;
  html: string;
  toc: TocItem[];
}

// ============================================================================
// Result Type (for fault-tolerant operations)
// ============================================================================

export type ErrorCode =
  | 'NOT_FOUND'
  | 'GITHUB_RATE_LIMIT'
  | 'GITHUB_ERROR'
  | 'PARSE_ERROR'
  | 'TOKEN_REQUIRED'
  | 'UNKNOWN';

export interface ResultOk<T> {
  ok: true;
  value: T;
}

export interface ResultErr {
  ok: false;
  error: {
    code: ErrorCode;
    message: string;
    meta?: Record<string, unknown>;
  };
}

export type Result<T> = ResultOk<T> | ResultErr;
