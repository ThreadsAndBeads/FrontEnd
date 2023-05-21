import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FavouriteService {
  private BASE_URL = 'http://localhost:7000/api/v1/favourites';
  public favoritesUpdatedSubject: Subject<void> = new Subject<void>();
  public favoritesUpdated$: Observable<void> = this.favoritesUpdatedSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

  public getFavouritesProducts(): Observable<any> {
    const url = `${this.BASE_URL}/`;
    return this.httpClient.get<any>(url);
  }

  public getFavouritesProductsCount(): Observable<any> {
    const url = `${this.BASE_URL}/getTotal/`;
    return this.httpClient.get<any>(url);
  }

  public deleteProduct(productId: any): Observable<any> {
    const url = `${this.BASE_URL}/${productId}`;
    return this.httpClient.delete<any>(url);
  }

  public clearFavourite(): Observable<any> {
    const url = `${this.BASE_URL}/`;
    return this.httpClient.delete<any>(url);
  }

  public addToFavourite(data: any): Observable<any> {
    const url = `${this.BASE_URL}/`;
    return this.httpClient.post(url, data);
  }
}
