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

  public getAllProducts(page: number, limit: number, filter?: string) {
    let url = `${this.BASE_URL}/?page=${page}&limit=${limit}`;
    if(filter){
      url += `&${filter}`;
    }
    return this.httpClient.get<any>(url);
  }

  public getUserProducts(page: number, limit: number, user_id: any) {
    const url = `${this.BASE_URL}/?page=${page}&limit=${limit}&user_id=${user_id}`;
    return this.httpClient.get<any>(url);
  }

  public deleteProduct(product_id: any) {
    const url = `${this.BASE_URL}/${product_id}`;
    return this.httpClient.delete<any>(url);
  }

  public getAllCategories() {
    const url = `${this.BASE_URL}/categories`;
    return this.httpClient.get(url);
  }
  
  search(query: string) {
    const url = `${this.BASE_URL}/search/?q=${query}`;
    return this.httpClient.get<SearchResult>(url);
  }

  public addToCart(data: any): Observable<Product[]> {
    const url = `http://localhost:7000/api/v1/cart`;
    return this.httpClient.post<Product[]>(url, data);
  }

}

interface SearchResult {
  products: any[];
  workshops: any[];
}

