import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/product.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { FavouriteService } from 'src/app/services/favorite/favourite.service';
import { ProductService } from 'src/app/services/product/product.service';
import { TokenStorageService } from 'src/app/services/token/token-storage.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  quantity: number = 1;
  sellerName: string = '';
  isFavourite = false;
  activeImage: any;
  slideshowTimer: any;
  currentImageIndex = 0;
  isUserLoggedIn: boolean = false;
  userId = this.tokenService.getUser()._id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private cartService: CartService,
    private productService: ProductService,
    private tokenService: TokenStorageService,
    private favouriteService: FavouriteService
  ) {
    this.isUserLoggedIn = this.tokenService.isLoggedIn();
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.getProduct(id);
    this.startImageshow();
  }

  ngOnDestroy() {
    clearInterval(this.slideshowTimer);
  }

  getProduct(productId: string) {
    this.productService.getOneProduct(productId).subscribe({
      next: (response: any) => {
        this.product = response.data.data;
        if (this.product) {
          this.imageShow(0);
          this.getSeller(this.product.user_id);
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  imageShow(index: number) {
    const bullets = document.querySelectorAll('.bullet');
    if (bullets && bullets.length > index) {
      bullets.forEach((bullet: any) => {
        if (bullet.classList.contains('activebullet')) {
          bullet.classList.remove('activebullet');
        }
      });
      bullets[index].classList.add('activebullet');
    }
    this.activeImage = this.product.images[index];
  }

  startImageshow() {
    this.slideshowTimer = setInterval(() => {
      this.imageShow(this.currentImageIndex);
      if (this.currentImageIndex < this.product.images.length - 1) {
        this.currentImageIndex++;
      } else {
        this.currentImageIndex = 0;
      }
    }, 3000);
  }

  getSeller(userId: any) {
    this.authService.getUserByID(userId).subscribe({
      next: (response: any) => {
        this.sellerName = response.data.user.name;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  incQuantity() {
    if (this.quantity < this.product.inStock) {
      this.quantity++;
    }
  }

  decQuantity() {
    console.log('clicked');
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  changeQuantity() {
    if (this.quantity < 1) {
      this.quantity = 1;
    } else if (this.quantity > this.product.inStock) {
      this.quantity = this.product.inStock;
    }
  }

  toggleFavourite(event: Event) {
    const favouriteBtn = event.target as HTMLInputElement;
    if (favouriteBtn.checked) {
      this.addToFavourite();
    } else {
      this.removeFromFavourite();
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
          console.error('Error adding to favourite:', error);
        },
      });
  }

  removeFromFavourite() {
    this.favouriteService.deleteProduct(this.product._id).subscribe({
      next: (response) => {
        this.favouriteService.favoritesUpdatedSubject.next();
      },
      error: (error) => {
        console.error('Error removing from favourite:', error);
      },
    });
  }

  isInFavourite() {
    this.favouriteService.isInFavourite(this.product._id).subscribe({
      next: (response) => {
        this.isFavourite = response;
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  addToCart(productId: any) {
    const data = {
      userId: this.userId,
      products: {
        productId: productId,
        quantity: this.quantity,
      },
    };

    if (this.isUserLoggedIn) {
      this.cartService.addToCart(data).subscribe({
        next: (response) => {
          this.cartService.cartUpdatedSubject.next();
        },
        error: (error) => {
          console.error('Error adding to cart:', error);
        },
      });
    } else {
      this.router.navigateByUrl('/auth');
    }
  }
}
