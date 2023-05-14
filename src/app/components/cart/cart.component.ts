import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cartProducts!: any;

  constructor(public cartService: CartService) {
    this.checkCartStatus()
  }
  
  checkCartStatus(){
    this.cartService.getCartProducts().subscribe({
      next: (response) => {
        if(response.data.cart.products){
          this.cartService.cartProducts = response.data.cart.products;
          if (this.cartService.cartProducts.length > 0) {
            this.cartService.cartNotEmpty = true;
          }
        }
        console.log(this.cartService.cartNotEmpty);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}