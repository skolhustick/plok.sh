import { Shell } from '@/components/Shell';
import { CopyGuideButton } from '@/components/CopyGuideButton';
import Link from 'next/link';

export const metadata = {
  title: 'Guide - plok.sh',
  description: 'Learn how to set up your blog on plok.sh in minutes',
};

export default function GuidePage() {
  return (
    <Shell breadcrumbs={[{ label: 'guide' }]} theme="rose-pine" font="geist-mono">
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[var(--fg)] mb-4">
            Get started in 5 minutes ⚡
          </h1>
          <p className="text-lg text-[var(--muted)] mb-6">
            No account needed. No setup. Just GitHub + Markdown.
          </p>
          <CopyGuideButton />
        </div>

        {/* Prerequisites */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--fg)] mb-4 flex items-center gap-2">
            <span className="text-[var(--accent)]">0.</span> What you need
          </h2>
          <div className="bg-[var(--code-bg)] rounded-lg p-6 border border-[var(--border)]">
            <ul className="space-y-3 text-[var(--fg)]">
              <li className="flex items-start gap-3">
                <span className="text-[var(--accent)]">✓</span>
                <span>A <a href="https://github.com/signup" target="_blank" rel="noopener noreferrer" className="text-[var(--link)] hover:underline">GitHub account</a> (free)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--accent)]">✓</span>
                <span>A public repository (or create a new one)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--accent)]">✓</span>
                <span>5 minutes of your time</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Step 1 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--fg)] mb-4 flex items-center gap-2">
            <span className="text-[var(--accent)]">1.</span> Create a blog folder
          </h2>
          <p className="text-[var(--muted)] mb-6">
            In any public GitHub repo, create a folder called <code className="px-2 py-1 bg-[var(--code-bg)] rounded text-[var(--accent)]">blog</code>
          </p>
          
          <div className="bg-[var(--code-bg)] rounded-lg p-6 border border-[var(--border)] mb-4">
            <p className="text-sm text-[var(--muted)] mb-3">Your repo structure:</p>
            <div className="text-sm text-[var(--fg)] font-mono space-y-1">
              <div>📁 your-repo</div>
              <div className="pl-6">📁 <span className="text-[var(--accent)]">blog</span> <span className="text-[var(--muted)]">← create this</span></div>
              <div className="pl-12 text-[var(--muted)]">📄 your-posts.md</div>
              <div className="pl-6 text-[var(--muted)]">📄 README.md</div>
            </div>
          </div>

          <details className="bg-[var(--code-bg)] rounded-lg border border-[var(--border)]">
            <summary className="px-6 py-4 cursor-pointer text-[var(--fg)] hover:text-[var(--accent)]">
              🆕 Don&apos;t have a repo yet? Click here
            </summary>
            <div className="px-6 pb-6 pt-2 border-t border-[var(--border)]">
              <ol className="space-y-3 text-sm text-[var(--muted)]">
                <li>1. Go to <a href="https://github.com/new" target="_blank" rel="noopener noreferrer" className="text-[var(--link)] hover:underline">github.com/new</a></li>
                <li>2. Name it anything (e.g., <code className="px-1 bg-[var(--bg)] rounded">my-blog</code>)</li>
                <li>3. Make sure it&apos;s <strong className="text-[var(--fg)]">Public</strong></li>
                <li>4. Check &quot;Add a README file&quot;</li>
                <li>5. Click &quot;Create repository&quot;</li>
              </ol>
            </div>
          </details>
        </section>

        {/* Step 2 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--fg)] mb-4 flex items-center gap-2">
            <span className="text-[var(--accent)]">2.</span> Add your first post
          </h2>
          <p className="text-[var(--muted)] mb-6">
            Create a <code className="px-2 py-1 bg-[var(--code-bg)] rounded">.md</code> file inside the <code className="px-2 py-1 bg-[var(--code-bg)] rounded">blog</code> folder.
            The filename becomes the URL.
          </p>

          <div className="bg-[var(--code-bg)] rounded-lg border border-[var(--border)] overflow-hidden mb-4">
            <div className="px-4 py-2 border-b border-[var(--border)] text-sm text-[var(--muted)]">
              blog/hello-world.md
            </div>
            <pre className="p-4 text-sm text-[var(--fg)] font-mono overflow-x-auto">
{`---
title: Hello World
date: 2025-01-15
description: My first blog post
---

# Welcome to my blog!

This is my **first post** using plok.sh.

## It supports all Markdown

- Lists
- **Bold** and *italic*
- [Links](https://example.com)
- Images
- Code blocks
- And more!

\`\`\`javascript
console.log("Hello from plok.sh!");
\`\`\``}
            </pre>
          </div>

          <p className="text-sm text-[var(--muted)]">
            📁 File: <code className="px-1 bg-[var(--code-bg)] rounded">blog/hello-world.md</code> → 
            🌐 URL: <code className="px-1 bg-[var(--code-bg)] rounded text-[var(--accent)]">plok.sh/you/repo/hello-world</code>
          </p>
        </section>

        {/* Step 3 - Frontmatter */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--fg)] mb-4 flex items-center gap-2">
            <span className="text-[var(--accent)]">3.</span> Understanding frontmatter
          </h2>
          <p className="text-[var(--muted)] mb-6">
            The stuff between the <code className="px-2 py-1 bg-[var(--code-bg)] rounded">---</code> lines is called <strong className="text-[var(--fg)]">frontmatter</strong>. 
            It&apos;s metadata about your post. It&apos;s optional but recommended!
          </p>

          <div className="bg-[var(--code-bg)] rounded-lg border border-[var(--border)] overflow-hidden mb-6">
            <div className="px-4 py-2 border-b border-[var(--border)] text-sm text-[var(--muted)]">
              Frontmatter example
            </div>
            <pre className="p-4 text-sm font-mono overflow-x-auto">
              <span className="text-[var(--muted)]">---</span>{'\n'}
              <span className="text-[var(--accent)]">title</span><span className="text-[var(--muted)]">:</span> <span className="text-[var(--fg)]">My Post Title</span>{'\n'}
              <span className="text-[var(--accent)]">date</span><span className="text-[var(--muted)]">:</span> <span className="text-[var(--fg)]">2025-01-15</span>{'\n'}
              <span className="text-[var(--accent)]">description</span><span className="text-[var(--muted)]">:</span> <span className="text-[var(--fg)]">A short summary for previews</span>{'\n'}
              <span className="text-[var(--muted)]">---</span>
            </pre>
          </div>

          <div className="grid gap-4 text-sm">
            <div className="flex gap-4 items-start">
              <code className="px-2 py-1 bg-[var(--code-bg)] rounded text-[var(--accent)] shrink-0">title</code>
              <span className="text-[var(--muted)]">Shows in the post list and browser tab</span>
            </div>
            <div className="flex gap-4 items-start">
              <code className="px-2 py-1 bg-[var(--code-bg)] rounded text-[var(--accent)] shrink-0">date</code>
              <span className="text-[var(--muted)]">Used to sort posts (newest first). Format: YYYY-MM-DD</span>
            </div>
            <div className="flex gap-4 items-start">
              <code className="px-2 py-1 bg-[var(--code-bg)] rounded text-[var(--accent)] shrink-0">description</code>
              <span className="text-[var(--muted)]">Shows as a preview in the post list</span>
            </div>
          </div>
        </section>

        {/* Step 4 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--fg)] mb-4 flex items-center gap-2">
            <span className="text-[var(--accent)]">4.</span> Visit your blog
          </h2>
          <p className="text-[var(--muted)] mb-6">
            That&apos;s it! Your blog is live at:
          </p>

          <div className="bg-[var(--code-bg)] rounded-lg p-6 border border-[var(--border)] text-center">
            <p className="text-2xl font-mono">
              <span className="text-[var(--muted)]">plok.sh/</span>
              <span className="text-[var(--accent)]">your-username</span>
              <span className="text-[var(--muted)]">/</span>
              <span className="text-[var(--accent)]">your-repo</span>
            </p>
          </div>
        </section>

        {/* Optional: Customize */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--fg)] mb-4 flex items-center gap-2">
            <span className="text-[var(--accent)]">5.</span> Customize (optional)
          </h2>
          <p className="text-[var(--muted)] mb-6">
            Want a different look? Add a config file to change themes, fonts, and more.
          </p>

          <div className="bg-[var(--code-bg)] rounded-lg border border-[var(--border)] overflow-hidden mb-6">
            <div className="px-4 py-2 border-b border-[var(--border)] text-sm text-[var(--muted)]">
              blog/blog.config.yaml
            </div>
            <pre className="p-4 text-sm font-mono overflow-x-auto">
              <span className="text-[var(--muted)]"># Blog metadata</span>{'\n'}
              <span className="text-[var(--accent)]">title</span><span className="text-[var(--muted)]">:</span> <span className="text-[var(--fg)]">&quot;My Awesome Blog&quot;</span>{'\n'}
              <span className="text-[var(--accent)]">description</span><span className="text-[var(--muted)]">:</span> <span className="text-[var(--fg)]">&quot;Thoughts on code and life&quot;</span>{'\n\n'}
              <span className="text-[var(--muted)]"># Appearance</span>{'\n'}
              <span className="text-[var(--accent)]">theme</span><span className="text-[var(--muted)]">:</span> <span className="text-[var(--fg)]">&quot;catppuccin-mocha&quot;</span>{'\n'}
              <span className="text-[var(--accent)]">font</span><span className="text-[var(--muted)]">:</span> <span className="text-[var(--fg)]">&quot;inter&quot;</span>{'\n\n'}
              <span className="text-[var(--muted)]"># Features</span>{'\n'}
              <span className="text-[var(--accent)]">show_toc</span><span className="text-[var(--muted)]">:</span> <span className="text-[var(--fg)]">true</span>{'\n'}
              <span className="text-[var(--accent)]">show_repo_link</span><span className="text-[var(--muted)]">:</span> <span className="text-[var(--fg)]">true</span>{'\n\n'}
              <span className="text-[var(--muted)]"># Analytics (optional)</span>{'\n'}
              <span className="text-[var(--accent)]">ga_id</span><span className="text-[var(--muted)]">:</span> <span className="text-[var(--fg)]">&quot;G-XXXXXXXXXX&quot;</span>
            </pre>
          </div>

          {/* Config options explained */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-[var(--fg)]">Config options explained</h3>
            
            <div className="grid gap-3 text-sm">
              <div className="flex gap-4 items-start p-3 bg-[var(--code-bg)] rounded-lg border border-[var(--border)]">
                <code className="px-2 py-1 bg-[var(--bg)] rounded text-[var(--accent)] shrink-0">title</code>
                <span className="text-[var(--muted)]">Your blog&apos;s name. Shows in the header and browser tab.</span>
              </div>
              <div className="flex gap-4 items-start p-3 bg-[var(--code-bg)] rounded-lg border border-[var(--border)]">
                <code className="px-2 py-1 bg-[var(--bg)] rounded text-[var(--accent)] shrink-0">description</code>
                <span className="text-[var(--muted)]">A short tagline. Shows below the title on the blog page.</span>
              </div>
              <div className="flex gap-4 items-start p-3 bg-[var(--code-bg)] rounded-lg border border-[var(--border)]">
                <code className="px-2 py-1 bg-[var(--bg)] rounded text-[var(--accent)] shrink-0">theme</code>
                <span className="text-[var(--muted)]">Color scheme. <Link href="/themes" className="text-[var(--link)] hover:underline">21 themes available</Link> (default: rose-pine)</span>
              </div>
              <div className="flex gap-4 items-start p-3 bg-[var(--code-bg)] rounded-lg border border-[var(--border)]">
                <code className="px-2 py-1 bg-[var(--bg)] rounded text-[var(--accent)] shrink-0">font</code>
                <span className="text-[var(--muted)]">Typography. Options: system, inter, manrope, space-grotesk, outfit, jetbrains, fira-code, geist-mono</span>
              </div>
              <div className="flex gap-4 items-start p-3 bg-[var(--code-bg)] rounded-lg border border-[var(--border)]">
                <code className="px-2 py-1 bg-[var(--bg)] rounded text-[var(--accent)] shrink-0">show_toc</code>
                <span className="text-[var(--muted)]">Show table of contents on posts. <code className="px-1 bg-[var(--bg)] rounded">true</code> or <code className="px-1 bg-[var(--bg)] rounded">false</code> (default: true)</span>
              </div>
              <div className="flex gap-4 items-start p-3 bg-[var(--code-bg)] rounded-lg border border-[var(--border)]">
                <code className="px-2 py-1 bg-[var(--bg)] rounded text-[var(--accent)] shrink-0">show_repo_link</code>
                <span className="text-[var(--muted)]">Show &quot;View on GitHub&quot; link. <code className="px-1 bg-[var(--bg)] rounded">true</code> or <code className="px-1 bg-[var(--bg)] rounded">false</code> (default: true)</span>
              </div>
              <div className="flex gap-4 items-start p-3 bg-[var(--code-bg)] rounded-lg border border-[var(--border)]">
                <code className="px-2 py-1 bg-[var(--bg)] rounded text-[var(--accent)] shrink-0">ga_id</code>
                <span className="text-[var(--muted)]">Google Analytics ID for tracking visitors. See below for setup.</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link 
              href="/themes" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--accent)] text-[var(--bg)] rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Browse 21 themes →
            </Link>
          </div>
        </section>

        {/* Google Analytics */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--fg)] mb-4 flex items-center gap-2">
            <span className="text-[var(--accent)]">6.</span> Google Analytics (optional)
          </h2>
          <p className="text-[var(--muted)] mb-6">
            Track your visitors with Google Analytics. Just add your GA ID to the config.
          </p>

          <div className="space-y-6">
            <div className="bg-[var(--code-bg)] rounded-lg p-6 border border-[var(--border)]">
              <h3 className="font-semibold text-[var(--fg)] mb-4">How to get your GA ID:</h3>
              <ol className="space-y-3 text-sm text-[var(--muted)]">
                <li className="flex gap-3">
                  <span className="text-[var(--accent)] font-bold">1.</span>
                  <span>Go to <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer" className="text-[var(--link)] hover:underline">analytics.google.com</a></span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[var(--accent)] font-bold">2.</span>
                  <span>Create an account or sign in</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[var(--accent)] font-bold">3.</span>
                  <span>Create a new property for your blog</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[var(--accent)] font-bold">4.</span>
                  <span>Go to <strong className="text-[var(--fg)]">Admin → Data Streams → Web</strong></span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[var(--accent)] font-bold">5.</span>
                  <span>Copy your <strong className="text-[var(--fg)]">Measurement ID</strong> (starts with <code className="px-1 bg-[var(--bg)] rounded">G-</code>)</span>
                </li>
              </ol>
            </div>

            <div className="bg-[var(--code-bg)] rounded-lg border border-[var(--border)] overflow-hidden">
              <div className="px-4 py-2 border-b border-[var(--border)] text-sm text-[var(--muted)]">
                Add to blog.config.yaml
              </div>
              <pre className="p-4 text-sm font-mono">
                <span className="text-[var(--accent)]">ga_id</span><span className="text-[var(--muted)]">:</span> <span className="text-[var(--fg)]">&quot;G-XXXXXXXXXX&quot;</span>
              </pre>
            </div>

            <p className="text-sm text-[var(--muted)]">
              💡 Your analytics data stays in <strong className="text-[var(--fg)]">your</strong> Google Analytics account. plok.sh doesn&apos;t see your visitor data.
            </p>
          </div>
        </section>

        {/* Header & Footer */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--fg)] mb-4 flex items-center gap-2">
            <span className="text-[var(--accent)]">7.</span> Header &amp; Footer (optional)
          </h2>
          <p className="text-[var(--muted)] mb-6">
            Add consistent content above/below every post with these optional files.
          </p>

          <div className="bg-[var(--code-bg)] rounded-lg p-6 border border-[var(--border)] mb-6">
            <p className="text-sm text-[var(--muted)] mb-3">Your repo structure:</p>
            <div className="text-sm text-[var(--fg)] font-mono space-y-1">
              <div>📁 blog</div>
              <div className="pl-6">📄 <span className="text-[var(--accent)]">blog.header.md</span> <span className="text-[var(--muted)]">← shows above every post</span></div>
              <div className="pl-6">📄 <span className="text-[var(--accent)]">blog.footer.md</span> <span className="text-[var(--muted)]">← shows below every post</span></div>
              <div className="pl-6 text-[var(--muted)]">📄 your-posts.md</div>
            </div>
          </div>

          <div className="bg-[var(--code-bg)] rounded-lg border border-[var(--border)] overflow-hidden mb-6">
            <div className="px-4 py-2 border-b border-[var(--border)] text-sm text-[var(--muted)]">
              Example: blog/blog.footer.md
            </div>
            <pre className="p-4 text-sm font-mono overflow-x-auto">
              <span className="text-[var(--muted)]">---</span>{'\n'}
              <span className="text-[var(--fg)]">Thanks for reading! Follow me on </span>
              <span className="text-[var(--accent)]">[Twitter](https://twitter.com/you)</span>
              <span className="text-[var(--fg)]"> for more.</span>
            </pre>
          </div>

          <p className="text-sm text-[var(--muted)]">
            💡 Both files are optional and use standard markdown. Great for author bios, social links, or newsletter signups.
          </p>
        </section>

        {/* Links Page */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--fg)] mb-4 flex items-center gap-2">
            <span className="text-[var(--accent)]">8.</span> Links Page (optional)
          </h2>
          <p className="text-[var(--muted)] mb-6">
            Create a Linktree-style links page with a simple YAML file.
          </p>

          <div className="bg-[var(--code-bg)] rounded-lg border border-[var(--border)] overflow-hidden mb-6">
            <div className="px-4 py-2 border-b border-[var(--border)] text-sm text-[var(--muted)]">
              blog/links.yaml
            </div>
            <pre className="p-4 text-sm font-mono overflow-x-auto">
              <span className="text-[var(--accent)]">title</span><span className="text-[var(--muted)]">:</span> <span className="text-[var(--fg)]">&quot;My Links&quot;</span>{'\n'}
              <span className="text-[var(--accent)]">description</span><span className="text-[var(--muted)]">:</span> <span className="text-[var(--fg)]">&quot;Find me around the web&quot;</span>{'\n'}
              <span className="text-[var(--accent)]">links</span><span className="text-[var(--muted)]">:</span>{'\n'}
              <span className="text-[var(--fg)]">  - label: &quot;GitHub&quot;</span>{'\n'}
              <span className="text-[var(--fg)]">    url: &quot;https://github.com/you&quot;</span>{'\n'}
              <span className="text-[var(--fg)]">  - label: &quot;Twitter&quot;</span>{'\n'}
              <span className="text-[var(--fg)]">    url: &quot;https://twitter.com/you&quot;</span>
            </pre>
          </div>

          <p className="text-sm text-[var(--muted)]">
            💡 Your links page will be at <code className="px-1 bg-[var(--bg)] rounded">plok.sh/user/repo/links</code>. Icons are auto-detected for popular platforms!
          </p>
        </section>

        {/* Tips */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--fg)] mb-4">
            💡 Tips
          </h2>
          <div className="space-y-4">
            <div className="bg-[var(--code-bg)] rounded-lg p-4 border border-[var(--border)]">
              <p className="text-[var(--fg)] font-medium mb-1">Use descriptive filenames</p>
              <p className="text-sm text-[var(--muted)]">
                <code className="px-1 bg-[var(--bg)] rounded">how-to-learn-rust.md</code> is better than <code className="px-1 bg-[var(--bg)] rounded">post1.md</code>
              </p>
            </div>
            <div className="bg-[var(--code-bg)] rounded-lg p-4 border border-[var(--border)]">
              <p className="text-[var(--fg)] font-medium mb-1">Changes appear instantly</p>
              <p className="text-sm text-[var(--muted)]">
                Push to GitHub and your blog updates automatically. May take ~30 seconds to refresh.
              </p>
            </div>
            <div className="bg-[var(--code-bg)] rounded-lg p-4 border border-[var(--border)]">
              <p className="text-[var(--fg)] font-medium mb-1">Multiple blogs? No problem</p>
              <p className="text-sm text-[var(--muted)]">
                Each repo with a <code className="px-1 bg-[var(--bg)] rounded">/blog</code> folder becomes a separate blog.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--fg)] mb-6">
            ❓ FAQs
          </h2>
          <div className="space-y-4">
            <div className="bg-[var(--code-bg)] rounded-lg p-4 border border-[var(--border)]">
              <p className="text-[var(--fg)] font-medium mb-2">Can I use this for documentation?</p>
              <p className="text-sm text-[var(--muted)]">
                Absolutely! Just create a <code className="px-1 bg-[var(--bg)] rounded">/blog</code> folder in your project repo and add your docs as markdown files. Great for changelogs, tutorials, or project guides.
              </p>
            </div>
            <div className="bg-[var(--code-bg)] rounded-lg p-4 border border-[var(--border)]">
              <p className="text-[var(--fg)] font-medium mb-2">Do I need to sign up?</p>
              <p className="text-sm text-[var(--muted)]">
                Nope! plok.sh reads directly from public GitHub repos. No account, no API keys, no setup.
              </p>
            </div>
            <div className="bg-[var(--code-bg)] rounded-lg p-4 border border-[var(--border)]">
              <p className="text-[var(--fg)] font-medium mb-2">Can I use a private repo?</p>
              <p className="text-sm text-[var(--muted)]">
                Not yet. plok.sh only works with public repositories. Private repo support may come in the future.
              </p>
            </div>
            <div className="bg-[var(--code-bg)] rounded-lg p-4 border border-[var(--border)]">
              <p className="text-[var(--fg)] font-medium mb-2">Can I use a custom domain?</p>
              <p className="text-sm text-[var(--muted)]">
                Not currently. Your blog lives at <code className="px-1 bg-[var(--bg)] rounded">plok.sh/username/repo</code>. Custom domains are on the roadmap.
              </p>
            </div>
            <div className="bg-[var(--code-bg)] rounded-lg p-4 border border-[var(--border)]">
              <p className="text-[var(--fg)] font-medium mb-2">How do I delete my blog?</p>
              <p className="text-sm text-[var(--muted)]">
                Just delete the <code className="px-1 bg-[var(--bg)] rounded">/blog</code> folder from your repo, or make the repo private. There&apos;s nothing to &quot;delete&quot; on plok.sh — we don&apos;t store your content.
              </p>
            </div>
            <div className="bg-[var(--code-bg)] rounded-lg p-4 border border-[var(--border)]">
              <p className="text-[var(--fg)] font-medium mb-2">Is there a post limit?</p>
              <p className="text-sm text-[var(--muted)]">
                No limits. Add as many markdown files as you want. Just keep them in the <code className="px-1 bg-[var(--bg)] rounded">/blog</code> folder.
              </p>
            </div>
            <div className="bg-[var(--code-bg)] rounded-lg p-4 border border-[var(--border)]">
              <p className="text-[var(--fg)] font-medium mb-2">Can I organize posts in subfolders?</p>
              <p className="text-sm text-[var(--muted)]">
                Yes! Create subfolders inside <code className="px-1 bg-[var(--bg)] rounded">/blog</code> and posts will be accessible at <code className="px-1 bg-[var(--bg)] rounded">plok.sh/user/repo/folder/post</code>
              </p>
            </div>
            <div className="bg-[var(--code-bg)] rounded-lg p-4 border border-[var(--border)]">
              <p className="text-[var(--fg)] font-medium mb-2">Does it support images?</p>
              <p className="text-sm text-[var(--muted)]">
                Yes! Use standard markdown image syntax. Host images in your repo or use external URLs like <code className="px-1 bg-[var(--bg)] rounded">![alt](https://...)</code>
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-12 border-t border-[var(--border)]">
          <h2 className="text-2xl font-bold text-[var(--fg)] mb-4">
            Ready to start?
          </h2>
          <p className="text-[var(--muted)] mb-8">
            Enter your GitHub username to see your blogs
          </p>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-[var(--bg)] rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            ← Back to home
          </Link>
        </section>
      </div>
    </Shell>
  );
}
