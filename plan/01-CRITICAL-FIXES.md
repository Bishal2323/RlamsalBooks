# 01: Critical Fixes (do these first)

These are security, privacy, or "the whole site silently doesn't work" problems.

---

### [x] C1. Firestore rules are not in the repo, and the forms are probably failing
> STATUS (2026-10-26): DONE in code: `firestore.rules`, `firestore.indexes.json`, `firebase.json` added and tested (24/24 emulator checks). **YOU:** run `firebase deploy --only firestore`.
- **Where:** there is no `firestore.rules` or `firebase.json` in the project.
- **Problem:** the database was created 2025-12-24. If it was created in "test mode", the default rules expired after 30 days, and Firestore now rejects **every** write. All 4 forms would then show "Error sending data…", and the admin panel would show "Error loading data". My unauthenticated read test returned `403`, which fits that, though it doesn't prove writes are blocked.
- **Fix:** add `firestore.rules` + `firebase.json` to the repo and deploy proper rules:
  - Public can **create** in `stock_inquiries`, `item_requests`, `arrival_notifications`, `reviews`, with field validation (allowed keys only, string lengths, rating 1–5).
  - Public can **read** only *approved* reviews.
  - Only the admin can read, update or delete everything else.
- **Verify:** submit each form → it appears in the admin panel.

### [x] C2. The admin check runs only in the browser and is tied to a hardcoded email
> STATUS (2026-10-26): DONE in code: admin is now `rlamsalbooks@gmail.com` + verified email, enforced in rules; one constant in `firebase-config.js`. **YOU:** create that user in the Console and disable sign-up (README steps 2–4).
- **Where:** `admin.js:7`, `login.js:55`, `script.js:27`. `'admin@rlamsal.com'` is hardcoded 3 times.
- **Problem:**
  - The only thing protecting customer data is JS in the browser. Anyone can open DevTools or call Firestore directly. Real protection has to live in the **Firestore rules** (C1).
  - If `admin@rlamsal.com` was **never registered**, anyone can go to `login.html` → "Create Account" with that email and become admin.
  - `rlamsal.com` may not be a domain you own, so a password reset to that address could go to someone else.
- **Fix:** register the admin account yourself with an email you control (e.g. `rlamsalbooks@gmail.com`). Then enforce admin in rules, either by UID (`request.auth.uid == "<uid>"`) or with a custom claim / an `admins/{uid}` doc. Keep a single `ADMIN_EMAIL`/UID constant in one file. Optionally turn off public sign-up (see B7).

### [x] C3. Stored XSS in the admin panel
> STATUS (2026-10-26): DONE: admin builds every card with `textContent`, and there are no inline `onclick`s. Tested with an `<img onerror>` payload.
- **Where:** `admin.js:72-99`. Customer-typed text goes straight into `innerHTML` and inline `onclick="..."`.
- **Problem:** a "customer" can type `<img src=x onerror=...>` into any form. When the admin opens the dashboard, that script runs **as the admin**, and it can read or delete all data.
- **Fix:** build cards with `textContent`/`createElement` (or escape every value), and use `addEventListener` instead of inline `onclick` strings.

### [x] C4. Customer phone numbers and names need protecting
> STATUS (2026-10-26): DONE: rules + privacy line under the forms.
- **Problem:** stock inquiries store name + phone. With loose rules (or C2 exploited), anyone can download them.
- **Fix:** covered by C1 + C2. Also add a short privacy line under the forms ("We only use your number to reply about your request").

### [~] C5. Spam and abuse on the public forms
> STATUS (2026-10-26): MOSTLY DONE: rules validation, honeypot field, reviews need approval. **Left:** App Check (needs a reCAPTCHA site key from you).
- **Problem:** the forms have no limits. A bot can fill Firestore with junk (and run up quota) or post fake reviews that show publicly once B1 is done.
- **Fix:**
  - Rules-side validation (max lengths, required fields).
  - Reviews go into a `pending` state and the admin approves them.
  - Enable **Firebase App Check** (reCAPTCHA v3/Enterprise) for Firestore.
  - Add a hidden honeypot field to each form.

### [~] C6. Repo hygiene: personal data and junk files are committed (repo is **public**)
> STATUS (2026-10-26): MOSTLY DONE: `.gitignore` added; log, `.DS_Store` and lockfile stub removed. **Left:** restrict the API key (README step 5). The log still exists in old git history.
- `firebase-debug.log` contains your personal email and local file paths. Remove it from git.
- `.DS_Store` is committed.
- There's no `.gitignore`. Add one: `*.log`, `.DS_Store`, `node_modules/`, `.firebase/`.
- `package-lock.json` is an empty stub with no `package.json`. Delete it.
- **API key:** Firebase web keys are meant to be public, but in Google Cloud Console → Credentials, **restrict the key to your website's domains** (HTTP referrers).

### [x] C7. Unused Firebase Data Connect template (movie-review sample)
> STATUS (2026-10-26): DONE: `dataconnect/` deleted.
- **Where:** `dataconnect/` (schema has `Movie`, `Review` with movies, seed data with movie titles).
- **Problem:** this is the Firebase starter template, and the site doesn't use it at all. If it ever gets deployed, it provisions **Cloud SQL (Postgres)**, which costs money.
- **Fix:** delete the `dataconnect/` folder.
