import { inject, Inject, PLATFORM_ID } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const pLATFORM_ID = inject(PLATFORM_ID);
  if (isPlatformBrowser(pLATFORM_ID)) {
    if (localStorage.getItem('token')) {
      if (
        req.url.includes('auth') ||
        req.url.includes('wishlist') ||
        req.url.includes('addresses') ||
        req.url.includes('cart') ||
        req.url.includes('orders')
      ) {
        req = req.clone({
          setHeaders: {
            token: localStorage.getItem('token')!,
          },
        });
      }
    }
  }
  return next(req);
};
