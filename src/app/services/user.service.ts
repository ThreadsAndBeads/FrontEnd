import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const BASEURL = 'http://localhost:7000/api/v1/users';
@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }

  getSellerNotifications(sellerId: string): Observable<any> {
    const url = `${BASEURL}/notification/${sellerId}`;
    return this.http.get<any>(url);
  }
}
