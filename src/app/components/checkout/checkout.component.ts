import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from 'src/app/model/order.model';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  userId = this.tokenService.getUser()._id ;
  cartProducts!: any;
  totalItems!: number;
  totalPrice!: number;
  client=this.tokenService.getUser();
  constructor(private orderService : OrderService ,private router:Router,private tokenService: TokenStorageService,public cartService: CartService)
   { 
    this.checkCartStatus();
  }


  checkCartStatus() {
    this.cartService.getCartProducts().subscribe({
      next: (response) => {
        if (response.data.cart.products) {
          this.cartService.cartProducts = response.data.cart.products;
          if (this.cartService.cartProducts.length > 0) {
            this.cartService.cartNotEmpty = true;
            this.calculateSubtotal();
          }
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  calculateSubtotal() {
    this.totalItems = 0;
    this.totalPrice = 0;

    this.cartService.cartProducts.forEach((product) => {
      this.totalItems += product.quantity;
      this.totalPrice += product.quantity * product.productId.price;
    });
  }
  createOrder(client_name:string, phone:string, address:string,payment_method:string){
    // console.log(this.userId);
    const order ={client_name,phone,address,payment_method}; 
    const newOrder=this.prepareFormData(order);
    console.log(newOrder);
    
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
  prepareFormData(order: any){
    const orderDate=formatDate(new Date(), 'yyyy/MM/dd', 'en');
    let newOrder = {
      userId: this.userId,
      client_name: order.client_name,
      address: order.address,
      phone: order.phone,
      payment_method: order.payment_method ,
      totalPrice:  this.totalPrice,
      orderDate:orderDate,
      orderStatus:'pending',
      products:this.cartProducts
    };
   // formData.append('phone', user.phone.toString());
    return newOrder;
  }

  validationForm = new FormGroup({
    client_name:new FormControl(this.client.name),
    phone:new FormControl(this.client.phone),
    city:new FormControl(null),
    ZIP:new FormControl(null),
    flat:new FormControl(null),
    address:new FormControl(null),
    payment_method:new FormControl(null),
  })

  get NameValid(){
    return this.validationForm.controls["client_name"].valid;
  }

}
