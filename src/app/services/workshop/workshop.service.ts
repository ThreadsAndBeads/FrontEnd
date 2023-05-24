import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Workshop } from '../../model/workshop.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorkshopService {
  private BASE_URL = 'http://localhost:7000/api/v1/workshops';

  constructor(private httpClient: HttpClient) { }
  public getAllWorkshops(page:number,limit:number) {
    return this.httpClient.get<any>(`${this.BASE_URL}/?page=${page}&limit=${limit}`);
  }


  public getSellerWorkshops(page:number,limit:number,user_id: any) {
    const url = `${this.BASE_URL}/?page=${page}&limit=${limit}&seller_id=${user_id}`;
    return this.httpClient.get<any>(url);
  }
  public addWorkshop(workshop: FormData) {
    return this.httpClient.post<Workshop>(`${this.BASE_URL}/`, workshop);
  }
  public deleteWorkshop(workshop_id: any) {
    const url = `${this.BASE_URL}/${workshop_id}`;
    return this.httpClient.delete<any>(url);
  }
  public getWorkshopById(workshop_id: any): Observable<Workshop> {
    const url = `${this.BASE_URL}/${workshop_id}`;
    return this.httpClient.get<Workshop>(url);
  }
  public updateWorkshop(workshop_id: any, workshop: FormData): Observable<Workshop> {
    const url = `${this.BASE_URL}/${workshop_id}`;
    return this.httpClient.patch<Workshop>(url, workshop);
  }
  public sendWorkshopEmail(body: any) {
    return this.httpClient.post<Workshop>(`${this.BASE_URL}/sendEmail`, body);
  }
}





