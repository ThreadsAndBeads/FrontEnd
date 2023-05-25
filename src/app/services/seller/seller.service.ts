import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Seller } from '../../model/seller.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  sellers: Seller[] = [];

  apiUrl = environment.apiUrl;
  BASE_URL = this.apiUrl + '/api/v1/users';

  constructor(private httpClient: HttpClient) {}

  public getAllSellers(page:number,limit:number) {
    const url = `${this.BASE_URL}/sellers/?page=${page}&limit=${limit}`;
    return this.httpClient.get<any>(url);
  }
  public getTopSellers(): Observable<Seller[]> {
    const url = `${this.BASE_URL}/top-sellers`;
    return this.httpClient.get<any[]>(url);
  }

  public getSellerStatistics(sellerId:any){
    const url = `${this.BASE_URL}/revenue/${sellerId}`;
    return this.httpClient.get<any>(url);
  }
}
