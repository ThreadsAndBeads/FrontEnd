import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  constructor(private orderService : OrderService ,private router:Router) { }

  createOrder(client_name:string, phone:string, address:string){
    // console.log(this.userId);
    const order ={}; 
    this.orderService.createOrder(order).subscribe({
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


  validationForm = new FormGroup({
    client_name:new FormControl(null,[Validators.required, Validators.minLength(3)]),
    // age:new FormControl(null,[Validators.min(20),Validators.max(40)]),
    // email:new FormControl(null,[Validators.email,Validators.required])
  })

  get NameValid(){
    return this.validationForm.controls["client_name"].valid;
  }

}
