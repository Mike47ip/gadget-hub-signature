# GadgetHub Signature — Under Construction Page

## Project Structure

```
gadgethub/
├── src/
│   ├── assets/
│   │   └── logo.png          # Official GadgetHub logo
│   ├── index.html            # HTML template
│   ├── index.js              # JS entry point
│   └── styles.css            # All styles
├── dist/                     # Built output (auto-generated)
├── .gitignore
├── package.json
├── README.md
└── webpack.config.js
```

## Setup & Run

### 1. Install dependencies
```bash
npm install
```

### 2. Run dev server (live reload on http://localhost:3000)
```bash
npm start
```

### 3. Build for production
```bash
npm run build
```
Production files land in `/dist` — deploy that folder to any static host.

## Deploy
Upload the contents of `/dist` to:
- Netlify (drag & drop the dist folder)
- GitHub Pages
- Vercel
- Any cPanel / shared hosting public_html folder
