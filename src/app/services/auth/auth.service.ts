import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { TokenStorageService } from '../token/token-storage.service';
import { environment } from 'src/environments/environment';

// const BASEURL = 'http://localhost:7000/api/v1/users';
declare const FB: any;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl;
  BASEURL = this.apiUrl + '/api/v1/users';
  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService) { }

  login(userData: any): Observable<any> {
    console.log(this.BASEURL);
    return this.http.post(`${this.BASEURL}/login`, userData)
  }

  signup(userData: any): Observable<any> {
    return this.http.post(`${this.BASEURL}/signup`, userData)
  }
  logOut(): Observable<any> {
    this.tokenStorage.removeUser();
    this.tokenStorage.removeToken();
    return this.http.get(`${this.BASEURL}/logout`)
  }
  requestReset(body: FormData): Observable<any> {
    return this.http.post(`${this.BASEURL}/forgotPassword`, body);
  }
  updateProfile(body: any,userID: any) {
    return this.http.patch(`${this.BASEURL}/${userID}`, body);
  }
  getUserByID(userID: any): Observable<any>  {
    return this.http.get(`${this.BASEURL}/${userID}`);
  }
  uploadImage(image: FormData, userID: any) {
    return this.http.patch(`${this.BASEURL}/${userID}`,image);
  }
  newPassword(body: any,token:string): Observable<any> {
    return this.http.patch(`${this.BASEURL}/resetPassword/${token}`, body);
  }
  ValidPasswordToken(body:string): Observable<any> {
    return this.http.post(`${this.BASEURL}/valid-password-token`, body);
  }
  fbLogin() {
    return this.http.get(`${this.BASEURL}/facebook`);
  }
  googleLogin(socialData:any){
    return this.http.post(`${this.BASEURL}/google`,socialData);
  }
}
