import { HttpClient } from '@angular/common/http';
import {
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environments';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // userToken: any = localStorage.getItem('token');
  cartNumber: WritableSignal<number> = signal(0);

  private readonly pLATFORM_ID = inject(PLATFORM_ID);

  // getToken(): string | null {
  //   if (isPlatformBrowser(this.pLATFORM_ID)) {
  //     return localStorage.getItem('token');
  //   } else {
  //     return null;
  //   }
  // }

  constructor(private httpClient: HttpClient) {}

  addProductToCart(id: string): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/cart`, {
      productId: id,
    });
  }

  getUserCart(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/cart`);
  }

  updateCartProductQuantity(cartId: string, count: number): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/api/v1/cart/${cartId}`, {
      count: count,
    });
  }

  removeSpecificCartItem(cartid: string): Observable<any> {
    return this.httpClient.delete(
      `${environment.baseUrl}/api/v1/cart/${cartid}`
    );
  }

  clearUserCart(): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart`);
  }
}
