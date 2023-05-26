import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { FavouriteService } from 'src/app/services/favorite/favourite.service';
import { ProductService } from 'src/app/services/product/product.service';
import { TokenStorageService } from 'src/app/services/token/token-storage.service';
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() product: any;
  userId = this.tokenService.getUser()?._id;
  isFavourite = false;
  isUserLoggedIn: boolean = false;

  constructor(
    private router: Router,
    protected cartService: CartService,
    protected productService: ProductService,
    protected favouriteService: FavouriteService,
    protected tokenService: TokenStorageService
  ) {
    this.isUserLoggedIn = this.tokenService.isLoggedIn();
  }
  ngOnInit() {
    if (this.isUserLoggedIn) {
    this.isInFavourite();
    }
  }

  addToCart(productId: string) {
    const data = {
      userId: this.userId,
      products: {
        productId: productId,
        quantity: 1,
      },
    };

    if (this.isUserLoggedIn) {
      this.cartService.addToCart(data).subscribe({
        next: (response) => {
          this.cartService.cartUpdatedSubject.next();
        },
        error: (error) => {
          // console.error('Error adding to cart:', error);
        },
      });
    } else {
      this.router.navigateByUrl('/auth');
    }
  }

  toggleFavourite(event: Event) {
    if( this.isUserLoggedIn ){
      const favouriteBtn = event.target as HTMLInputElement;
      if (favouriteBtn.checked) {
        this.addToFavourite();
      } else {
        this.removeFromFavourite();
      }
    } else {
      this.router.navigateByUrl('/auth');
    }
  }

  addToFavourite() {
    this.favouriteService
      .addToFavourite({ productId: this.product._id })
      .subscribe({
        next: (response) => {
          this.favouriteService.favoritesUpdatedSubject.next();
        },
        error: (error) => {
          // console.error('Error adding to favourite:', error);
        },
      });
  }

  removeFromFavourite() {
    this.favouriteService.deleteProduct(this.product._id).subscribe({
      next: (response) => {
        this.favouriteService.favoritesUpdatedSubject.next();
      },
      error: (error) => {
        // console.error('Error removing from favourite:', error);
      },
    });
  }

  isInFavourite() {
    this.favouriteService.isInFavourite(this.product._id).subscribe({
      next: (response) => {
        this.isFavourite = response;
      },
      error: (error) => {
        // console.error('Error:', error);
      },
    });
  }
}