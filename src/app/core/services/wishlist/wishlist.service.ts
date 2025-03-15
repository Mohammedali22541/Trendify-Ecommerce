import { HttpClient } from '@angular/common/http';
import {
  Injectable,
  PLATFORM_ID,
  OnInit,
  inject,
  WritableSignal,
  signal,
} from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environments';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(private httpClient: HttpClient) {}
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  wishListNumber: WritableSignal<number> = signal(0);

  // getToken(): string | null {
  //   if (isPlatformBrowser(this.pLATFORM_ID)) {
  //     return localStorage.getItem('token');
  //   } else {
  //     return null;
  //   }
  // }

  addToWishList(data: string): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/wishlist`, {
      productId: data,
    });
  }

  getUserWishlist(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/wishlist`);
  }

  deleteProductFromWishlist(prodId: string): Observable<any> {
    return this.httpClient.delete(
      `${environment.baseUrl}/api/v1/wishlist/${prodId}`
    );
  }
}
