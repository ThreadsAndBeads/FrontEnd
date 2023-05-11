import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { WorkshopService } from 'src/app/services/workshop.service';

@Component({
  selector: 'app-workshop-page',
  templateUrl: './workshop-page.component.html',
  styleUrls: ['./workshop-page.component.css']
})
export class WorkshopPageComponent implements OnInit {
  constructor(protected workshopService: WorkshopService) {}

  workshops = []; 
  ngOnInit(): void {
    this.getWorkshops();

    const colors = ['#456268','#F9D949','#d9bfb1'];
    var blobs = document.querySelectorAll("#background path")  as NodeListOf<SVGPathElement>;;
    
    blobs.forEach(blob => {
        blob.style.fill = colors[Math.floor(Math.random() * colors.length)];
    });
    }
    getWorkshops() {
      this.workshopService.getAllWorkshops().subscribe(
        (response: any) => {
          this.workshops= response.data.workshops;
         console.log(this.workshops)
        },
        ({ status, message }: HttpErrorResponse) => {
          console.log(`Error ${status}: ${message}`);
        }
      );
    }
    // get pages(): number[] {
    //   return Array.from({ length: this.NumberOfPages }, (_, i) => i + 1);
    // }
    // previous() {
    //   if (this.page > 1) {
    //     this.page--;
    //     this.getProducts();
    //   }
    // }
  
    // next() {
    //   if (this.page < this.NumberOfPages) {
    //     this.page++;
    //     this.getProducts();
    //   }
    // }
  
    // navToPage(page: number){
    //   this.page = page;
    //   this.getProducts();
    // };

}
