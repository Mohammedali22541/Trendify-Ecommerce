# Trendify Ecommerce

Trendify Ecommerce is an Angular 19 SSR storefront that connects to the RouteMisr ecommerce API to deliver a modern shopping experience with authentication, cart, checkout, and order tracking.

## Features
- Product catalog with categories and brands
- Product details and category filtering
- Cart management (add, update quantity, remove, clear)
- Wishlist management
- Authentication (register, login, forgot/reset password)
- Checkout (cash orders and online checkout session)
- Address management and order history
- Blog, About Us, and Contact Us pages
- Server-side rendering for improved SEO and performance

## Tech Stack
- Angular 19 + TypeScript
- Angular SSR
- RxJS
- Tailwind CSS + Flowbite
- Font Awesome
- ngx-owl-carousel-o, ngx-toastr, ngx-spinner

## Getting Started
### Prerequisites
- Node.js 18.19+ or 20.11+ and npm
- Angular CLI (optional, but helpful)

### Install & Run
```bash
npm install
npm start
```
After the dev server starts, open `http://localhost:4200`.

### SSR Build & Serve
```bash
npm run build
npm run serve:ssr:E-Commerce
```

## Available Scripts
| Script | Description |
| --- | --- |
| `npm start` | Start the development server |
| `npm run build` | Production build (SSR output) |
| `npm run watch` | Development build in watch mode |
| `npm test` | Run unit tests (Karma + Jasmine) |
| `npm run serve:ssr:E-Commerce` | Serve the SSR build |

## Configuration
- API base URL is set in `src/app/core/environment/environments.ts`. Update `baseUrl` to point at your API.
- Checkout success URL is configured in `src/app/core/services/order/order.service.ts`. Update it to match your deployment domain.

## Project Structure
- `src/app/core` – environment, guards, interceptors, services
- `src/app/pages` – main feature pages (home, products, cart, checkout, auth, etc.)
- `src/app/shared` – reusable components, pipes, interfaces
- `src/app/layouts` – navbar and footer
- `src/server.ts` – SSR server entry

## API
This project uses the RouteMisr ecommerce API:
`https://ecommerce.routemisr.com/api/v1`

## License
ISC
