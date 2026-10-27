# Project Review: Overview & Questions

Reviewed on 2026-10-26. I read every file in the repo and ran the site locally (desktop + mobile).

## What the site is today
- A static site with 3 pages: `index.html` (shop), `login.html`, and `admin.html`. It uses plain HTML, CSS and JS with no build step.
- Firebase (project `r-lamsal-books-backend`): Auth (email/password) and Firestore (region `asia-south2`, created 2025-12-24).
- 4 public forms write to Firestore: stock inquiry, item request, arrival notice, review.
- The admin panel reads those collections and can delete entries.
- Product "catalog" = 5 category cards that open a photo gallery (local images).

## How to use these files
| File | What's in it |
|---|---|
| `01-CRITICAL-FIXES.md` | Security and data problems. **Fix first.** |
| `02-BROKEN-FEATURES.md` | Features that exist but don't work, or only half work |
| `03-WEBSITE-IMPROVEMENTS.md` | Design, UX, content, SEO and new features |

Each item has a checkbox and an ID (C1, B1, I1…). Edit freely: delete items you don't want, reorder them, or add notes under any item with `> NOTE:`.

## Status
Sprint 1 (all of `01`, all of `02`) is done in code, not yet deployed. `[x]` = done, `[~]` = partly done (see the STATUS line under the item).

Sprint 2 (products, image compression, WhatsApp, map) is also done in code, not yet committed.

**2026-10-27: Firebase removed.** The site is now fully static. Forms open WhatsApp with the message pre-filled, reviews link to Google Maps, and the login/admin pages, `firebase-config.js` and the Firestore rules are gone. This makes C1–C7 (Firestore/Auth security), B5's admin buttons, B7–B9 (login/admin) and I29–I32 (admin upgrades) no longer apply. Questions 2, 3 and 6 below no longer matter.

## Questions I need you to answer (they change the plan)
1. **Is the site live anywhere?** There's no hosting config in the repo (no `firebase.json`, no GitHub Pages URL). Where should it be deployed: Firebase Hosting, GitHub Pages, Netlify?
2. **Firestore security rules:** what's currently set in the Firebase Console (Firestore → Rules)? Unauthenticated reads return **403** right now. If the DB was created in "test mode" on Dec 24, 2025, those rules expired around Jan 23, 2026. That would mean **every form on the site is failing today** (see C1).
3. **Admin account:** does `admin@rlamsal.com` actually exist in Firebase Auth? Who owns that inbox? (See C2.)
4. **Shop hours:** the site says "Open Daily 8 AM–8 PM (Closed Sun)". In Nepal, Saturday is usually the day off. Which is correct?
5. **How does the shop want to reply to customers?** WhatsApp, phone call, or SMS? Customers never give an email, so the current "Reply" (mailto) button can't work.
6. **Do customers need accounts at all?** Right now, logging in as a customer does nothing useful.
7. **Products/prices:** do you want a real product list (name, price, in-stock flag) that the admin can edit, or keep the photo galleries?
8. **Language:** English only, or English + Nepali?
