# Catch · Real Seafood · Lubumbashi

One-page animated website for **Catch**, the seafood restaurant and bar inside Complexe La Plage, Route du Golf, Lubumbashi (DR Congo).

Static HTML/CSS/JS with no build step. Open it through any static server, for example:

```bash
python3 -m http.server 5178
```

then visit http://localhost:5178.

## Structure

| Path | What it is |
| --- | --- |
| `index.html` | All sections: preloader, hero, story, signatures, menu, bar, gallery, services, reviews, visit, footer |
| `assets/css/style.css` | Design tokens (colours sampled from the logo), layout, responsive rules |
| `assets/js/menu-data.js` | **The whole food & bar menu** (English + French, USD prices). Edit prices and dishes here |
| `assets/js/main.js` | Smooth scroll, preloader, WebGL water light, bubbles, pinned horizontal scroll, menu tabs, EN/FR toggle, cocktail glass, gallery, lightbox |
| `assets/img/logo.svg`, `logo-white.svg` | Vector logo traced from the official Facebook profile image |
| `assets/img/food`, `assets/img/venue` | Photos from Catch’s own Instagram (@catch_lubumbashi) and Facebook (/Catchcongo), converted to WebP |
| `assets/vendor` | GSAP 3.13 (+ ScrollTrigger, SplitText) and Lenis 1.1.13, served locally |

## Content sources

- Menu: the printed Catch menus (food, bar, wine) photographed at the table. The Pub Bites tab comes from the Legends Bar menu served alongside.
- Address, phone, plus code: Google Maps listing.
- Description details (lake-view terrace, circular aquarium, open 7/7 for lunch and dinner, grilled tilapia): Petit Futé, 2026.
- Tagline, email, services: Catch’s Facebook and Instagram profiles.
- Review quotes: Google Maps (Allan M., Joëlle S.), Tripadvisor (Lisa, 2023), Petit Futé.

## Preview deployment

A preview is published with GitHub Pages from the `catch-lubumbashi` repository. It carries `<meta name="robots" content="noindex, nofollow">` so it stays out of search results; remove that line from `index.html` when the restaurant approves the site.

## Still to confirm with the restaurant

- Exact opening hours (only “7 days, lunch & dinner” is published).
- Current prices, and whether the Legends pub bites should stay on Catch’s site.
- Permission to reuse the social-media photos and review quotes.
- Higher-resolution photos of the seafood dishes (prawns, capitaine, salmon); the signature cards currently use line illustrations where no photo exists.
