import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FavouriteService {
  apiUrl = environment.apiUrl;
  BASE_URL = this.apiUrl + '/api/v1/favourites';
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

  public isInFavourite(productId: any): Observable<any> {
    const url = `${this.BASE_URL}/${productId}/`;
    return this.httpClient.get<any>(url);
  }
}
