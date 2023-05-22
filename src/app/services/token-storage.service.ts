import { Injectable } from '@angular/core';

const TOKEN_KEY =  "auth-token";
const USER_ID_KEY =  "user";

@Injectable({
  providedIn: 'root'
})

export class TokenStorageService {
  constructor() { }

  public setToken(token: string){
    window.localStorage.setItem(TOKEN_KEY, token);
  }
  public setUser(user: any){
    window.localStorage.setItem(USER_ID_KEY, JSON.stringify(user));
  }
  public getToken(){
    return window.localStorage.getItem(TOKEN_KEY);
  }
  public getUser(){
    const user =  window.localStorage.getItem(USER_ID_KEY) ;
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
  public removeUser(){
    window.localStorage.removeItem(USER_ID_KEY);
  }
  public removeToken(){
    window.localStorage.removeItem(TOKEN_KEY);
  }
  public isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }
  public isSeller(): boolean {
    if(this.getUser().type === "seller"){
      return true;
    }
      return false;
  }
}
