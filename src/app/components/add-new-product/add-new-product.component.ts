import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from 'src/app/model/file-handler.model';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/services/product/product.service';
import { NgForm } from '@angular/forms';
import { TokenStorageService } from 'src/app/services/token/token-storage.service';
import { Category } from 'src/app/model/category.model';


@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {
  categories: Category[] = [];
  userId = this.tokenService.getUser()._id ; 
  product : Product = {
    user_id : this.userId  ,
    name :"",
    description : "",
    price : 0 ,
    inStock: 0,
    category: "", 
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

  ngOnInit(): void {
    this.getCategories();
  }
  addProduct(productForm : NgForm){
    const productFormData =  this.prepareFormData(this.product)
    console.log(productFormData)
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
    formData.append('price', product.price);
    formData.append('category', product.category);
    formData.append('inStock', product.inStock);
    formData.append('priceDiscount', product.priceDiscount);
    for(let img of product.images) {
      formData.append(`images`, img.file, img.file!.name)  
      }
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
     console.log(fileHandle)
    }
  }
  removeImage(i :number) {
    this.product.images.splice(i,1);
  }
  fileDropped(fileHandel : FileHandle){
    this.product.images.push(fileHandel);
  }

  getCategories() {
    this.productService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response as Category[];
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
