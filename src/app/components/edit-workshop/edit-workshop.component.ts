import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FileHandle } from 'src/app/model/file-handler.model';
import { Workshop } from 'src/app/model/workshop.model';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { WorkshopService } from 'src/app/services/workshop.service';
@Component({
  selector: 'app-edit-workshop',
  templateUrl: './edit-workshop.component.html',
  styleUrls: ['./edit-workshop.component.css']
})
export class EditWorkshopComponent {
  workshop : Workshop = {
    seller_id: "this.userId" ,
    seller_name :"",
    title : "" ,
    description : "" ,
    price : 0 ,
    startDate : null ,
    endDate :null ,
    image: null
  }
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
        this.router.navigate(['/myWorkshops']);
  
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
    // const startDate = this.range.value.start;
    // const endDate = this.range.value.end;
  
    // if (startDate) {
    //   const utcStartDate = new Date(Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()));
    //   formData.append('startDate', utcStartDate.toISOString());
    // }
  
    // if (endDate) {
    //   const utcEndDate = new Date(Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()));
    //   formData.append('endDate', utcEndDate.toISOString());
    // }
  
    formData.append('image', workshop.image!.file, workshop.image!.file!.name);
  
    return formData;
  }

  onFileSelected(event :any){
    if(event.target.files){
      console.log(event.target.files[0])
     const file = event.target.files[0];
     const fileHandle : FileHandle = {
      file : file , 
      url : this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
     }
     this.workshop.image = (fileHandle)
    // this.workshopForm.get('image')!.setValue(fileHandle);
    // this.fileInput.nativeElement.value = '';

     console.log(fileHandle)
    }
  }

  removeImage() {
    this.workshop.image = null;
  }
  fileDropped(fileHandel : FileHandle){
    this.workshop.image = (fileHandel);
  }
}
