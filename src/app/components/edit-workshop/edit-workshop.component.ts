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
  const id = this.route.snapshot.paramMap.get('workshopId');
  this.workshopService.getWorkshopById(id).subscribe({next: (data : any) => {
    this.workshop = data.data.data;    
  } , error :(err)=>{
    console.log(err);
    
  }});  
}      
  
editWorkshop(workshopForm : NgForm){
  console.log(workshopForm);
  
    const workshopFormData =  this.prepareFormData(workshopForm)
    // console.log(workshopFormData); 
    // workshopFormData.forEach((value: FormDataEntryValue, key: string) => {
    //   console.log(key + ': ' + value);
    // });
    const id = this.route.snapshot.paramMap.get('workshopId');
    this.workshopService.updateWorkshop(id, workshopFormData).subscribe({next:(data) => {
      // console.log(data);
      
      this.router.navigate(['/myWorkshops']);
    } ,error : (err)=>{
      console.log(err);      
    }});
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
      const utcStartDate = new Date(Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()));
      formData.append('startDate', utcStartDate.toISOString());
    }
  
    if (endDate) {
      const utcEndDate = new Date(Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()));
      formData.append('endDate', utcEndDate.toISOString());
    }
    formData.append('image', this.workshop.image!.file, this.workshop.image!.file!.name);
  
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
