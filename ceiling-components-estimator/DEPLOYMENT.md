# Deployment Guide - GitHub → JSDeliver

## Quick Setup

### Step 1: Build the Project
```bash
cd ceiling-components-estimator
npm run build
```

This creates files in `dist/`:
- `ceiling-components-estimator.iife.js`
- `ceiling-components-estimator.css`

### Step 2: Commit and Push to GitHub

```bash
# From the root directory (TandR_Calculators)
git add ceiling-components-estimator/dist/
git add ceiling-components-estimator/package.json
git add ceiling-components-estimator/vite.config.js
git add ceiling-components-estimator/src/
git commit -m "Add Vue calculator for ceiling components estimator"
git push origin main
```

### Step 3: JSDeliver Setup

1. **Go to JSDeliver:** https://www.jsdelivr.com/
2. **No account needed!** JSDeliver automatically serves files from GitHub
3. **Use this URL pattern:**
   ```
   https://cdn.jsdelivr.net/gh/DavidWaters-Dev/TandR_Calculators@main/ceiling-components-estimator/dist/ceiling-components-estimator.iife.js
   ```

### Step 4: Webflow Embed Code

Add this to your Webflow page in a **Custom HTML Embed**:

```html
<div id="ceiling-components-estimator-app"></div>

<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/DavidWaters-Dev/TandR_Calculators@main/ceiling-components-estimator/dist/ceiling-components-estimator.css">

<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/gh/DavidWaters-Dev/TandR_Calculators@main/ceiling-components-estimator/dist/ceiling-components-estimator.iife.js"></script>
```

## URL Structure

JSDeliver GitHub format:
```
https://cdn.jsdelivr.net/gh/{username}/{repo}@{version}/{path}
```

For your project:
- Username: `DavidWaters-Dev`
- Repo: `TandR_Calculators`
- Version: `main` (or use tags like `@1.0.0` for versioning)
- Path: `ceiling-components-estimator/dist/ceiling-components-estimator.iife.js`

## Versioning (Optional)

For production, create a git tag for versioning:

```bash
git tag -a v1.0.0 -m "Initial release of ceiling components estimator"
git push origin v1.0.0
```

Then use in Webflow:
```
https://cdn.jsdelivr.net/gh/DavidWaters-Dev/TandR_Calculators@1.0.0/ceiling-components-estimator/dist/ceiling-components-estimator.iife.js
```

## Testing

1. Push to GitHub
2. Wait ~30 seconds for JSDeliver to cache
3. Test in Webflow by adding the embed code
4. Check browser console for any errors

## Troubleshooting

- **Files not found?** Check the path matches your GitHub repo structure
- **404 errors?** Make sure files are committed and pushed to GitHub
- **Cache issues?** Use `@latest` instead of `@main` or add `?v=timestamp` to force refresh

## Production Workflow

1. Make changes in `src/`
2. Build: `npm run build`
3. Commit dist files: `git add dist/ && git commit -m "Update build"`
4. Push: `git push origin main`
5. Files are automatically available via JSDeliver

