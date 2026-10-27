# 02: Broken / Half-Working Features

Verified by reading the code and running the site locally.

---

### [x] B1. Reviews never show on the homepage
> STATUS (2026-10-26): DONE: loads the 6 newest approved reviews.
- **Where:** `index.html:185` shows "Loading reviews...". `script.js` has **no code that loads reviews**.
- **Result:** the text says "Loading reviews..." forever.
- **Fix:** query approved reviews (newest first, limit ~6) and render them as cards with name, stars, text and date. Show "Be the first to review!" when there are none.

### [x] B2. Arrival time is never saved
> STATUS (2026-10-26): DONE: arrival date + time saved.
- **Where:** `script.js:180-188`. Fields are collected only if they have a `placeholder` or `name`. `<input type="time">` (`index.html:167`) has neither, so it's **skipped**.
- **Result:** the admin sees `Coming at: N/A` for every arrival (`admin.js:79` reads `data.field`, which never exists).
- **Fix:** see B4 (proper `name` attributes on every field).

### [x] B3. Review star rating is never saved
> STATUS (2026-10-26): DONE: rating saved as a number 1–5.
- **Where:** same bug. The `<select>` in `index.html:235` has no placeholder or name.
- **Result:** the admin sees `Rating: N/A Stars`.

### [x] B4. Form data is keyed by placeholder text (root cause of B2/B3 and more)
> STATUS (2026-10-26): DONE: named fields, `serverTimestamp()`, admin reads new + old field names.
- **Where:** `script.js:178-188` turns placeholders into keys like `any_specific_details_brand_color_etc__`. `admin.js` then hardcodes those keys.
- **Problem:** changing any placeholder wording silently breaks the admin panel.
- **Fix:** give every input a `name` (`item`, `name`, `phone`, `details`, `arrivalTime`, `rating`, `message`). Write clean objects per form. Update `admin.js` to match. Use `serverTimestamp()` instead of `new Date()`.

### [x] B5. The shop can't contact customers back
> STATUS (2026-10-26): DONE: name + phone on every form; admin has WhatsApp + Call buttons.
- **New Item Request** collects **no name and no phone** (`index.html:154-158`), so the shop has no way to reply.
- **I'm Coming Soon** collects no phone.
- **Reply button** (`admin.js:74, 96`) opens `mailto:?` with **no recipient**, because customers never give an email. For requests and arrivals, `replyInfo` is empty, so "Reply" just reloads the page.
- **Fix:** add name + phone to every form. Make "Reply" open **WhatsApp** (`https://wa.me/977XXXXXXXXXX?text=...`) and add a **Call** button (`tel:`).

### [x] B6. No navigation on mobile
> STATUS (2026-10-26): DONE: hamburger menu, tested at 375px.
- **Where:** `style.css:439-443` hides `.nav-links` under 768px. The hamburger button stays `display:none`, has no CSS for its 3 spans, and has no JS.
- **Result:** phone users (most of your customers) get **no menu and no Login link**. Confirmed at 375px width.
- **Fix:** show the hamburger on mobile, style it, and toggle a slide-down menu. Close the menu on link click.

### [x] B7. Customer accounts do nothing
> STATUS (2026-10-26): DONE (option a): login is staff-only, sign-up removed.
- `login.html` invites sign-up "to track your requests", but no such feature exists. Forms don't save the user's ID, and there's no "My Requests" page.
- **Decide (Overview Q6):** either **(a)** remove customer sign-up and keep login admin-only, or **(b)** build "My Requests" (save `uid` on submit, list the user's own requests with status).

### [x] B8. Login error messages are outdated
> STATUS (2026-10-26): DONE: new error codes, forgot password, button disabled while loading.
- **Where:** `login.js:66-67`. Newer Firebase returns `auth/invalid-credential` instead of `wrong-password`/`user-not-found`, so users always see the generic "Authentication failed."
- **Also:** there's no "Forgot password?" link (`sendPasswordResetEmail`), and the button isn't disabled while processing (double submits are possible).

### [~] B9. Admin panel issues
> STATUS (2026-10-26): MOSTLY DONE: no flash before the auth check, newest first, New/Done status, pending counts, review Approve/Hide. **Left:** live updates (I30).
- The dashboard is visible **before** the auth check finishes (`admin.html:174` `style="display:block"`), so non-admins briefly see it. There's also dead `#loginOverlay` CSS.
- Records are **unsorted**. Add `orderBy('timestamp','desc')`.
- No status tracking (New → Replied → Done). The only option is Delete, which is permanent.
- No counts or badges for new items.
- No review approve/hide (needed for C5).

### [x] B10. "Contact" nav link goes nowhere
> STATUS (2026-10-26): DONE.
- **Where:** `index.html:33` links `#footer`, but the footer's id is `contact` (`index.html:191`).

### [x] B11. Modal and gallery behaviour
> STATUS (2026-10-26): MOSTLY DONE: Esc closes, background scroll locked, no raw path shown. Lightbox added in Sprint 2.
- The `Esc` key doesn't close modals, and the page behind still scrolls.
- You can't click a gallery photo to view it larger (no lightbox).
- `books/book_1.png` is missing (the list starts at `book_2`). Fine if intentional.
- The error fallback shows the raw file path to customers (`script.js:124`).

### [x] B12. Small inconsistencies
> STATUS (2026-10-26): DONE: hero copy, "Opening Hours" label, auto year, duplicate script tag removed. Shop hours still need your answer (Overview Q4).
- The hero says **"Order online, pick up in-store"**, but there's no ordering. Reword it, or build ordering.
- "Open Daily" + "(Closed Sun)" contradict each other (and see Overview Q4).
- Footer says **© 2024**. Make it automatic or set it to the current year.
- `firebase-config.js` is loaded twice (`index.html:249` and via import). It's harmless, but the extra tag can go.
