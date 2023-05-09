import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from 'src/app/model/file-handler.model';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/services/product.service';
import { NgForm } from '@angular/forms';
import { TokenStorageService } from 'src/app/services/token-storage.service';


@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent {
   userId = this.tokenService.getUserId() ; 
  product : Product = {
    user_id : this.userId  ,
    name :"",
    description : "",
    price : 0 , 
    priceDiscount : 0,
    images : [],
  }
  error = {
    name: 'product name required',
    price: 'product price required',
    priceDiscount: 'discount price should be below regular price',
    type: ''
  };
  constructor(private productService : ProductService , private sanitizer :DomSanitizer , private tokenService: TokenStorageService) { }

  addProduct(productForm : NgForm){
    console.log(this.userId);

    const productFormData =  this.prepareFormData(this.product)
    this.productService.addProduct(productFormData).subscribe(
      (response : Product) =>{
        // console.log(response);
        productForm.reset();
        this.product.images = [];
      },
      (error : HttpErrorResponse)=>{
        console.log(error);
      }
    );
  }
  prepareFormData(product: Product): FormData {
    const formData:any = new FormData();
    formData.append('user_id', product.user_id);
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price.toString());
    formData.append('priceDiscount', product.priceDiscount.toString());
    const imagesArray = [];
    for(let i = 0; i < product.images.length; i++) {
      imagesArray.push(product.images[i].file);
    }
    formData.append('images', product.images );

    // append the array of image files to the sub form data objects
    // for(let i = 0; i < imagesArray.length; i++) {
    //   const imageFormData = new FormData();
    //   imageFormData.append('image', imagesArray[i], product.images[i].file.name);
    //   formData.append('images', imageFormData.get('image') as Blob);
    // }
    // for(let i = 0; i < product.images.length; i++) {
    //   formData.append(`image_${i}`, product.images[i].file, product.images[i].file.name)    }
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
     this.product.images.push(fileHandle)
    }
  }
  removeImage(i :number) {
    this.product.images.splice(i,1);
  }
  fileDropped(fileHandel : FileHandle){
    this.product.images.push(fileHandel);
  }
}
