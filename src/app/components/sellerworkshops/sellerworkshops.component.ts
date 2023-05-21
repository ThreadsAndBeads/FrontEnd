import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationExtras, Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { Workshop } from 'src/app/model/workshop.model';
import { WorkshopService } from 'src/app/services/workshop.service';

@Component({
  selector: 'app-sellerworkshops',
  templateUrl: './sellerworkshops.component.html',
  styleUrls: ['./sellerworkshops.component.css']
})
export class SellerworkshopsComponent {
@Input () workshop: any
  @Input() index: any;
  workshopIdToDelete: any;

@ViewChild('myModal') myModal!: ElementRef;
constructor( private workshopService : WorkshopService , private router : Router ) {
}

  deleteWorkshop(workshopId:string) {
    console.log(workshopId);

    this.workshopService.deleteWorkshop(workshopId).subscribe
      ({
        next: (data) => {
          location.reload();
          this.router.navigate(['myWorkshops']);

    },error: (err)=>{}});
  }
  showModal() {
    const modal = new bootstrap.Modal(this.myModal.nativeElement);
    modal.show();
  }
  openEditWorkshopModal() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(this.workshop)
      }
    };
    console.log(navigationExtras.queryParams);

    this.router.navigate([`editWorkshop/${this.workshop._id}`,navigationExtras]);
  }

}
