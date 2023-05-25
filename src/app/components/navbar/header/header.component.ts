import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { FavouriteService } from 'src/app/services/favorite/favourite.service';
import { TokenStorageService } from 'src/app/services/token/token-storage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit{
  isUserLoggedIn: string | null = '';
  totalCartProducts: Number = 0;
  totalFavouritesProducts: Number = 0;
  public data: any;

  constructor(
    private router: Router,
    private tokenService: TokenStorageService,
    private cartService: CartService,
    private favouriteService: FavouriteService,
    private translate: TranslateService
  ) {
    this.getCartCount();
    this.getFavouritesCount();
    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('en');
    translate.addLangs(['en' ,'ar']);
    translate.setDefaultLang('en')
  }

  ngOnInit(): void {
    
    this.favouriteService.favoritesUpdated$.subscribe(() => {
      this.getFavouritesCount();
    });
    this.cartService.cartUpdated$.subscribe(() => {
      this.getCartCount();
    });
  }
  
  handleClick() {
    if (this.isUserLogged()) {
    } else {
      this.router.navigateByUrl('/auth');
    }
  }

  public isUserLogged() {
    return (this.isUserLoggedIn = this.tokenService.getToken());
  }

  public getCartCount() {
    if (this.isUserLogged()) {
    this.cartService.getProductsCount().subscribe({
      next: (response) => {
        this.totalCartProducts = response.totalProducts;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  }
  public getFavouritesCount() {
    if (this.isUserLogged()) {
    this.favouriteService.getFavouritesProductsCount().subscribe({
      next: (response) => {
        this.totalFavouritesProducts = response.totalFavourites;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  }

  useLang(language: string) {
    this.translate.use(language);
    localStorage.setItem('language', language);
  }
  languageChanged(selectedValue: any) {
    if (selectedValue.target.value === 'english') {
      this.useLang('en');
      document.documentElement.setAttribute('dir', 'ltr');
    } else if (selectedValue.target.value === 'arabic') {
      this.useLang('ar');
      if (this.router.url !== '/home') {
        document.documentElement.setAttribute('dir', 'rtl');
      }
    }
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
