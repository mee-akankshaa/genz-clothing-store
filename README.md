# Drip Lab: a Gen Z clothing store front-end

Drip Lab is a loud, high-contrast streetwear storefront built with Next.js, React and Tailwind. The label is fictional, the catalogue is local, and the checkout is a mock, but the shopping flow works end to end.

## Objective

I wanted a portfolio piece that goes past a static landing page: a real shopping flow (browse, filter, pick a size, cart, checkout) with state, routing and accessibility handled properly, and a visual identity that suits a Gen Z audience instead of the usual clean-and-beige template.

## Features

- Home page with hero, scrolling promo strip, a featured drop and category tiles
- `/shop` with category filter, size filter, price sort and text search, all stored in the URL so views are shareable
- `/product/[slug]` pages with colour and size pickers, add to cart and related products
- Cart page with quantity editing, remove, subtotal, shipping rule (free over $100) and total
- Mock checkout that validates every field and shows an order-confirmed screen; nothing is sent anywhere
- Wishlist saved in localStorage
- Dark mode (follows system preference, with a manual toggle)
- Sticker-style badges, big type, hard shadows, responsive grid
- Accessibility: skip link, labelled form fields, `aria-live` feedback, focus rings, 44px touch targets, reduced-motion support

## Tech stack

| Area | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| UI | React 18 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 3 |
| Data | Typed local catalogue in `lib/products.ts` |
| State | React Context + localStorage |
| Imagery | Generated SVG art, no external images |

## Workflow

1. **Planning:** listed the user journeys (discover, filter, decide, buy) and cut anything that needs a server.
2. **Wireframes and design tokens:** sketched the pages on paper, then set tokens in `tailwind.config.ts`: volt green, hot pink, grape, ink and paper, an impact-style display font, and hard offset shadows.
3. **Data model:** `Product`, `CartItem`, `Category` and `Size` types in `lib/types.ts`; 16 invented products in `lib/products.ts`.
4. **Components:** small, reusable pieces (`ProductCard`, `ProductArt`, `WishlistButton`) composed into page-level views (`ShopClient`, `ProductDetail`, `CartView`, `CheckoutForm`).
5. **State:** `CartContext` and `WishlistContext` own localStorage persistence; the cart stores only slug, size, colour and quantity, and prices are looked up from the catalogue.
6. **Routing:** App Router with a statically generated dynamic route for products.
7. **Testing:** `tsc --noEmit`, a production build, and curl checks against `next start` for the main routes (home, shop with filters, a product page, cart, checkout, wishlist, and a 404 for an unknown slug). A full manual click-through in a browser is still on my to-do list.
8. **Deploy:** it is a static-friendly Next.js app, so any static or Node host works. I have not deployed it.

## How to run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npx tsc --noEmit   # type check
```

Requires Node 18.17 or newer.

## Project structure

```
app/
  layout.tsx, globals.css, page.tsx, not-found.tsx
  shop/ cart/ checkout/ wishlist/
  product/[slug]/page.tsx
components/   Header, Footer, ProductCard, ProductArt, ShopClient,
              ProductDetail, CartView, CheckoutForm, WishlistView, ...
context/      CartContext.tsx, WishlistContext.tsx
lib/          types.ts, products.ts, utils.ts
```

## Challenges I faced and how I solved them

1. **Cart hydration mismatch.** Reading localStorage during the first render makes the client HTML differ from the server HTML. I start with an empty state, load from localStorage in `useEffect`, and expose a `hydrated` flag so the header badge and cart show a neutral state until the real data is in.
2. **Dark mode flash.** Toggling a class in an effect caused a light flash on load. A tiny inline script in `<head>` sets the class before paint, and `suppressHydrationWarning` on `<html>` covers the expected difference.
3. **Dynamic routes with static params.** Product pages use `generateStaticParams` plus `dynamicParams = false`, so all 16 pages are prebuilt and unknown slugs return a real 404.
4. **Filter state in the URL.** I used `useSearchParams` and `router.replace` so filters survive refresh and can be shared. `useSearchParams` forced me to wrap the shop view in `Suspense` for the build to pass. My first search input was keyed on the URL value and lost focus on every keystroke, so it now keeps a local text state synced from the URL.
5. **Image-less product art.** With no photos allowed, I wrote one SVG component that draws a silhouette per category over a gradient, tinted with the selected colour, so the picker visibly changes the product.
6. **Dependency security warning.** `npm install` flagged my first Next.js version as vulnerable, so I moved to the latest patched 14.2 release.

## What I'd improve next

- Real payments (a hosted provider, server-side order creation)
- A backend and database for products, stock and orders
- User accounts and auth, with a wishlist and cart synced across devices
- A CMS for drops and content
- Real product photography, reviews, and automated tests (Playwright for the checkout flow)

## Call to action

If you want to see how it works, run it locally and click around. If it is useful, star the repo. Feedback is welcome, and you can reach me at [mee.akankshaa@gmail.com](mailto:mee.akankshaa@gmail.com).

## Honest note

This is a demo project. Drip Lab is a fictional brand, the checkout is a mock, and no real payment data is collected or sent anywhere. It was built with AI-assisted development (Claude Code), and I reviewed and tested it myself.

## Author and license

Author: Akanksha Dubey. Released under the MIT License (see `LICENSE`).
