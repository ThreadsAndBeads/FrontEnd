import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

const TOKEN_ACCESS_KEY = 'Authorization'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private token: TokenStorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authRequest = request;
    const token = this.token.getToken();
    if(token != null) {
      authRequest = request.clone({
        headers: request.headers.set(TOKEN_ACCESS_KEY, 'Bearer ' + token),
      });
    }
    return next.handle(authRequest);
  }
  
}
