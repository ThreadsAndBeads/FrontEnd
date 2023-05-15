import { Injectable } from '@angular/core';
import { Order } from '../model/order.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private BASE_URL = 'http://localhost:7000/api/v1/order';
  constructor(private httpClient: HttpClient) { }

  public createOrder(order: any) {
    return this.httpClient.post<Order>(`${this.BASE_URL}/createOrder`, order);
  }

}
