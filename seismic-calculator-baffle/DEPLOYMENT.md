# Deployment Instructions

## Deploy to GitHub

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Commit and push:**
   ```bash
   git add .
   git commit -m "Build seismic calculator baffle"
   git push origin main
   ```

3. **Wait for JSDeliver cache** (~30 seconds after push)

## Deploy to Webflow

Use the embed code in `WEBFLOW_EMBED.html`:

1. Copy the HTML from `WEBFLOW_EMBED.html`
2. In Webflow, add a Custom HTML Embed element
3. Paste the embed code
4. The calculator will load automatically

## JSDeliver CDN URLs

After pushing to GitHub, files will be available at:

- **CSS:** `https://cdn.jsdelivr.net/gh/DavidWaters-Dev/TandR_Calculators@main/seismic-calculator-baffle/dist/seismic-calculator-baffle.css`
- **JS:** `https://cdn.jsdelivr.net/gh/DavidWaters-Dev/TandR_Calculators@main/seismic-calculator-baffle/dist/seismic-calculator-baffle.iife.js`

Replace `@main` with `@<branch-name>` or `@<tag>` for specific versions.

