import { Injectable } from '@angular/core';

const TOKEN_KEY =  "auth-token";
const USER_ID_KEY =  "user-id";

@Injectable({
  providedIn: 'root'
})

export class TokenStorageService {
  constructor() { }

  public setToken(token: string){
    window.localStorage.setItem(TOKEN_KEY, token);
  }
  public setUserId(id: string){
    window.localStorage.setItem(USER_ID_KEY, id);
  }
  public getToken(){
    return window.localStorage.getItem(TOKEN_KEY);
  }
  public getUserId(){
    return window.localStorage.getItem(USER_ID_KEY) ;
  }

  public removeToken(){
    window.localStorage.removeItem(TOKEN_KEY);
  }
}
