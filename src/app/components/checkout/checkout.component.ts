import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from 'src/app/model/order.model';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  // @ViewChild('myModal') myModal!: ElementRef;
  userId = this.tokenService.getUser()._id ;
  validationForm!: FormGroup;
  payment_method:any;
  cartProducts!: any;
  totalItems!: number;
  totalPrice!: number;
  error = {
    client_name: '',
    phone: '',
    city: '',
    address: '',
  };
  client=this.tokenService.getUser();
  constructor(private orderService: OrderService,
    private router: Router,
    private tokenService: TokenStorageService,
    public cartService: CartService,
    private fb: FormBuilder,
    private paymentService: PaymentService)
   {
    this.checkCartStatus();
     this.validationForm = this.fb.group({
       client_name: [this.client.name, [Validators.required]],
       phone: [this.client.phone, [Validators.required]],
       city:['', Validators.required],
       address:['', Validators.required],
       // payment_method:['']
     });



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
    this.paymentService.setAmount(this.totalPrice);
  }
  get client_name() {
    return this.validationForm.get('client_name');
  }
  get phone() {
    return this.validationForm.get('phone');
  }
  get city() {
    return this.validationForm.get('city');
  }

  get address() {
    return this.validationForm.get('address');
  }
  createOrder(){
    // console.log(this.userId);
    if (this.validationForm.valid) {
    const order ={address:this.address!.value,client_name:this.client_name!.value,phone:this.phone!.value,city:this.city!.value};
    // console.log(order);

    const newOrder=this.prepareOrder(order);
    // console.log(newOrder);
    // await this.isCredit();
    this.orderService.createOrder(newOrder).subscribe({
     next: (res : any) =>{
        this.router.navigate(['/home']);
      },
    error:  (error : HttpErrorResponse)=>{
        console.log(error);
      }
  });
  }else{
    this.  error = {
      client_name: 'name is required',
      phone: 'phone is required',
      city: 'city is required',
      address: 'address is required',
    };
  }
}
  paymentMethod(e:any) {
    this.payment_method = e.target.value;
  }

  isCredit(e:any){
    if (this.payment_method === "credit") {
      this.paymentService.invokeStripe();
      this.paymentService.makePayment();
    } else {
      // this.createOrder();
    }
  }
  prepareOrder(order: any){
    let newOrder = {
      userId: this.userId,
      client_name: order.client_name,
      clientAddress: {
        apartmentNo: order.apartmentNo || null,
        city: order.city || null,
        address: order.address || null,
      },
      phone: order.phone,
      payment_method: this.payment_method ,
    };
    return newOrder;
  }



  // get NameValid(){
  //   return this.validationForm.controls["client_name"].valid;
  // }
  // get PhoneValid(){
  //   return this.validationForm.controls["phone"].valid;
  // }
  // get AddressValid(){
  //   // return this.validationForm.controls["address"].valid;
  // }
  // get CityValid(){
  //   return this.validationForm.controls["city"].valid;
  // }

  // get payment_method() {
  //   return this.validationForm.get('payment_method');
  // }
}
