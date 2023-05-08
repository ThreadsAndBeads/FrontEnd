import { Injectable } from '@angular/core';

const TOKEN_KEY =  "auth-token";

@Injectable({
  providedIn: 'root'
})

export class TokenStorageService {
  constructor() { }

  public setToken(token: string){
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(){
    return window.localStorage.getItem(TOKEN_KEY);
  }

  public removeToken(){
    window.localStorage.removeItem(TOKEN_KEY);
  }
}
