# T&R Interior Systems - Consolidated Calculators App

A unified Vue 3 application containing all T&R calculators, built with Vue 3 Composition API and Tailwind CSS.

## Features

- **Consolidated Architecture**: Single Vue app reduces duplication of Vue and Tailwind CSS loading
- **Shared Components**: Reusable UI components for consistent design
- **Calculator Navigation**: Easy switching between different calculators
- **Modern Design**: Clean, minimalist design matching T&R website aesthetic
- **Mobile Responsive**: Fully responsive layout for all screen sizes
- **Accessible**: Built with accessibility best practices (ARIA labels, semantic HTML)
- **Font Support**: Area Inktrap for headings, Inter for body text

## Structure

```
calculators-app/
├── src/
│   ├── components/          # Shared reusable components
│   │   ├── CalculatorNav.vue
│   │   ├── InputField.vue
│   │   ├── InfoBox.vue
│   │   ├── ResultCard.vue
│   │   └── RadioGroup.vue
│   ├── calculators/         # Individual calculator components
│   │   └── CeilingComponentsEstimator.vue
│   ├── App.vue              # Main app component
│   ├── main.js              # App entry point
│   └── style.css            # Global styles
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Available Calculators

1. **Ceiling Components Estimator** ✅ (Available)
2. Calculator 2 (Coming soon)
3. Calculator 3 (Coming soon)
4. Calculator 4 (Coming soon)

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

The app builds to a single IIFE bundle that can be deployed via JSDeliver or any CDN.

### Webflow Integration

1. Build the app: `npm run build`
2. Upload `dist/tandr-calculators.iife.js` and `dist/style.css` to your CDN
3. Add the embed code to your Webflow page (see `WEBFLOW_EMBED.html`)

## Adding New Calculators

1. Create a new component in `src/calculators/YourCalculator.vue`
2. Import and register it in `src/App.vue`
3. Add it to the `calculators` array with `available: true`

## Design System

- **Colors**: Gray scale palette matching T&R website
- **Typography**: Area Inktrap (headings), Inter (body)
- **Spacing**: Consistent spacing using Tailwind utilities
- **Components**: Reusable, accessible components

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge) with ES6+ support.

