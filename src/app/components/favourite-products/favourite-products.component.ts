import { Component, Input } from '@angular/core';
import { FavouriteService } from 'src/app/services/favourite.service';

@Component({
  selector: 'app-favourite-products',
  templateUrl: './favourite-products.component.html',
  styleUrls: ['./favourite-products.component.css'],
})
export class FavouriteProductsComponent {
  @Input() product: any;

  constructor(private favouriteService: FavouriteService) {}

  deleteProduct(productId: any) {
    this.favouriteService.deleteProduct(productId).subscribe({
      next: () => {
        this.favouriteService.favoritesUpdatedSubject.next();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  addToCart(productId: any){

  }
}
