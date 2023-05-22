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
  products: any[] = [];

  constructor(
    private productService: ProductService,
    private favouriteService: FavouriteService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.productService.getTopDiscountedProduct().subscribe({
      next: (response: any) => {
        this.products = response.data.products;
        this.isInFavourite();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
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

  toggleFavourite(productId: any, event: Event) {
    const favourite = (event.target as HTMLElement).parentElement;
    const inFavourite = favourite?.classList.contains('inFavourite');

    if (inFavourite) {
      this.favouriteService.deleteProduct(productId).subscribe({
        next: (response) => {
          (event.target as HTMLElement).style.color = '#c8d8e4';
          favourite?.classList.remove('inFavourite');
          this.favouriteService.favoritesUpdatedSubject.next();
        },
        error: (error) => {
          console.error('Error removing from favourite:', error);
        },
      });
    } else {
      this.favouriteService.addToFavourite({ productId }).subscribe({
        next: (response) => {
          favourite?.classList.add('inFavourite');
          (event.target as HTMLElement).style.color = '#A20A0A';
          this.favouriteService.favoritesUpdatedSubject.next();
        },
        error: (error) => {
          console.error('Error adding to favourite:', error);
        },
      });
    }
  }

  isInFavourite() {
    this.products.forEach((product) => {
      this.favouriteService.isInFavourite(product._id).subscribe({
        next: (response) => {
          let favourite = document.getElementById(product._id) as HTMLElement;
          if (favourite) {
            if (response) {
              favourite.style.color = '#A20A0A';
              favourite.closest('a')?.classList.add('inFavourite');
            } else {
              favourite.style.color = '#c8d8e4';
              favourite.closest('a')?.classList.remove('inFavourite');
            }
          } else {
            console.error('Error: Element not found');
          }
        },
        error: (error) => {
          console.error('Error:', error);
        },
      });
    });
  }
}
