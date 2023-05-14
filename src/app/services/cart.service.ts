import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from 'src/app/model/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private BASE_URL = 'http://localhost:7000/api/v1/cart';
  public cartProducts!: Cart['products'];
  public cartNotEmpty: boolean = false;

  constructor(private httpClient: HttpClient) {}

  public getCartProducts() {
    const url = `${this.BASE_URL}/`;
    return this.httpClient.get<any>(url);
  }

  public deleteProduct(productId: any) {
    const url = `${this.BASE_URL}/${productId}`;
    return this.httpClient.delete<any>(url, productId);
  }

  public clearCart() {
    const url = `${this.BASE_URL}/`;
    return this.httpClient.delete<any>(url);
  }

  public editProduct(data: any) {
    const url = `${this.BASE_URL}/${data.productId._id}`;
    return this.httpClient.patch<any>(url, data);
  }

  public getProductsCount() {
    const url = `${this.BASE_URL}/count`;
    return this.httpClient.get<any>(url);
  }
}
