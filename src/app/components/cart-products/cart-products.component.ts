import { Component } from '@angular/core';

@Component({
  selector: 'app-cart-products',
  templateUrl: './cart-products.component.html',
  styleUrls: ['./cart-products.component.css']
})
export class CartProductsComponent {
  quantity = 1;
  maxQuantity = 5;

  changeQuantity(){
    if(this.quantity < 1){
      this.quantity = 1;
    }else if(this.quantity > this.maxQuantity){
      this.quantity = this.maxQuantity;
    }
  }

  incrementQuantity(){
    this.quantity < this.maxQuantity ? this.quantity++ : this.maxQuantity;
  }

  decrementQuantity(){
    this.quantity > 1 ? this.quantity-- : 1;
  }
}
