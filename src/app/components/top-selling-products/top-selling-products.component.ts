import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { CartService } from 'src/app/services/cart.service';
import { FavouriteService } from 'src/app/services/favourite.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-top-selling-products',
  templateUrl: './top-selling-products.component.html',
  styleUrls: ['./top-selling-products.component.css'],
})
export class TopSellingProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private favouriteService: FavouriteService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.productService.getTopDiscountedProduct().subscribe(
      (response: any) => {
        for (let i = 0; i < response.data.products.length; i++) {
          this.products.push(response.data.products[i]);
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  addToCart(productId: any) {
    const data = {
      products: {
        productId: productId,
        quantity: 1,
      },
    };

    this.cartService.addToCart(data).subscribe({
      next: (response) => {
        this.cartService.cartUpdatedSubject.next();
      },
      error: (error) => {
        console.error('Error adding to cart:', error);
      },
    });
  }

  addToFavourites(productId: any) {}
}
