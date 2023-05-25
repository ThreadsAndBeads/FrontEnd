import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = environment.apiUrl;
  BASEURL = this.apiUrl + '/api/v1/users';
  constructor(private http: HttpClient) { }

  getSellerNotifications(sellerId: string): Observable<any> {
    const url = `${this.BASEURL}/notification/${sellerId}`;
    return this.http.get<any>(url);
  }
}
