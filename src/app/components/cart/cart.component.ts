import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})

export class CartComponent {
  cartProducts!: any;
  totalItems!: number;
  totalPrice!: number;

  constructor(public cartService: CartService) {
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
}