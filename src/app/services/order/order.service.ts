import { Injectable } from '@angular/core';
import { Order } from '../../model/order.model';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../model/product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  apiUrl = environment.apiUrl;
  BASE_URL = this.apiUrl + '/api/v1/orders';
  seller_orders: any[] = [];
  constructor(private httpClient: HttpClient) { }

  public createOrder(order: any) {
    return this.httpClient.post<Order>(`${this.BASE_URL}/`, order);
  }
  public getSellerOrder(id:any) {
    return this.httpClient.get(`${this.BASE_URL}/${id}`);
  }
  public getClientOrder(id:any) {
    return this.httpClient.get(`${this.BASE_URL}/client/${id}`);
  }
  public manageOrder(order: any){
    return this.httpClient.patch(`${this.BASE_URL}/manageOrder`, order);
  }
  public cancelOrder(id:any) {
    return this.httpClient.delete(`${this.BASE_URL}/cancelOrder/${id}`);
  }

}
