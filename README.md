diff --git a/README.md b/README.md
index 3f51556bdac43f16bf115da8792db6ab1c5d1532..a7fcdc3937e9892d5bbde4c107b40315ed9d4a7c 100644
--- a/README.md
+++ b/README.md
@@ -1,10 +1,44 @@
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
+# JECS Quick Wash (GitHub Pages)
+
+JECS Quick Wash is a mobile, location-first wash request system focused on workplaces and high-traffic parking locations.
+
+## Service model shift
+
+- Brand renamed to **JECS Quick Wash**.
+- UX changed to a simple **Request Wash** workflow (no calendar-first flow).
+- Form captures **address + GPS coordinates** to support dispatch and routing.
+- Form now requires **SMS phone verification code** before request submission (Supabase Auth OTP).
+- Architecture supports **Formspree (temporary)** plus **Supabase/PostGIS (target)**.
+
+## Current stack
+
+- `index.html` — homepage, services, request form, operations model
+- `about.html` — history and mission
+- `script.js` — geolocation capture and Google Places autocomplete
+- `supabase-submit.js` — module-based SMS verification + dual submit to Formspree + Supabase
+- `styles.css` — existing UI system
+
+## Required integrations
+
+- Form endpoint: `https://formspree.io/f/xqewgnbb`
+- Google Places API script with `libraries=places`
+- Optional Supabase REST values in `script.js`:
+  - `supabaseUrl`
+  - `supabaseAnonKey`
+
+## Suggested Supabase table
+
+Table: `wash_requests`
+- `id` uuid primary key
+- `name` text
+- `email` text
+- `phone` text
+- `address` text
+- `service` text
+- `notes` text
+- `latitude` double precision
+- `longitude` double precision
+- `place_id` text
+- `created_at` timestamp default now()
+
+Then add PostGIS geometry column for map routing and queue dashboards.
