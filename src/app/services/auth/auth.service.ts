import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { TokenStorageService } from '../token/token-storage.service';

const BASEURL = 'http://localhost:7000/api/v1/users';
declare const FB: any;
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService) { }

  login(userData: any): Observable<any> {
    return this.http.post(`${BASEURL}/login`, userData)
  }

  signup(userData: any): Observable<any> {
    return this.http.post(`${BASEURL}/signup`, userData)
  }
  logOut(): Observable<any> {
    this.tokenStorage.removeUser();
    this.tokenStorage.removeToken();
    return this.http.get(`${BASEURL}/logout`)
  }
  requestReset(body: FormData): Observable<any> {
    return this.http.post(`${BASEURL}/forgotPassword`, body);
  }
  updateProfile(body: any,userID: any) {
    return this.http.patch(`${BASEURL}/${userID}`, body);
  }
  getUserByID(userID: any): Observable<any>  {
    return this.http.get(`${BASEURL}/${userID}`);
  }
  uploadImage(image: FormData, userID: any) {
    return this.http.patch(`${BASEURL}/${userID}`,image);
  }
  newPassword(body: any,token:string): Observable<any> {
    return this.http.patch(`${BASEURL}/resetPassword/${token}`, body);
  }
  ValidPasswordToken(body:string): Observable<any> {
    return this.http.post(`${BASEURL}/valid-password-token`, body);
  }
  fbLogin() {
    return this.http.get(`${BASEURL}/facebook`);
  }
  googleLogin(socialData:any){
    return this.http.post(`${BASEURL}/google`,socialData);
  }
}