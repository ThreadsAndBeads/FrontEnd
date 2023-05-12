import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private _cache: Map<
    string,
    {
      response: HttpResponse<any>;
    }
  > = new Map();

  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.method !== 'GET') {
      return next.handle(request);
    }

    const cachedResponse = this._cache.get(request.url);


    return cachedResponse
      ? of(cachedResponse.response)
      : this._sendRequest(request, next);
  }

  private _sendRequest(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const cachedResponse = this._cache.get(request.url);
    console.log(request.url);
    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          if (!cachedResponse || !this._isResponseEqual(event, cachedResponse.response)) {
            this._cache.set(request.url, {
              response: event,
            });
          }
        }
      })
    );
  }

  private _isResponseEqual(
    response1: HttpResponse<any>,
    response2: HttpResponse<any>
  ): boolean {
    if (response1.status !== response2.status) {
      return false;
    }

    const keys1 = response1.headers.keys();
    const keys2 = response2.headers.keys();

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      if (response1.headers.get(key) !== response2.headers.get(key)) {
        return false;
      }
    }

    return JSON.stringify(response1.body) === JSON.stringify(response2.body);
  }
}
