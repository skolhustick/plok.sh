# plok.sh: Header & Footer Markdown Plan

## Feature summary

Goal:
Allow users to optionally inject a markdown header and footer around every post page, purely via files in `/blog`, with:
- No config flags required.
- No limits on length or content (they own it).
- No crashes if files are missing, broken, or absurd.
- No extra complexity for users who don’t care.

Effect:
On `/[user]/[repo]/[slug]`, the rendered content becomes:

[header markdown] + [post markdown] + [footer markdown]

All three are markdown, parsed the same way, with the same renderer + security guarantees.


## File naming & locations

Location:
- Inside the existing blog root: `/blog`

Reserved filenames:
- `blog.header.md`
- `blog.footer.md`

Reasons:
- Leading underscore avoids slug collisions with normal posts.
- Avoids reserving generic names like `header.md` that users might want as real posts.
- Easy to ignore in TOC / post lists.

Rules:
- Both files are optional.
- One may exist without the other.
- If both absent, system behaves exactly like before.


## Where they apply

Scope:
- Only on **post pages**: `/[user]/[repo]/[slug]`
- Not used on:
  - `/[user]`
  - `/[user]/[repo]` (repo TOC)
  - `/links` or other future routes (unless explicitly decided later)

No per-post override in v1:
- Header/footer are repo-level decorations.
- All posts in the repo share the same header/footer.


## Fetch and caching model

On `/[user]/[repo]/[slug]` page generation:

1) Fetch post markdown (existing logic).
2) Fetch `/blog/blog.header.md` (if it exists).
3) Fetch `/blog/blog.footer.md` (if it exists).

Important:
- Do **not** fail the whole page if header/footer fetch fails.
- Best effort only.

Caching:
- Page already uses ISR (e.g., `revalidate: 300`).
- Header/footer content is naturally cached as part of the final HTML.
- No separate cache needed for header/footer in v1.

GitHub fetch details:
- Use the same GitHub API path as posts:
  `/repos/{user}/{repo}/contents/blog/blog.header.md`
  `/repos/{user}/{repo}/contents/blog/blog.footer.md`
- If 404 → treat as “no header/footer”, no logs to user.
- If other error → log server-side, ignore header/footer, still render post.

Performance:
- Only 2 extra GitHub calls on first generation after revalidate.
- Subsequent requests hit cached HTML, so no overhead.


## Rendering pipeline (important)

We want **one** consistent markdown renderer for all content.

Order:
1) Render header markdown (if present) → HTML string `headerHtml`
2) Render main post markdown → HTML string `postHtml`
3) Render footer markdown (if present) → HTML string `footerHtml`

Final HTML passed to `PostView`:

```html
<div class="plok-post">
  <!-- header -->
  {headerHtml && <section class="plok-header" dangerouslySetInnerHTML={{ __html: headerHtml }} />}

  <!-- main content -->
  <article class="plok-body" dangerouslySetInnerHTML={{ __html: postHtml }} />

  <!-- footer -->
  {footerHtml && <section class="plok-footer" dangerouslySetInnerHTML={{ __html: footerHtml }} />}
</div>

Security & sanitization

Important: header/footer get the same sanitization behavior as posts.

Use the same markdown-it instance.

html: false (or equivalent) stays enforced:

No inline HTML.

No script injection.

Links: same treatment as main content (target, rel).

No extra special cases:

Header/footer are treated as “just more markdown”.

If they try to break out, they fail the same way posts would.

Fault tolerance & edge cases
1) Missing files

blog.header.md missing:

headerHtml = "".

Page renders normal post + optional footer.

blog.footer.md missing:

footerHtml = "".

Page renders header + main post.

Both missing:

System behaves exactly as current behavior.

2) GitHub 404 / network / rate-limits

If fetching blog.header.md or blog.footer.md returns 404:

Silently ignore, treat as missing.

If non-404 error (timeout, 500, rate-limited):

Log internally.

Ignore header/footer and still render the post.

Under no circumstance should post rendering fail because of header/footer.

3) Empty files

If blog.header.md is empty or whitespace:

After trim, treat as no header.

Same for blog.footer.md.

4) Broken markdown / weird content

Markdown parser should already be robust.

If somehow parsing throws:

Catch error.

Treat that section as absent.

Do NOT block main post from rendering.

5) Overly long header/footer

We do no truncation in v1.

User has full control.

Styling must handle long content gracefully (normal flow, no overflow hacks).

6) H1 in header or footer

We do NOT enforce heading levels.

Someone can put # giant header in blog.header.md.

Result: multiple H1s on page. HTML-purity nerds will cry, but that’s their problem.

We keep logic simple and avoid rewriting heading levels.