import { provideServerRendering } from '@angular/platform-server';
import { RenderMode } from '@angular/ssr';
import { Routes } from '@angular/router';
import { toLoginGuard } from './core/guards/to-login.guard.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home/home.component').then((c) => c.HomeComponent),
    title: 'Home',
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./pages/products/products/products.component').then(
        (c) => c.ProductsComponent
      ),
    title: 'Products',
  },
  {
    path: 'aboutus',
    loadComponent: () =>
      import('./pages/aboutUs/about-us/about-us.component').then(
        (c) => c.AboutUsComponent
      ),
    title: 'About Us',
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('./pages/blog/blog/blog.component').then((c) => c.BlogComponent),
    title: 'Blog',
  },
  {
    path: 'contactus',
    loadComponent: () =>
      import('./pages/contactUs/contact-us/contact-us.component').then(
        (c) => c.ContactUsComponent
      ),
    title: 'Contact Us',
  },
  {
    path: 'details/:id',
    loadComponent: () =>
      import('./pages/details/details/details.component').then(
        (c) => c.DetailsComponent
      ),
    title: 'Details',
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./pages/cart/cart/cart.component').then((c) => c.CartComponent),
    title: 'Cart',
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./pages/checkout/checkout/checkout.component').then(
        (c) => c.CheckoutComponent
      ),
    title: 'Checkout',
  },
  {
    path: 'allorders',
    loadComponent: () =>
      import('./pages/allorders/allorders/allorders.component').then(
        (c) => c.AllordersComponent
      ),
    title: 'All Orders',
  },
  {
    path: 'wishlist',
    loadComponent: () =>
      import('./pages/wishlist/wishlist/wishlist.component').then(
        (c) => c.WishlistComponent
      ),
    title: 'Wishlist',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login/login.component').then(
        (c) => c.LoginComponent
      ),
    title: 'Login',
    canActivate: [toLoginGuard],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register/register.component').then(
        (c) => c.RegisterComponent
      ),
    title: 'Register',
    canActivate: [toLoginGuard],
  },
  {
    path: 'forgotpassword',
    loadComponent: () =>
      import(
        './pages/forgotpassword/forgotpassword/forgotpassword.component'
      ).then((c) => c.ForgotpasswordComponent),
    title: 'Forgot Password',
    canActivate: [toLoginGuard],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/notfound/notfound/notfound.component').then(
        (c) => c.NotfoundComponent
      ),
    title: 'Not Found',
  },
];
