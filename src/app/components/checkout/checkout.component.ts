import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from 'src/app/model/order.model';
import { OrderService } from 'src/app/services/order.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  userId = this.tokenService.getUser()._id ;
  constructor(private orderService : OrderService ,private router:Router,private tokenService: TokenStorageService) { }

  createOrder(client_name:string, phone:string, address:string,payment_method:string){
    // console.log(this.userId);
    const order ={client_name,phone,address,payment_method}; 
    const newOrder=this.prepareFormData(order);
    this.orderService.createOrder(newOrder).subscribe({
     next: (res : any) =>{
        // console.log(response);
        // orderForm.reset();
        this.router.navigate(['/home']);
        
      },
    error:  (error : HttpErrorResponse)=>{
        console.log(error);
      }
  });
  }
  prepareFormData(order: any): FormData{
    const formData:any = new FormData();
    const orderDate=formatDate(new Date(), 'yyyy/MM/dd', 'en');
    let products=[{}]
    formData.append('client_name',order.client_name);
    formData.append('userId',this.userId);
    formData.append('address',order.address);
    formData.append('phone',order.phone );
    formData.append('payment_method',order.payment_method );
    formData.append('totalPrice',255 );
    formData.append('orderStatus','pending' ); 
    formData.append('orderDate',orderDate); 
    formData.append('products',products ); 
   // formData.append('phone', user.phone.toString());

    return formData;
  }

  validationForm = new FormGroup({
    client_name:new FormControl(null,[Validators.required, Validators.minLength(3)]),
    // age:new FormControl(null,[Validators.min(20),Validators.max(40)]),
    // email:new FormControl(null,[Validators.email,Validators.required])
  })

  get NameValid(){
    return this.validationForm.controls["client_name"].valid;
  }

}
