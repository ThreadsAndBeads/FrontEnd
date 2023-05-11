import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkshopService {
  private BASE_URL = 'http://localhost:7000/api/v1/workshops/';

  constructor(private httpClient: HttpClient) { }
  public getAllWorkshops() {
    return this.httpClient.get<any>(this.BASE_URL);
  }
}
