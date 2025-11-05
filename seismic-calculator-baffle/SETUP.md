# Setup Instructions

## Prerequisites

- Node.js 18+ and npm

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open browser:**
   Navigate to `http://localhost:5173`

## Project Structure

```
seismic-calculator-baffle/
├── src/
│   ├── App.vue          # Main calculator component
│   ├── main.js          # Vue app entry point
│   └── style.css        # Tailwind CSS imports
├── dist/                # Built files (for deployment)
├── index.html           # Development HTML
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
└── tailwind.config.js   # Tailwind configuration
```

## Building for Production

```bash
npm run build
```

This creates optimized files in `dist/` ready for JSDeliver deployment.

