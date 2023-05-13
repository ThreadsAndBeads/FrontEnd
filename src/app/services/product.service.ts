import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: Product[] = [];

  private BASE_URL = 'http://localhost:7000/api/v1/products';

  constructor(private httpClient: HttpClient) {}
  
  public addProduct(product: FormData) {
    return this.httpClient.post<Product>(`${this.BASE_URL}/`, product);
  }

  public getTopDiscountedProduct() {
    const url = `${this.BASE_URL}/discountedproducts`;
    return this.httpClient.get<Product[]>(url);
  }

  public getAllProducts(page:number,limit:number) {
    const url = `${this.BASE_URL}/?page=${page}&limit=${limit}`;
    return this.httpClient.get<any>(url);
  }

  public addToCart( data: any): Observable<Product[]> {
    const url = `http://localhost:7000/api/v1/cart`;
    return this.httpClient.post<Product[]>(url, data);
  }
}










