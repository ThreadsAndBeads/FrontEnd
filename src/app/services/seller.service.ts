import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Seller } from '../model/seller.model';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  sellers: Seller[] = [];

  private BASE_URL = 'http://localhost:7000/api/v1/users/sellers';

  constructor(private httpClient: HttpClient) {}

  public getAllSellers(page:number,limit:number) {
    const url = `${this.BASE_URL}/?page=${page}&limit=${limit}`;
    return this.httpClient.get<any>(url);
  }
  public getTopSellers(): Observable<Seller[]> {
    const url = `http://localhost:7000/api/v1/users/top-sellers`;
    return this.httpClient.get<any[]>(url);
  }

  public getSellerStatistics(sellerId:any){
    const url = `http://localhost:7000/api/v1/users/revenue/${sellerId}`;
    return this.httpClient.get<any>(url);
  }
}
