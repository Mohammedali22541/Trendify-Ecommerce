import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environments';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/products`);
  }

  getPageTwoProducts(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/products?page=2`);
  }

  getSpecificProduct(id: string | null): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/products/${id}`);
  }

  getCategoryproducts(id: string): Observable<any> {
    return this.httpClient.get(
      `${environment.baseUrl}/api/v1/products?category[in]=${id}`
    );
  }
}
