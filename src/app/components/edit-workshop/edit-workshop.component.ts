import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FileHandle } from 'src/app/model/file-handler.model';
import { Workshop } from 'src/app/model/workshop.model';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { WorkshopService } from 'src/app/services/workshop.service';
@Component({
  selector: 'app-edit-workshop',
  templateUrl: './edit-workshop.component.html',
  styleUrls: ['./edit-workshop.component.css']
})
export class EditWorkshopComponent implements OnInit{
  userId = this.tokenService.getUser()._id ; 

  workshop! : Workshop ;
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  constructor(
    private router: Router,
    private fb: FormBuilder,
     private workshopService : WorkshopService ,
     private route: ActivatedRoute, 
      private sanitizer :DomSanitizer , private tokenService: TokenStorageService) {  
  }

ngOnInit(): void {
 this. workshop ={
    seller_id: "" ,
    seller_name :"",
    title : "" ,
    description : "" ,
    price : 0 ,
    startDate : null ,
    endDate :null ,
    image: null
  }
  const id = this.route.snapshot.paramMap.get('workshopId');
  this.workshopService.getWorkshopById(id).subscribe({next: (data : any) => {
    this.workshop = data.data.data;  
    // console.log("hereeeeeeeeeeee");
      
  } , error :(err)=>{
    console.log(err);
    
  }});  
}      
  
editWorkshop(workshopForm : NgForm){
    let workshopFormData =  this.prepareFormData(this.workshop)
    // for (const [key, value] of workshopFormData.entries()) {
    //   console.log(key + ": " + value);
    // }
      // console.log(workshopFormData.getAll);
    const id = this.route.snapshot.paramMap.get('workshopId');
    this.workshopService.updateWorkshop(id, workshopFormData).subscribe({next:(data) => {
      // console.log(data);   
      this.router.navigate(['/myWorkshops']);
    } ,error : (err)=>{
      console.log(err);      
    }});
  }
  
  prepareFormData(workshop: Workshop) :FormData {
    console.log(workshop.title); 
    const formData :any = new FormData();
    formData.append('seller_id', this.userId);
    formData.append('title', workshop.title);
    formData.append('description', workshop.description);
    formData.append('price', workshop.price);
    const startDate = this.range.value.start;
    const endDate = this.range.value.end;
  
    if (startDate) {
      const utcStartDate = new Date(Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()));
      formData.append('startDate', utcStartDate.toISOString());
    }
  
    if (endDate) {
      const utcEndDate = new Date(Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()));
      formData.append('endDate', utcEndDate.toISOString());
    }
    // formData.append('image', this.workshop.image!.file, this.workshop.image!.file!.name);
    if (workshop.image) { // Check if the image property exists
      formData.append('image', workshop.image.file, workshop.image!.file!.name);
    }
    // console.log(formData);
    // for (const [key, value] of formData.entries()) {
    //   console.log(key + ": " + value);
    // }
    return formData;
  }

  onFileSelected(event :any){
    if(event.target.files){
      // console.log(event.target.files[0])
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
