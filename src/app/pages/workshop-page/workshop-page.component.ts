import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { WorkshopService } from 'src/app/services/workshop/workshop.service';

@Component({
  selector: 'app-workshop-page',
  templateUrl: './workshop-page.component.html',
  styleUrls: ['./workshop-page.component.css']
})
export class WorkshopPageComponent implements OnInit {
  constructor(protected workshopService: WorkshopService) {}
  page = 1;
  limit = 2;
  NumberOfPages!: number;
  workshops = []; 
  ngOnInit(): void {
    this.getWorkshops();
    }
    getWorkshops() {
      this.workshopService.getAllWorkshops(this.page, this.limit).subscribe(
        (response: any) => {
          this.workshops= response.data.workshops;
          this.NumberOfPages = Math.ceil(response.data.totalRecords / this.limit);

         console.log(this.NumberOfPages)
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
  
    navToPage(page: number){
      this.page = page;
      this.getWorkshops();
    };

}
