import { Component, Input } from '@angular/core';
import { FavouriteService } from 'src/app/services/favourite.service';
import { ProductService } from 'src/app/services/product.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() product: any;

  constructor(
    protected productService: ProductService,
    protected favouriteService: FavouriteService,
    protected tokenService: TokenStorageService
  ) {}
  userId = this.tokenService.getUser()._id;

  addToCart(productId: string) {
    const data = {
      userId: this.userId,
      products: {
        productId: productId,
        quantity: 1,
      },
    };

    this.productService.addToCart(data).subscribe({
      next: (response) => {
        console.log('Added to cart:', response);
      },
      error: (error) => {
        console.error('Error adding to cart:', error);
      },
    });
  }

  toggleFavourite(event: Event) {
    const favouriteBtn = event.target as HTMLInputElement;
    if(favouriteBtn.checked) {
      this.favouriteService.addToFavourite({productId: this.product._id}).subscribe({
        next: (response) => {
          this.favouriteService.favoritesUpdatedSubject.next();
        },
        error: (error) => {
          console.error('Error adding to favourite:', error);
        },
      });
    } else {
      this.favouriteService
        .deleteProduct(this.product._id)
        .subscribe({
          next: (response) => {
            this.favouriteService.favoritesUpdatedSubject.next();
          },
          error: (error) => {
            console.error('Error removing from favourite:', error);
          },
        });
    }
  }
}




