import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { FileHandle } from 'src/app/model/file-handler.model';
import { Workshop } from 'src/app/model/workshop.model';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { WorkshopService } from 'src/app/services/workshop.service';

@Component({
  selector: 'app-sellerworkshops',
  templateUrl: './sellerworkshops.component.html',
  styleUrls: ['./sellerworkshops.component.css']
})
export class SellerworkshopsComponent {
@Input () workshop: any
@ViewChild('myModal') myModal!: ElementRef;
workshop1 : Workshop = {
  seller_id: "this.userId" ,
  seller_name :"",
  title : "" ,
  description : "" ,
  price : 0 ,
  startDate : null ,
  endDate :null ,
  image: null
}
constructor( private workshopService : WorkshopService ) { 
}

  deleteWorkshop(workshopId:string) {
    console.log(workshopId);
    
    this.workshopService.deleteWorkshop(workshopId).subscribe
    ({next:(data) => {

    },error: (err)=>{}});
  }
  showModal() {
    const modal = new bootstrap.Modal(this.myModal.nativeElement);
    modal.show();
  }


}
