# 03: Overall Website Improvements

Once 01 and 02 are done. Grouped by area; pick what you want and delete the rest.

---

## A. Contact & conversion (biggest wins for a local shop)
- [x] **I1. WhatsApp button:** a floating "Chat on WhatsApp" button plus WhatsApp links in the hero and footer. Most Pokhara customers will use this over any form. *(done: floating button, hero card, footer, Visit section, per-product "WhatsApp" buttons)*
- [x] **I2. Click-to-call:** make every phone number a `tel:+9779846055675` link. *(done)*
- [x] **I3. Google Map:** embed the map + a "Get Directions" button for Rastra Bank Rd. Link the Google Business profile if you have one. *(done: "Visit the Shop" section with embedded map + Get Directions; it finds the Google listing "Lamsal Books & Stationery" (6X4G+QPH))*
- [ ] **I4. Show Google reviews / rating** if the shop has a Google listing. *(The listing exists: "Lamsal Books & Stationery", currently 5.0★ from 2 reviews. Add a "Review us on Google" link to get more reviews.)*
- [ ] **I5. Social links:** Facebook / Instagram / TikTok, if the shop has them.

## B. Products
- [x] **I6. Real product cards instead of WhatsApp photos:** name, short description, price (optional), and an "In stock / Ask us" badge. Each card gets an **"Ask about this"** button that pre-fills the stock form or WhatsApp message. *(done: 20 product cards from `products.js` with "Check stock" (pre-fills the form) and WhatsApp buttons; no prices yet)*
- [ ] **I7. Admin-managed products:** let the admin add, edit or hide products from the admin panel. Stored in Firestore, images in Firebase Storage. This removes the hardcoded `galleryData` in `script.js:47`.
- [x] **I8. Search / filter** across products. *(done: search box + category filter chips)*
- [x] **I9. Category cards show a real photo** instead of an emoji placeholder. *(done: category cards replaced by a real product grid with photos; click a photo to view it larger)*
- [~] **I10. School book sets:** a dedicated section for Class 8–10 sets ("Old is Gold", etc.), since `lamsal.md` mentions them as a key line. *(partly done: a "Class 8–10 Study Guides" card with no photo yet; send photos of the sets to add them)*

## C. Performance
- [x] **I11. Compress and resize images.** `books/` is **5.3 MB** (PNG, ~500–700 KB each), and the photos are 1200×1600 JPEGs. Convert to WebP at ~800px, which should come to roughly 90% smaller. *(done: 8 MB → 1.4 MB. Optimized 720px JPEGs, because this Mac's `sips` can't write WebP)*
- [x] **I12. Rename image folders/files:** remove spaces and the trailing space in `"Regular Stationary /"` (also fixes the "Stationary" spelling). Some hosts break on these paths. *(done: everything is in `assets/img/products/<name>.jpg`; old folders removed; 3 duplicate images and 1 screenshot dropped)*
- [ ] **I13. Upgrade the Firebase SDK** from 9.22 to the current v11/v12 modular version.

## D. Design / UX
- [ ] **I14. Consistent styling:** `login.html` and `admin.html` each have their own inline `<style>`. Share `style.css` tokens so all pages look like one site.
- [ ] **I15. Hero:** add a real storefront photo, and tighten the copy. The info cards have uneven widths on mobile (`min-width: 250px`).
- [~] **I16. Better form feedback:** inline success/error messages instead of `alert()`, a disabled button while sending, and a "We'll WhatsApp you within X hours" confirmation. *(partly done (inline messages, disabled button))*
- [ ] **I17. Star-rating widget:** clickable stars instead of a `<select>`.
- [x] **I18. Arrival form:** date + time (not just time), restricted to opening hours. *(done (date + time, 8 AM–8 PM))*
- [ ] **I19. Dark mode** (optional).
- [ ] **I20. Favicon + logo:** there's no favicon now.

## E. Accessibility
- [x] **I21.** Category cards are clickable `<div>`s, so keyboard users can't open them. Use `<button>`/`<a>`. *(done)*
- [ ] **I22.** Inputs have no `<label>`s (placeholder only), so screen readers and autofill suffer.
- [~] **I23.** Modals: focus trap, `role="dialog"`, `aria-modal`, Esc to close. *(partly done (Esc, role=dialog))*
- [ ] **I24.** Gallery `alt` text is generic ("Books Collection Image"). Describe each product.

## F. SEO & sharing
- [ ] **I25.** Open Graph / Twitter tags so links shared on Facebook or WhatsApp show a preview image.
- [ ] **I26.** `LocalBusiness` JSON-LD (address, phone, hours, geo), which helps the shop appear in Google local results.
- [~] **I27.** `robots.txt`, `sitemap.xml`, and `noindex` on `admin.html` and `login.html`. *(partly done (noindex on admin/login))*
- [ ] **I28.** A custom domain (e.g. `rlamsalbooks.com.np`, which is free for Nepali businesses via register.com.np).

## G. Admin panel upgrades
- [ ] **I29.** Request status workflow (New / Replied / Ready for pickup / Done) with filters.
- [ ] **I30.** Live updates (`onSnapshot`), so new inquiries appear without a refresh, plus a "new" badge.
- [ ] **I31.** Notifications to the shop phone on a new inquiry (email via a Firebase extension, or a Telegram/WhatsApp bot). Needs Cloud Functions on the Blaze plan.
- [ ] **I32.** Today's arrivals view sorted by time.

## H. Project structure & deploy
- [ ] **I33.** Folder layout: `/assets/img/<category>/`, `/js/`, `/css/`, plus `/plan/` (these docs).
- [x] **I34.** Replace `lamsal.md` / `ENABLE_AUTH.md` with a single `README.md` (shop info, how to run locally, how to deploy, admin setup). *(done (README.md))*
- [~] **I35.** Deployment: Firebase Hosting (`firebase.json`), deploying rules + site with one command. Optionally a GitHub Action that auto-deploys on push to `main`. *(partly done (firebase.json; no GitHub Action yet))*
- [ ] **I36.** Nepali language toggle (EN / नेपाली), if wanted.

---

## Suggested order
1. **Sprint 1, make it safe and working:** C1–C7, B1–B6, B10
2. **Sprint 2, make it useful:** B7–B9, B11–B12, I1–I3, I11–I12, I16
3. **Sprint 3, make it great:** products (I6–I10), admin upgrades (I29–I32), SEO (I25–I28), the rest
