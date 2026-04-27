# Aegix | Security-First Developer Blog

A premium, high-fidelity blog platform designed for security researchers, DevOps engineers, and technical developers. Built with a "Cyber-Security Noir" aesthetic, Aegix combines deep technical insights with an interactive, immersive user experience.

Live at: [blog.aegix.dev](https://blog.aegix.dev)

## 🚀 Key Features

- **Cyber-Security Noir Design**: A bespoke, dark-mode design system using glassmorphism, glowing accents, and high-contrast typography.
- **Interactive Security Console**: A functional, draggable terminal easter egg (Cmd+K or click the icon) with custom commands and secret discovery.
- **Atomic Decryption Engine**: Real-time character-scrambling animations on page titles for a high-tech "decryption" feel.
- **SEO & Performance Driven**: Includes a generated sitemap, robots.txt, and comprehensive Open Graph metadata for social sharing.
- **Automated Deployment**: Fully integrated GitHub Actions workflow for zero-downtime deployment to GitHub Pages on every push to `main`.

## 🛠 Tech Stack

- **Core**: Vanilla HTML5, CSS3, and Modern JavaScript (ES6+).
- **Styling**: Pure CSS (No frameworks) for maximum performance and design flexibility.
- **Typography**: Outfit, JetBrains Mono, and Roboto Mono via Google Fonts.
- **Code Highlighting**: Prism.js (Tomorrow Night theme).
- **Automation**: GitHub Actions (OIDC-based deployment).

## 📂 Project Structure

```text
├── data/               # Centralized blog post registry
├── posts/              # Technical article HTML files
├── scripts.js          # Core logic (Gallery, Terminal, Decryption)
├── styles.css          # Design system and layout
├── favicon.svg         # Brand asset
├── sitemap.xml         # SEO sitemap
└── robots.txt          # SEO crawler rules
```

## 🚢 Deployment

The site is configured to deploy automatically via GitHub Pages.

1.  **Local Changes**: Make edits to HTML, CSS, or JS files.
2.  **Commit**: `git add . && git commit -m "feat: add new security post"`
3.  **Push**: `git push origin main`
4.  **Live**: The GitHub Action will take ~30 seconds to rebuild and deploy the site to `blog.aegix.dev`.

---
*Built for developers, by developers. © 2026 Aegix Security Inc.*
