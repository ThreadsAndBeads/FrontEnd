import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FavouriteService } from 'src/app/services/favourite.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css'],
})
export class FavouriteComponent implements OnInit {
  favouriteProducts: any[] = [];
  constructor(private favouriteService: FavouriteService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getFavouriteProducts();
    this.favouriteService.favoritesUpdated$.subscribe(() => {
      this.getFavouriteProducts();
      this.cdr.detectChanges();
    });
  }

  clearFavourite() {
    this.favouriteService.clearFavourite().subscribe({
      next: () => {
        this.favouriteService.favoritesUpdatedSubject.next();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getFavouriteProducts() {
    this.favouriteService.getFavouritesProducts().subscribe({
      next: (response: any) => {
        if (response.data && response.data.products) {
          this.favouriteProducts = response.data.products;
        } else {
          this.favouriteProducts = [];
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
