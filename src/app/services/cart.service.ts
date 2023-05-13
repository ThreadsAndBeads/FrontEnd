import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private BASE_URL = 'http://localhost:7000/api/v1/cart';
  private USER_ID = '1';

  constructor(
    private httpClient: HttpClient,
    private tokenStorage: TokenStorageService
  ) {
    this.USER_ID = this.tokenStorage.getUser()._id;
  }

  public getCartProducts() {
    const url = `${this.BASE_URL}/${this.USER_ID}/showcart`;
    return this.httpClient.get<any>(url);
  }

  public deleteProduct(productId:any) {
    const url = `${this.BASE_URL}/${productId}/deleteproduct`;
  }

  public clearCart() {
    const url = `${this.BASE_URL}/${this.USER_ID}/clear`;
    return this.httpClient.post<any>(url, this.USER_ID);
  }

  public editProduct(data:any){
    const url = `${this.BASE_URL}/`;
    // data['userId'] = this.USER_ID;
    return this.httpClient.post<any>(url, data);
  }
}
