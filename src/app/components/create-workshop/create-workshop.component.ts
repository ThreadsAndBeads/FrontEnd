import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm ,Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FileHandle } from 'src/app/model/file-handler.model';
import { Workshop } from 'src/app/model/workshop.model';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { WorkshopService } from 'src/app/services/workshop.service';

@Component({
  selector: 'app-create-workshop',
  templateUrl: './create-workshop.component.html',
  styleUrls: ['./create-workshop.component.css']
})
export class CreateWorkshopComponent {
  userId = this.tokenService.getUser()._id ;
  form!: FormGroup;
  workshop : Workshop = {
    seller_id: this.userId ,
    seller_name :"",
    title : "" ,
    description : "" ,
    price : 0 ,
    startDate : null ,
    endDate :null ,
    image: null
  }
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });


  constructor(
    private router: Router,

    private fb: FormBuilder, private workshopService : WorkshopService , private sanitizer :DomSanitizer , private tokenService: TokenStorageService) {
  }

  addWorkshop(workshopForm : NgForm){
    const workshopFormData =  this.prepareFormData(this.workshop)
    this.workshopService.addWorkshop(workshopFormData).subscribe(
      (response : Workshop) =>{
        workshopForm.reset();
        this.workshop.image = null;
        this.router.navigate(['/seller/myWorkshops']);

      },
      (error : HttpErrorResponse)=>{
        console.log(error);
      }
    );
  }

  prepareFormData(workshop: any): FormData {
    const formData:any = new FormData();
    formData.append('seller_id', workshop.seller_id);
    formData.append('title', workshop.title);
    formData.append('description', workshop.description);
    formData.append('price', workshop.price);
    const startDate = this.range.value.start;
    const endDate = this.range.value.end;

    if (startDate) {
      formData.append('startDate', startDate);
    }

    if (endDate) {
      formData.append('endDate', endDate);
    }

    formData.append('image', workshop.image!.file, workshop.image!.file!.name);

    return formData;
  }
  onFileSelected(event :any){
    if(event.target.files){
     const file = event.target.files[0];
     const fileHandle : FileHandle = {
      file : file ,
      url : this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
     }
     this.workshop.image = (fileHandle)
    }
  }

  removeImage() {
    this.workshop.image = null;
  }
  fileDropped(fileHandel : FileHandle){
    this.workshop.image = (fileHandel);
  }
}
