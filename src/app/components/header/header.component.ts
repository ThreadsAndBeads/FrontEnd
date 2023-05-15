// import { Component, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product.model';

import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent  {
  isUserLoggedIn: string|null = '';
  totalCartProducts: Number = 0;

  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenStorageService,
    private productService: ProductService,
    private cartService: CartService
  ) {
    this.getCartCount();
  }

  handleClick() {
    if (this.isUserLogged()) {
    } else {
      this.router.navigateByUrl('/auth');
    }
  }

  public isUserLogged() {
    return this.isUserLoggedIn = this.tokenService.getToken();
  }

  public getCartCount() {
    this.cartService.getProductsCount().subscribe({
      next: (Response) => {
        this.totalCartProducts = Response.totalProducts;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const navbar = document.querySelector('.navbar') as HTMLElement;
    if (window.pageYOffset > navbar.clientHeight) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

}
