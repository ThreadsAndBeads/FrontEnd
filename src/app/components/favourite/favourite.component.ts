import { Component, OnInit } from '@angular/core';
import { FavouriteService } from 'src/app/services/favourite.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css'],
})
export class FavouriteComponent implements OnInit {
  constructor(private favouriteService: FavouriteService) {}

  ngOnInit(): void {
    this.favouriteService.favoritesUpdated$.subscribe(() => {
      this.getFavoriteProducts();
    });
  }

  deleteProduct(productId: any) {
    this.favouriteService.deleteProduct(productId).subscribe({
      next: () => {
        // Success callback (optional)
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  clearFavourite() {
    this.favouriteService.clearFavourite().subscribe({
      next: () => {
        // Success callback (optional)
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  addToFavourite(data: any) {
    this.favouriteService.addToFavourite(data).subscribe({
      next: (Response) => {
        // Success callback (optional)
      },
      error: (error) => {
        console.log(error);
      }
  });
  }

  getFavoriteProducts() {
    this.favouriteService.getFavouritesProducts().subscribe((products) => {
      // Update the component's favorite products with the updated data
    });
  }
}
