# E-Commerce Archive

This directory contains the original bymoe.in e-commerce frontend code,
archived on 2026-08-27 during the transformation to a personal brand site.

**Nothing here is deleted.** All components, routes, data, and assets are
preserved intact. To reactivate e-commerce functionality:

1. Restore `components/` back to the main `components/` directory
2. Restore `lib/` files (`products.ts`, `categories.ts`, `whatsapp.ts`) to `lib/`
3. Restore `store/cartStore.ts` to `store/`
4. Restore route directories from `routes/` back into `app/`
5. Restore `public-products/products/` back to `public/products/`
6. Re-add e-commerce imports to `app/layout.tsx` (Navbar, CartDrawer, BottomNav, WhatsAppFAB, footer)

## Archived Structure

```
_archive/
├── components/       ← Navbar, CartDrawer, ProductCard, CategoryCard, etc.
├── store/            ← Zustand cart store with localStorage persist
├── lib/              ← Product catalog (87+ items), categories, WhatsApp checkout
├── scripts/          ← Product image download & update scripts
├── routes/           ← All e-commerce route pages (cart, categories, product, etc.)
└── public-products/  ← Product photography assets
```
