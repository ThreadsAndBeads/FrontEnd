import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';

const BASEURL = 'http://localhost:7000/api/v1/users';
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(userData: any): Observable<any> {
    return this.http.post(`${BASEURL}/login`, userData)
  }

  signup(userData: any): Observable<any> {
    return this.http.post(`${BASEURL}/signup`, userData)
  }

  requestReset(body: string): Observable<any> {
    return this.http.post(`${BASEURL}/forgotPassword`, body);
  }

  newPassword(body: string): Observable<any> {
    return this.http.post(`${BASEURL}/resetPassword`, body);
  }
  ValidPasswordToken(body:string): Observable<any> {
    return this.http.post(`${BASEURL}/valid-password-token`, body);
  }
}
