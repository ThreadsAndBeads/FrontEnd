// import { Component, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product.model';

import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

interface Workshop {
  title: string;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isUserLoggedIn: string|null = '';
  showSearch = false;
  showDropdown = false;
  query = '';
  products: Product[] = [];
  workshops: Workshop[] = [];
  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenStorageService,
    private productService: ProductService, 

  ) {

  }
  handleClick() {
    if (this.isUserLogged()) {
    } else {
      this.router.navigateByUrl('/auth');
    }
  }

  public isUserLogged() {
    return this.isUserLoggedIn = this.tokenService.getUser()._id;
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
  toggleSearch() {
    this.showSearch = !this.showSearch;
    this.showDropdown = false;
  }

  search() {
    if (!this.query) {
      this.products = [];
      this.workshops = [];
      this.showDropdown = false;
      return;
    }

    this.productService.search(this.query).subscribe(
      (response : any) => {
        this.products = response.products;
        this.workshops = response.workshops;
        console.log(response);
        this.showDropdown = true;    
        },
      (error) => {
        console.error('Error adding to cart:', error);
      }
    
    );
  }

}
