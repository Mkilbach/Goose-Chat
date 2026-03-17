---
name: bump-version
description: Reminds to update the version meta tag in index.html before committing. Use this skill whenever the user wants to commit, create a commit, push changes, or wrap up work on a feature. Even if they don't mention versioning — if they're about to commit, trigger this skill.
---

Before creating a commit, always check and update the version in `index.html`.

## Steps

1. Read the current version from `index.html`:
   ```html
   <meta name="version" content="X.Y.Z" />
   ```

2. Determine the appropriate increment based on the nature of the changes and apply it immediately without prompting:
   - **Patch** (X.Y.**Z**) — bug fixes, small tweaks
   - **Minor** (X.**Y**.0) — new features, backward compatible
   - **Major** (**X**.0.0) — breaking changes, major releases

3. Update the `content` value in the meta tag in `index.html`.

4. Update the `"version"` field in `package.json` to the same version.

5. Include both `index.html` and `package.json` in the commit staging.

## Version format

Use semantic versioning: `MAJOR.MINOR.PATCH` (e.g. `1.0.0`, `1.1.0`, `2.0.0`).

## Commit message format

Always include the new version in the commit scope:
```
feat(1.1.0): add user avatars
fix(1.0.2): correct FTP deploy path
```

## Example

Current: `content="1.0.0"` → after a small fix → `content="1.0.1"` in `index.html` and `"version": "1.0.1"` in `package.json`
