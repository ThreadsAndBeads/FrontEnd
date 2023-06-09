import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Workshop } from '../../../model/workshop.model';
import { WorkshopService } from '../../../services/workshop/workshop.service';
import { TokenStorageService } from '../../../services/token/token-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import * as bootstrap from 'bootstrap';



@Component({
  selector: 'app-myworkshop',
  templateUrl: './myworkshop.component.html',
  styleUrls: ['./myworkshop.component.css']
})
export class MyworkshopComponent implements OnInit {
  @ViewChild('myModal') myModal!: ElementRef;

  page = 1;
  limit = 3;
  NumberOfPages!: number;
  currentUser: any;
  currentUserId: any;
  workshops: Workshop[] = [];


  constructor(protected workshopService:WorkshopService,
    private tokenService: TokenStorageService,) {}

  ngOnInit() {
    this.currentUser = this.tokenService.getUser();
    this.currentUserId = this.currentUser._id;
    console.log(this.currentUserId );
    
    this.getWorkshops();

  }

  getWorkshops() {
    // this.workshopService.products = [];
    this.workshopService.getSellerWorkshops(this.page, this.limit,this.currentUserId).subscribe(
      (response: any) => {

        this.workshops  = response.data.workshops;
        this.NumberOfPages = Math.ceil(response.data.totalRecords / this.limit);
        // this.productService.products.push(...products);
      },
      ({ status, message }: HttpErrorResponse) => {
        console.log(`Error ${status}: ${message}`);
      }
    );
  }
  get pages(): number[] {
    return Array.from({ length: this.NumberOfPages }, (_, i) => i + 1);
  }
  previous() {
    if (this.page > 1) {
      this.page--;
      this.getWorkshops();
    }
  }

  next() {
    if (this.page < this.NumberOfPages) {
      this.page++;
      this.getWorkshops();
    }
  }

  // navToPage(page: number){
  //   this.page = page;
  //   this.getWorkshops();
  // };
  showModal() {
    const modal = new bootstrap.Modal(this.myModal.nativeElement);
    modal.show();
  }
}















