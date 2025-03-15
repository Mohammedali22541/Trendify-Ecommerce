import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environment/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpecificService {
  constructor(private httpClient: HttpClient) {}

  getspicificProductCategoryW(): Observable<any> {
    return this.httpClient.get(
      `${environment.baseUrl}/api/v1/products?category[in]=6439d58a0049ad0b52b9003f`
    );
  }

  getspicificProductCategoryM(): Observable<any> {
    return this.httpClient.get(
      `${environment.baseUrl}/api/v1/products?category[in]=6439d5b90049ad0b52b90048`
    );
  }

  getspicificProductCategoryELC(): Observable<any> {
    return this.httpClient.get(
      `${environment.baseUrl}/api/v1/products?category[in]=6439d2d167d9aa4ca970649f`
    );
  }
}
