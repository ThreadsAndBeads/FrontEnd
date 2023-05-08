import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Product } from 'src/app/model/product.model';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent {
  product : Product = {
    user_id : "6457ecfe4bdf0afff589f7df",
    name :"",
    description : "",
    price : 0 , 
    priceDiscount : 0,
    // images : [],
  }
  constructor(private http: HttpClient) { }

  AddProduct(){
    this.http.post<any>('http://localhost:7000/api/v1/products/', this.product)
    .subscribe({
      next: (response) => {
        console.log(response.data);

      },
      error: (error: HttpErrorResponse) => {
        // this.error = error.error.errors;
      }
    });
  }
}
