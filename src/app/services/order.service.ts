import { Injectable } from '@angular/core';
import { Order } from '../model/order.model';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private BASE_URL = 'http://localhost:7000/api/v1/orders';
  seller_orders: any[] = [];
  constructor(private httpClient: HttpClient) { }

  public createOrder(order: any) {
    return this.httpClient.post<Order>(`${this.BASE_URL}/createOrder`, order);
  }
  public getSellerOrder(id:any) {
    return this.httpClient.get(`${this.BASE_URL}/${id}`);
  }

  public manageOrder(order: any){
    return this.httpClient.patch(`${this.BASE_URL}/manageOrder`, order);
  }
}
