'use client';

import Link from 'next/link';
import type { LinkItem } from '@/lib/links';
import {
  Github,
  Twitter,
  Youtube,
  Instagram,
  Linkedin,
  Facebook,
  Twitch,
  Music2,
  ShoppingBag,
  Mail,
  Globe,
  MessageCircle,
  Send,
  Coffee,
  DollarSign,
  FileText,
  Podcast,
  Video,
  BookOpen,
  Newspaper,
  Rss,
  Zap,
  Link as LinkIcon,
  type LucideIcon,
} from 'lucide-react';

interface LinksPageProps {
  title?: string;
  description?: string;
  links: LinkItem[];
  user: string;
  repo: string;
}

// Domain to icon mapping
const DOMAIN_ICONS: Record<string, LucideIcon> = {
  // plok.sh
  'plok.sh': Zap,
  
  // Social
  'github.com': Github,
  'twitter.com': Twitter,
  'x.com': Twitter,
  'youtube.com': Youtube,
  'youtu.be': Youtube,
  'instagram.com': Instagram,
  'linkedin.com': Linkedin,
  'facebook.com': Facebook,
  'fb.com': Facebook,
  'twitch.tv': Twitch,
  'tiktok.com': Music2,
  'threads.net': MessageCircle,
  'mastodon.social': MessageCircle,
  'bsky.app': MessageCircle,
  'discord.com': MessageCircle,
  'discord.gg': MessageCircle,
  'reddit.com': MessageCircle,
  
  // Messaging
  'telegram.org': Send,
  't.me': Send,
  'wa.me': MessageCircle,
  'whatsapp.com': MessageCircle,
  
  // Music
  'spotify.com': Music2,
  'open.spotify.com': Music2,
  'soundcloud.com': Music2,
  'music.apple.com': Music2,
  'bandcamp.com': Music2,
  
  // Video
  'vimeo.com': Video,
  'dailymotion.com': Video,
  
  // Podcast
  'podcasts.apple.com': Podcast,
  'anchor.fm': Podcast,
  'pocketcasts.com': Podcast,
  
  // Shopping/Commerce
  'amazon.com': ShoppingBag,
  'etsy.com': ShoppingBag,
  'gumroad.com': ShoppingBag,
  'shopify.com': ShoppingBag,
  'patreon.com': DollarSign,
  'ko-fi.com': Coffee,
  'buymeacoffee.com': Coffee,
  'paypal.com': DollarSign,
  'paypal.me': DollarSign,
  'venmo.com': DollarSign,
  'cash.app': DollarSign,
  
  // Dev/Tech
  'codepen.io': FileText,
  'codesandbox.io': FileText,
  'replit.com': FileText,
  'gitlab.com': Github,
  'bitbucket.org': Github,
  'stackoverflow.com': FileText,
  'dev.to': Newspaper,
  'hashnode.com': Newspaper,
  'medium.com': Newspaper,
  'substack.com': Newspaper,
  'notion.so': BookOpen,
  'notion.site': BookOpen,
  
  // Professional
  'dribbble.com': Globe,
  'behance.net': Globe,
  'figma.com': Globe,
  
  // News/Blog
  'blog.': Newspaper,
  'news.': Newspaper,
  
  // RSS
  'rss': Rss,
  'feed': Rss,
};

/**
 * Get the appropriate icon for a URL based on domain matching
 */
function getIconForUrl(url: string): LucideIcon {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.toLowerCase().replace('www.', '');
    
    // Exact domain match
    if (DOMAIN_ICONS[hostname]) {
      return DOMAIN_ICONS[hostname];
    }
    
    // Check for partial matches (subdomains, etc.)
    for (const [domain, icon] of Object.entries(DOMAIN_ICONS)) {
      if (hostname.includes(domain) || hostname.endsWith(domain)) {
        return icon;
      }
    }
    
    // Check path for RSS/feed
    const path = parsed.pathname.toLowerCase();
    if (path.includes('rss') || path.includes('feed')) {
      return Rss;
    }
    
    // Check for email links
    if (parsed.protocol === 'mailto:') {
      return Mail;
    }
    
    // Default
    return LinkIcon;
  } catch {
    return LinkIcon;
  }
}

export function LinksPage({ title, description, links, user, repo }: LinksPageProps) {
  if (links.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">🔗</div>
        <h1 className="text-xl font-semibold text-[var(--fg)] mb-2">No links yet</h1>
        <p className="text-sm text-[var(--muted)] mb-6">
          Add a <code className="bg-[var(--code-bg)] px-1.5 py-0.5 rounded">links.yaml</code> file to the{' '}
          <code className="bg-[var(--code-bg)] px-1.5 py-0.5 rounded">/blog</code> folder
        </p>
        <div className="bg-[var(--code-bg)] rounded-lg p-4 text-left text-sm font-mono max-w-xs mx-auto">
          <div className="text-[var(--muted)]"># blog/links.yaml</div>
          <div className="text-[var(--fg)]">title: "My Links"</div>
          <div className="text-[var(--fg)]">links:</div>
          <div className="text-[var(--fg)] pl-2">- label: "GitHub"</div>
          <div className="text-[var(--fg)] pl-4">url: "https://..."</div>
        </div>
        <Link
          href={`/${user}/${repo}`}
          className="inline-block mt-6 text-sm text-[var(--accent)] hover:underline"
        >
          ← Back to blog
        </Link>
      </div>
    );
  }

  return (
    <div className="text-center">
      {/* Header */}
      {(title || description) && (
        <header className="mb-8">
          {title && (
            <h1 className="text-2xl font-bold text-[var(--fg)] mb-2">{title}</h1>
          )}
          {description && (
            <p className="text-[var(--muted)]">{description}</p>
          )}
        </header>
      )}

      {/* Links */}
      <div className="space-y-3">
        {links.map((link, index) => {
          const Icon = getIconForUrl(link.url);
          return (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 w-full p-4 rounded-xl border border-[var(--border)] bg-[var(--code-bg)] hover:border-[var(--accent)] hover:bg-[var(--bg)] transition-all"
            >
              <Icon className="w-5 h-5 text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors flex-shrink-0" />
              <span className="flex-1 text-[var(--fg)] group-hover:text-[var(--accent)] font-medium transition-colors truncate">
                {link.label}
              </span>
              <span className="text-[var(--muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all">
                →
              </span>
            </a>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-10 pt-6 border-t border-[var(--border)]">
        <Link
          href={`/${user}/${repo}`}
          className="text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
        >
          ← Back to blog
        </Link>
      </div>

      {/* Branding */}
      <div className="mt-6">
        <a
          href="https://plok.sh"
          className="text-xs text-[var(--muted)] opacity-50 hover:opacity-100 transition-opacity"
        >
          powered by plok.sh
        </a>
      </div>
    </div>
  );
}
