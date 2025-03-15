import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../environment/environments';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClient: HttpClient) {}
  private readonly pLATFORM_ID = inject(PLATFORM_ID);

  // getToken(): string | null {
  //   if (isPlatformBrowser(this.pLATFORM_ID)) {
  //     return localStorage.getItem('token');
  //   } else {
  //     return null;
  //   }
  // }

  checkoutSession(
    cartId: string,
    details: string,
    phone: string,
    city: string
  ): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=https://trendify-ecommerce-delta.vercel.app`,
      {
        shippingAddress: {
          details: details,
          phone: phone,
          city: city,
        },
      }
    );
  }

  createCashOrder(
    cartId: string,
    details: string,
    phone: string,
    city: string
  ): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/api/v1/orders/${cartId}`,
      {
        shippingAddress: {
          details: details,
          phone: phone,
          city: city,
        },
      }
    );
  }

  getUserOrders(userId: string): Observable<any> {
    return this.httpClient.get(
      `${environment.baseUrl}/api/v1/orders/user/${userId}`
    );
  }
}
