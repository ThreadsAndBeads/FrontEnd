import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/model/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-products',
  templateUrl: './cart-products.component.html',
  styleUrls: ['./cart-products.component.css'],
})
export class CartProductsComponent implements OnInit {
  cartProducts!: Cart['products'];

  constructor(protected cartService: CartService) {}

  ngOnInit() {
    this.cartService.getCartProducts().subscribe({
      next: (response) => {
        this.cartProducts = response.data.cart.products;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  changeQuantity(product: any) {
    if (this.getProductIndex(product) != -1) {
      if (product.quantity < 1) {
        product.quantity = 1;
      } else if (product.quantity > product.productId.inStock) {
        product.quantity = product.productId.inStock;
      }
      this.updateProduct(product);
    }
  }

  incrementQuantity(product: any) {
    if (this.getProductIndex(product) != -1) {
      if(product.quantity < product.productId.inStock){
        product.quantity++
        this.updateProduct(product);
      }
    }
  }

  decrementQuantity(product: any) {
    if (this.getProductIndex(product) != -1) {
      if(product.quantity > 1){
        product.quantity--
        this.updateProduct(product);
      }
    }
  }

  getProductIndex(product: any) {
    const index = this.cartProducts.indexOf(product);
    if (index !== -1) {
      return index;
    }
    return -1;
  }

  updateProduct(product: any) {
    this.cartService.editProduct(product).subscribe({
      next: (response) => {
        this.cartProducts = response.data.cart.products;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  clearCart() {
    this.cartService.clearCart().subscribe({
      next: (response) => {
        // this.cartProducts = response.data.cart.products;
        console.log(response)
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  deleteProduct(product: any) {
    console.log(product.productId._id);
    this.cartService.deleteProduct(product.productId._id).subscribe({
      next: (response) => {
        console.log(response);
        // this.cartProducts = response.data.cart.products;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
