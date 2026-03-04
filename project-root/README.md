# Atlas Construction Website

This folder contains a static single-page website. To avoid 404 errors:

1. **Do not include spaces** in the folder or file names. The original `project root` directory caused request URLs like `/project%20root/` which returned 404. It was renamed to `project-root`.
2. Serve the directory with a web server. For local testing you can run:
   ```powershell
   cd "c:\Users\erikq\Downloads\AI\construction_website\project-root"
   python -m http.server 8000
   ```
   then open `http://localhost:8000` in your browser.
3. To make the site publicly accessible, push the contents to a GitHub repository and enable [GitHub Pages](https://docs.github.com/en/pages/quickstart). Alternatively, drag‑and‑drop the folder to Netlify, Vercel or another static host.

## Asset

The hero background image is stored as `images/hero-bg.png`.

## Responsiveness & Accessibility

- The hero section and text adapt to phone, tablet, and desktop via CSS media queries.
- Buttons and navigation links have visible borders for better contrast on the dark theme.
- The `Request a Free Estimate` text has been updated to `Request an Estimate` throughout.

Feel free to build additional pages in the `pages/` directory and update links accordingly.