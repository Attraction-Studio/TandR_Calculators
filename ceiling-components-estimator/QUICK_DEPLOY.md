# Quick Deploy to JSDeliver

## One-Time Setup (Already Done!)
✅ GitHub repo: `DavidWaters-Dev/TandR_Calculators`
✅ Build files created in `dist/`
✅ .gitignore updated to allow dist files

## Deploy Now

Run these commands from the **root directory** (`TandR_Calculators`):

```bash
# Add all calculator files
git add ceiling-components-estimator/

# Commit
git commit -m "Add Vue calculator for ceiling components estimator"

# Push to GitHub
git push origin main
```

## Wait & Test

1. **Wait ~30 seconds** for JSDeliver to cache the files
2. **Test the URLs** in your browser:
   - CSS: https://cdn.jsdelivr.net/gh/DavidWaters-Dev/TandR_Calculators@main/ceiling-components-estimator/dist/ceiling-components-estimator.css
   - JS: https://cdn.jsdelivr.net/gh/DavidWaters-Dev/TandR_Calculators@main/ceiling-components-estimator/dist/ceiling-components-estimator.iife.js

3. **Add to Webflow:**
   - Copy code from `WEBFLOW_EMBED.html`
   - Paste into Webflow Custom HTML Embed
   - Publish and test!

## Future Updates

When you make changes:

1. **Rebuild:**
   ```bash
   cd ceiling-components-estimator
   npm run build
   ```

2. **Commit & Push:**
   ```bash
   cd ..
   git add ceiling-components-estimator/dist/
   git commit -m "Update calculator build"
   git push origin main
   ```

That's it! JSDeliver automatically serves the latest files.

