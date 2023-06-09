import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from 'src/app/model/file-handler.model';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/services/product/product.service';
import { NgForm } from '@angular/forms';
import { TokenStorageService } from 'src/app/services/token/token-storage.service';
import { ActivatedRoute } from '@angular/router';
import {Router} from "@angular/router"
import { Category } from 'src/app/model/category.model';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit{
  categories: Category[] = [];
  submitted = false;
  userId = this.tokenService.getUser()._id;
  productId: any;
  product! : Product
  ngOnInit() {
    this.product ={
    user_id : this.userId  ,
    name :"",
    description : "",
    price : 0 ,
    inStock: 0,
    category:"",
    priceDiscount : 0,
    images : [],
    }
    const id = this.route.snapshot.paramMap.get('productId');
    this.productService.getOneProduct(id).subscribe({next: (data : any) => {
      this.product = data.data.data;
    } , error :(err)=>{
      console.log(err);

    }});
    this.getCategories();
  }

  constructor(
    private productService: ProductService,
    private sanitizer: DomSanitizer,
    private tokenService: TokenStorageService,
    private route: ActivatedRoute,
    private router: Router) { }

  updateProduct(productForm : NgForm){
    this.submitted = true ;
    if(productForm.valid){
    const productFormData =  this.prepareFormData(this.product)
    const id = this.route.snapshot.paramMap.get('productId');
    this.productService.updateProduct(productFormData,id).subscribe(
      (response : Product) =>{
        this.router.navigate(['/seller/sellerProducts']);
      },
      (error : HttpErrorResponse)=>{
        console.log(error);
      }
    );
    }
  }
  prepareFormData(product: Product): FormData {
    const formData:any = new FormData();
    formData.append('user_id', product.user_id);
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('category', product.category);
    formData.append('price', product.price);
    formData.append('inStock', product.inStock);
    formData.append('priceDiscount', product.priceDiscount);
    for(let img of this.product.images) {
      if(img.file)
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
