# Aegix Blog Maintenance & Content Guide

This document outlines the workflow for creating high-fidelity technical articles for the Aegix blog and maintaining the "Cyber-Security Noir" aesthetic.

## ✍️ Creating a New Blog Post

Content for Aegix is handled through a "Static Registry" pattern to ensure maximum performance and zero backend latency.

### Step 1: Create the HTML File
1.  Navigate to the `posts/` directory.
2.  Duplicate an existing post (e.g., `zero-trust.html`) to use as a template.
3.  Update the `<head>` metadata:
    *   `<title>`: `Title | Aegix Blog`
    *   `<meta name="description">`: Compelling excerpt.
    *   `og:image`: Path to the hero asset (e.g., `../assets/your-hero.png`).

### Step 2: Update the Global Registries
Aegix uses two registries to drive the UI. Both **must** be updated:

1.  **`data/posts.json`**: This is used for potential external integrations and as a data backup.
2.  **`scripts.js`**: Update the `allPosts` array at the top of the file. This drives the real-time gallery, tag filtering, and search engine.

**Required Fields:**
- `id`: Unique kebab-case string.
- `title`: Full title.
- `excerpt`: 1-2 sentence summary.
- `tag`: One of `Architecture`, `Research`, `Languages`, `Cryptography`.
- `date`: Format `Apr 28, 2026`.
- `readTime`: e.g., `12 min read`.
- `image`: Path starting with `assets/`.
- `url`: Path starting with `posts/`.

### Step 3: SEO & Syndication
1.  **`sitemap.xml`**: Add the new URL with a `priority` of `0.8`.
2.  **`rss.xml`**: Add a new `<item>` block. This is critical for the **Buttondown** newsletter automation.

---

## 🎨 Design Standards (Cyber-Security Noir)

To maintain the premium feel of the Aegix brand, follow these visual guidelines:

### 1. Typography & Hierarchy
- Use the `decrypt` class for main titles to enable the atomic scrambling animation.
- Always wrap technical terms in `<code>` blocks.
- Use `<h2>` for section breaks and `<pre><code class="language-xyz">` for code snippets.

### 2. Imagery
- **Hero Images**: Should be 1024x1024 or 16:9, following the dark-mode aesthetic with neon accents (Cyan: `#00F5FF`, Violet: `#BF00FF`).
- **Storage**: Always place images in the `assets/` directory with descriptive names.

### 3. Special Components
- **Pro-Tips**: Use the standardized cyan-bordered callout for critical security insights:
  ```html
  <div class="pro-tip" style="background: rgba(0, 245, 255, 0.05); border-left: 4px solid var(--primary); padding: 1.5rem; margin: 2rem 0; border-radius: 4px;">
      <strong style="color: var(--primary); display: block; margin-bottom: 0.5rem;">HEADING</strong>
      <p>Content...</p>
  </div>
  ```

---

## 🚀 Best Practices

- **Technical Depth**: Aegix is for developers. Avoid surface-level content; include code examples, architecture diagrams (Mermaid-style or images), and real-world security tradeoffs.
- **Temporal Alignment**: Ensure dates are current. For the 2026 deployment, all content should reflect the state of the art as of the 2026 timeline.
- **Performance**: Optimize PNG assets before pushing. Keep the overall page load under 2 seconds.
- **Accessibility**: Every image MUST have a descriptive `alt` tag.

---
*Built for the perimeter. © 2026 Aegix Security Inc.*
