import { Component, OnInit } from '@angular/core';
import { Workshop } from '../model/workshop.model';
import { WorkshopService } from '../services/workshop.service';
import { TokenStorageService } from '../services/token-storage.service';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-myworkshop',
  templateUrl: './myworkshop.component.html',
  styleUrls: ['./myworkshop.component.css']
})
export class MyworkshopComponent implements OnInit {

  page = 1;
  limit = 6;
  NumberOfPages!: number;
  currentUser: any;
  currentUserId: any;
  workshops: Workshop[] = [];


  constructor(protected workshopService:WorkshopService,
    private tokenService: TokenStorageService,) {}

  ngOnInit() {
    this.currentUser = this.tokenService.getUser();
    this.currentUserId = this.currentUser._id;
    this.getworkshop();

  }

  getworkshop() {
    // this.workshopService.products = [];
    this.workshopService.getworkshop(this.page, this.limit,this.currentUserId).subscribe(
      (response: any) => {
        this.workshops  = response.data.workshops;
        console.log(this.workshops);
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
      this.getworkshop();
    }
  }

  next() {
    if (this.page < this.NumberOfPages) {
      this.page++;
      this.getworkshop();
    }
  }

  navToPage(page: number){
    this.page = page;
    this.getworkshop();
  };
}

















  // selectedWorkshop: Workshop | null = null;
  // workshops: Workshop[] = [];

  // constructor(private workshopService: WorkshopService) {}

  // ngOnInit(): void {
  //   this.workshopService.getWorkshops().subscribe(
  //     (workshops) => { console.log(workshops);
  //       if (workshops) {
  //         this.workshops = workshops.map(workshop => ({
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
  //       }
  //     },
  //     (error) => {
  //       console.log('Error:', error);
  //     }
  //   );
  // }

  // onCloseCardClick(): void {
  //   this.selectedWorkshop = null;
  // }}