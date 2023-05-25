import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class TokenStorageService {
  constructor() { }
  private TOKEN_KEY = 'threadAndBeads_token_' ;
  private USER_ID_KEY = 'threadAndBeads_user_id_' ;

  public setToken(token: string): void {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  public setUser(user: any): void {
    sessionStorage.setItem(this.USER_ID_KEY, JSON.stringify(user));
  }

  public getToken(): any {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  public getUser(): any {
    const user = sessionStorage.getItem(this.USER_ID_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  public removeUser(): void {
    sessionStorage.removeItem(this.USER_ID_KEY);
  }

  public removeToken(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }
  public isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }
  public isSeller(): boolean {
    if(this.isLoggedIn())
    if(this.getUser().type === "seller"){
      return true;
    }
      return false;
  }
}
