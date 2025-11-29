````txt
# plok.sh: /links Feature (Linktree via YAML)

## Goal
Add an optional links page at `/[user]/[repo]/links`, powered entirely by a YAML file stored in `/blog/links.yaml`.  
No accounts. No UI. No dashboards. Just GitHub.

## File
`/blog/links.yaml`

Example:
```yaml
title: "My Links"
description: "Places to find me"
links:
  - label: "GitHub"
    url: "https://github.com/user"
  - label: "Twitter"
    url: "https://twitter.com/user"
````

## Behavior

* If `links.yaml` exists → render a links page.
* If missing → show a clean “No links configured” page.
* If broken YAML → treat everything as empty, no crash.
* If malformed items → skip bad entries quietly.
* Zero hard limits: title, description, labels can be long.

## Route

`/[user]/[repo]/links`

Only active if the YAML file exists or user manually visits the URL.
Does not appear in TOC or index by default.

## Fetch Logic (fault tolerant)

1. Fetch `/repos/{user}/{repo}/contents/blog/links.yaml`
2. If 404 → empty state.
3. If network/GitHub error → log + empty state.
4. If exists → fetch `download_url` → parse YAML.
5. If parse error → empty state (no exceptions thrown).

## YAML Validation

* `title` → optional string.
* `description` → optional string.
* `links` → optional array.
* Each link item:

  * `label`: string (required or skip)
  * `url`: valid http/https (required or skip)
* Skip any unsafe or nonsense URLs.

## Rendering

Minimal column layout:

* Title (if exists)
* Description (if exists)
* Vertical list of links
* Each link rendered as a clean button-like anchor
* Respect theme colors via CSS vars
* No icons, no JS, no analytics baked in

## Component Structure

* Fetch YAML → `parseLinksYaml()`
* Return `{ title, description, links }`
* Pass to `<LinksPage />`
* If empty → show “No links found.”

## Styling

* Tailwind for spacing
* Max-width ~480px centered
* Links styled as simple padded blocks
* Inherit theme colors

## Edge Cases

* Missing file → empty state
* Empty file → empty state
* Malformed YAML → empty state
* Missing `links:` array → empty state
* Missing `label` or `url` → skip item
* Excess whitespace → harmless
* 500-line links list → still allowed
* User error never breaks page

## User Docs Snippet

````md
### Optional Links Page
Add `/blog/links.yaml` to create a links page at `/user/repo/links`.

Example:
```yaml
title: "My Links"
links:
  - label: "GitHub"
    url: "https://github.com/user"
  - label: "Website"
    url: "https://example.com"
````

If missing or invalid, plok.sh simply shows an empty page.

```

## Philosophy
- Repo is truth.
- YAML is control.
- Everything optional.
- Nothing breaks.
- Plok stays small, clean, and accountless.

END.
```
