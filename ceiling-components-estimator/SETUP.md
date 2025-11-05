# Ceiling Components Estimator - Setup Guide

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```
   Opens at `http://localhost:5173`

3. **Build for production:**
   ```bash
   npm run build
   ```
   Outputs to `dist/` folder:
   - `ceiling-components-estimator.iife.js` - JavaScript bundle
   - `ceiling-components-estimator.css` - Styles

## Webflow Integration

### Option 1: Direct Embed (Testing)

1. Build the project: `npm run build`
2. Copy files from `dist/` to your web server
3. In Webflow, add Custom HTML:
   ```html
   <div id="ceiling-components-estimator-app"></div>
   <link rel="stylesheet" href="https://your-cdn.com/ceiling-components-estimator.css">
   <script src="https://your-cdn.com/ceiling-components-estimator.iife.js"></script>
   ```

### Option 2: JSDeliver (Recommended)

1. Push to GitHub repository
2. Connect to JSDeliver
3. Use in Webflow:
   ```html
   <div id="ceiling-components-estimator-app"></div>
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/your-username/repo@latest/ceiling-components-estimator/dist/ceiling-components-estimator.css">
   <script src="https://cdn.jsdelivr.net/gh/your-username/repo@latest/ceiling-components-estimator/dist/ceiling-components-estimator.iife.js"></script>
   ```

## Features Implemented

✅ Length and width inputs  
✅ Tile size selection (1200mm x 600mm / 600mm x 600mm)  
✅ Real-time area calculation  
✅ Component quantity calculations  
✅ Variance adjustment (0-5%)  
✅ Responsive design with Tailwind CSS  
✅ All calculation logic from original vanilla JS version  

## Next Steps

1. **Customize Styling:** Update Tailwind classes in `App.vue` to match your website design
2. **Add More Features:** Extend the component as needed
3. **Test:** Verify calculations match original calculator
4. **Deploy:** Set up JSDeliver or your preferred CDN

## Project Structure

```
ceiling-components-estimator/
├── src/
│   ├── App.vue          # Main calculator component
│   ├── main.js          # Vue app entry point
│   └── style.css        # Tailwind imports
├── dist/                # Build output (gitignored)
├── package.json
├── vite.config.js       # Build configuration
├── tailwind.config.js   # Tailwind configuration
└── index.html           # Dev server entry

