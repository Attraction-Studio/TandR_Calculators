# Ceiling Components Estimator

Vue 3 + Tailwind CSS calculator for estimating ceiling components.

## Development

```bash
npm install
npm run dev
```

## Build for Production

```bash
npm run build
```

This creates a bundled file in `dist/` that can be deployed to JSDeliver.

## Webflow Integration

1. Build the project: `npm run build`
2. Upload `dist/ceiling-components-estimator.js` and `dist/ceiling-components-estimator.css` to your CDN/JSDeliver
3. In Webflow, add a Custom HTML embed:
   ```html
   <div id="ceiling-components-estimator-app"></div>
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/your-repo/ceiling-components-estimator@latest/dist/ceiling-components-estimator.css">
   <script src="https://cdn.jsdelivr.net/gh/your-repo/ceiling-components-estimator@latest/dist/ceiling-components-estimator.js"></script>
   ```

## Features

- Length and width input
- Tile size selection (1200mm x 600mm or 600mm x 600mm)
- Real-time area calculation
- Variance adjustment (0-5%)
- Component quantity calculations
- Responsive design with Tailwind CSS

