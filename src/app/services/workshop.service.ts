import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Workshop } from '../model/workshop.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorkshopService {
  private BASE_URL = 'http://localhost:7000/api/v1/workshops/';

  constructor(private httpClient: HttpClient) { }
  public getAllWorkshops(page:number,limit:number) {
    return this.httpClient.get<any>(`${this.BASE_URL}/?page=${page}&limit=${limit}`);
  }


  public getworkshop(page:number,limit:number,user_id: any) {
    const url = `${this.BASE_URL}/?page=${page}&limit=${limit}&user_id=${user_id}`;
    return this.httpClient.get<any>(url);
  }


  // public getWorkshops(): Observable<Workshop[]> {
  //   return this.httpClient.get<any[]>(this.BASE_URL).pipe(
  //     map(workshops => {
  //       if (Array.isArray(workshops)) {
  //         return workshops.map(workshop => ({
  //           seller_id: workshop.seller_id,
  //           seller_name: workshop.seller_name,
  //           title: workshop.title,
  //           description: workshop.description,
  //           price: workshop.price,
  //           category: workshop.category,
  //           startDate: new Date(workshop.startDate),
  //           endDate: new Date(workshop.endDate),
  //           image: workshop.image.map((image: any) => ({
  //             url: image.url,
  //             filename: image.filename
  //           }))
  //         }));
  //       } else {
  //         return [];
  //       }
  //     })
  //   );
  // }
}






