import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Cart } from 'src/app/model/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private BASE_URL = 'http://localhost:7000/api/v1/cart';
  public cartUpdatedSubject: Subject<void> = new Subject<void>();
  public cartUpdated$: Observable<void> =
    this.cartUpdatedSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

  public getCartProducts(): Observable<any> {
    const url = `${this.BASE_URL}/`;
    return this.httpClient.get<any>(url);
  }

  public deleteProduct(productId: any): Observable<any> {
    const url = `${this.BASE_URL}/${productId}`;
    return this.httpClient.delete<any>(url, productId);
  }

  public clearCart(): Observable<any> {
    const url = `${this.BASE_URL}/`;
    return this.httpClient.delete<any>(url);
  }

  public editProduct(data: any): Observable<any> {
    const url = `${this.BASE_URL}/${data.productId._id}`;
    return this.httpClient.patch<any>(url, data);
  }

  public getProductsCount(): Observable<any> {
    const url = `${this.BASE_URL}/count`;
    return this.httpClient.get<any>(url);
  }

  public addToCart(data: any): Observable<any> {
    const url = `${this.BASE_URL}`;
    return this.httpClient.post<any>(url, data);
  }
}
