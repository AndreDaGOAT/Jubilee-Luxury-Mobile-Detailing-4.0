diff --git a/README.md b/README.md
index 3f51556bdac43f16bf115da8792db6ab1c5d1532..1226aea58a79922129166f6df52539bfae9dc1ef 100644
--- a/README.md
+++ b/README.md
@@ -1,10 +1,42 @@
-- 👋 Hi, I’m @AndreDaGOAT
-- 👀 I’m interested in programming, data analystics, AI coding..
-- 🌱 I’m currently learning Python, AI coding enhancements...
-- 💞️ I’m looking to collaborate on GIS integrations, python best practices, AI enhancing...
-- 📫 How to reach me aarmstrong1234@gmail.com...
-
-<!---
-AndreDaGOAT/AndreDaGOAT is a ✨ special ✨ repository because its `README.md` (this file) appears on your GitHub profile.
-You can click the Preview link to take a look at your changes.
---->
+# Jubilee Luxury Mobile Detailing (GitHub Pages)
+
+Luxury-themed static site with quote capture, booking redirect, About page history, and image-driven vehicle showcase.
+
+## Included pages/files
+
+- `index.html` — homepage with hero, services, gallery, quote, and booking flow
+- `about.html` — Jubilee history + owner section
+- `styles.css` — full luxury redesign styling
+- `script.js` — settings + Formspree + Calendly redirect + Google Places
+- `assets/sedan.svg`, `assets/suv.svg`, `assets/truck.svg` — fallback graphics
+
+## Add attached images (required)
+
+Save the attached images using these exact names:
+
+- Owner photo → `assets/owner.png`
+- Home Page photo → `assets/home-page.png`
+- Sedan photo → `assets/sedan.png`
+- SUV photo → `assets/suv.png`
+- Truck photo → `assets/truck.png`
+- Small SUV photo → `assets/small-suv.png`
+
+If a PNG is missing, the site falls back to SVG graphics for vehicles.
+
+## Active integrations
+
+- Formspree endpoint: `https://formspree.io/f/xqewgnbb`
+- Calendly URL: `https://calendly.com/aarmstrong1234`
+- Google Places autocomplete for service address
+- Calendly prefill mapping:
+  - `name` and `email`
+  - `a1` = notes/request
+  - `a2` and `location` = service address
+
+## Launch checklist
+
+1. Commit and push to GitHub.
+2. Enable GitHub Pages with GitHub Actions as source.
+3. Validate:
+   - quote submission redirects to Calendly
+   - owner/home/gallery images render correctly
