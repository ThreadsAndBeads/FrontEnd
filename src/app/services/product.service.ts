import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( private httpClient : HttpClient) { }
  public addProduct(product:FormData){
    return this.httpClient.post<Product>("http://localhost:7000/api/v1/products/",product);
  }
}
