import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from 'src/app/model/order.model';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { PaymentService } from 'src/app/services/payment.service';
import { delay } from 'rxjs/operators';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  showModal = false;
  userId = this.tokenService.getUser()._id;
  validationForm!: FormGroup;
  payment_method: any;
  cartProducts: any[] = [];
  cartNotEmpty: boolean = false;
  totalItems!: number;
  totalPrice!: number;
  tax: number = 0;
  shipping: number = 0;
  subTotalPrice!: number;
  discount: number = 0;
  is_gift: boolean = false;
  error = {
    client_name: '',
    phone: '',
    city: '',
    address: '',
  };
  client = this.tokenService.getUser();
  constructor(
    private orderService: OrderService,
    private router: Router,
    private tokenService: TokenStorageService,
    public cartService: CartService,
    private fb: FormBuilder,
    private paymentService: PaymentService
  ) {
    this.checkCartStatus();
    this.validationForm = this.fb.group({
      client_name: [this.client.name, [Validators.required]],
      phone: [this.client.phone, [Validators.required]],
      city: ['', Validators.required],
      address: ['', Validators.required],
    });
    this.getSessionData();
  }

  getSessionData(){
    const discountString = sessionStorage.getItem('discount');
    this.discount = discountString ? parseInt(discountString, 10) : 0;
    this.is_gift = sessionStorage.getItem('is_gift') === 'true';

  }

  checkCartStatus() {
    this.cartService.getCartProducts().subscribe({
      next: (response) => {
        if (response.data.cart.products) {
          this.cartProducts = response.data.cart.products;
          if (this.cartProducts.length > 0) {
            this.cartNotEmpty = true;
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
    this.subTotalPrice = 0;

    this.cartProducts.forEach((product) => {
      this.totalItems += product.quantity;
      this.subTotalPrice += product.quantity * product.productId.price;
    });
    this.totalPrice = this.subTotalPrice - this.discount - this.tax - this.shipping;
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

  createOrder() {

    if (this.validationForm.valid) {
      const order = {
        address: this.address!.value,
        client_name: this.client_name!.value,
        phone: this.phone!.value,
        city: this.city!.value,
        is_gift: this.is_gift,
        discount: this.discount
      };

      const newOrder = this.prepareOrder(order);
      this.orderService.createOrder(newOrder).subscribe({
        next: (res: any) => {
          this.cartService.cartUpdatedSubject.next();
          sessionStorage.removeItem('is_gift');
          sessionStorage.removeItem('discount');
          this.showModal = true;
          // this.router.navigate(['/home']);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
    } else {
      this.error = {
        client_name: 'name is required',
        phone: 'phone is required',
        city: 'city is required',
        address: 'address is required',
      };
    }
  }
  paymentMethod(e: any) {
    this.payment_method = e.target.value;
  }


  isCredit(e: any) {
    if (this.payment_method === 'credit') {
      this.paymentService.invokeStripe();
      this.paymentService.makePayment();
    }
  }
  prepareOrder(order: any) {
    let newOrder = {
      userId: this.userId,
      client_name: order.client_name,
      clientAddress: {
        apartmentNo: order.apartmentNo || null,
        city: order.city || null,
        address: order.address || null,
      },
      phone: order.phone,
      payment_method: this.payment_method,
      is_gift: this.is_gift,
      discount: this.discount
    };
    return newOrder;
  }
  navigateToTrackOrder() {
    this.showModal = false; // Hide the modal
    this.router.navigate(['/customer/orders']); // Navigate to the home page
  }

}
