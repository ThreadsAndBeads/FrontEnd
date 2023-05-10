import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private BASE_URL = 'http://localhost:7000/api/v1/products/';

  constructor( private httpClient : HttpClient) { }
  public addProduct(product:FormData){
    return this.httpClient.post<Product>("http://localhost:7000/api/v1/products/",product);
  }

  public getTopDiscountedProduct(priceDiscount: number){
    const url = `${this.BASE_URL}discountedproducts`;
    return this.httpClient.get<Product[]>(url);
  }
}
