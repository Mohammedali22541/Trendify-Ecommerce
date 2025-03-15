import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environments';

@Injectable({
  providedIn: 'root',
})
export class CategoryProductsService {
  constructor(private httpClient: HttpClient) {}

  // getCategoryproducts(id: string): Observable<any> {
  //   return this.httpClient.get(
  //     `${environment.baseUrl}/api/v1/products?category[in]=${id}`
  //   );
  // }
}
