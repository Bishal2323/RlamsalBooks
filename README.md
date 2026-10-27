# R. Lamsal Books & Stationery: Website

Website for our family shop on Rastra Bank Rd, Pokhara. It's a plain static site (HTML, CSS and JS) with **no backend, no database and no build step**. Any static host can serve it.

| File | Purpose |
|---|---|
| `index.html` | The whole site: products, "How can we help" forms, reviews, map, contact |
| `products.js` | The product list (edit this to add or change products) |
| `script.js` | Menu, product grid/search, lightbox, forms |
| `style.css` | All styles |
| `assets/img/products/` | Product photos |

Shop details and goals are in [`lamsal.md`](lamsal.md). The work plan is in [`plan/`](plan/).

## How customer messages work
There is no server. When a customer fills in a form ("Do we have it?", "New item request", "I'm coming soon") or taps a product's **WhatsApp** button, the site opens WhatsApp with the message already written, addressed to **+977 98460 55675**. The customer taps send, and the shop replies in WhatsApp. Nothing is stored on the website.

To change the shop's WhatsApp number, edit `WHATSAPP_NUMBER` in `script.js` and the `wa.me/...` links in `index.html`.

Reviews live on the shop's Google Maps listing; the site links there.

## Add or change a product
1. Take a clear photo and shrink it to about 720px wide (on a Mac: `sips -s format jpeg -s formatOptions 62 -Z 720 photo.jpg --out assets/img/products/my-product.jpg`).
2. Add an entry to the `PRODUCTS` list in [`products.js`](products.js): `id`, `category`, `name`, `description`, `image` (and an optional `author` for books).
3. Reload the page. The card, search and filters update automatically.

## Run locally
```bash
python3 -m http.server 5173
```
Then open http://localhost:5173. It must be served over HTTP, because opening the file directly breaks the JS modules.

## Hosting
Upload these files as they are to any static host: GitHub Pages, Netlify, Cloudflare Pages, or regular web hosting. Everything except `plan/`, `README.md` and `lamsal.md` is needed by the site; those three can be left out.
