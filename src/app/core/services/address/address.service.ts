import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environments';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private httpClient: HttpClient) {}
  private readonly pLATFORM_ID = inject(PLATFORM_ID);

  // userToken: any = localStorage.getItem('token');

  // getToken(): string | null {
  //   if (isPlatformBrowser(this.pLATFORM_ID)) {
  //     return localStorage.getItem('token');
  //   } else {
  //     return null;
  //   }
  // }

  addAddress(data: object): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/api/v1/addresses`,

      data
    );
  }

  getUserAddress(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/addresses`);
  }

  removeAddress(id: string): Observable<any> {
    return this.httpClient.delete(
      `${environment.baseUrl}/api/v1/addresses/${id}`
    );
  }
}
