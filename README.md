# TasteFlow

A modern TypeScript, React, Vite, React Router, and Tailwind CSS web application for a B2B hospitality, tourism, tasting, menu-discovery, and marketing marketplace.

## Included features

- Marketplace discovery for restaurants, hotels, bars, cafés, food brands, beverage brands, tasting organizers, and local hospitality businesses.
- Business registration page.
- Business dashboard with profile management, menus, tasting events, offers, campaigns, QR/event placeholders, analytics, and subscription-ready structure.
- Public business/venue pages.
- Menu discovery pages with dietary tags and pricing.
- Tasting event pages with seat and reservation UI.
- Location discovery map preview component.
- Pricing/subscription page prepared for Stripe integration.
- Internationalization provider with English, Swedish, French, and Spanish sample translations.
- Theme toggle with light/dark mode.
- Mobile-first responsive layout.
- Premium calm hospitality design system using turquoise, green, soft teal, cream, white, and dark slate tones.
- VS Code-friendly config.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Integration notes

This is a complete front-end scaffold with mock data. To make it production-ready, connect:

- Auth/organizations: Clerk, Auth0, Supabase Auth, or similar.
- Billing: Stripe checkout, customer portal, webhooks, plan gating.
- Database: Supabase, Postgres, Firebase, or your preferred backend.
- Maps: Mapbox, Google Maps, or Leaflet.
- Reviews/bookings: API-backed review, reservation, and lead models.
