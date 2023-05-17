import { Component, Input } from '@angular/core';
import { WorkshopService } from 'src/app/services/workshop.service';

@Component({
  selector: 'app-sellerworkshops',
  templateUrl: './sellerworkshops.component.html',
  styleUrls: ['./sellerworkshops.component.css']
})
export class SellerworkshopsComponent {
@Input () workshop: any
constructor(protected workshopService: WorkshopService) {  }
  deleteWorkshop(workshopId:string) {
    console.log(workshopId);
    
    this.workshopService.deleteWorkshop(workshopId).subscribe
    ({next:(data) => {

    },error: (err)=>{}});
  }
}
