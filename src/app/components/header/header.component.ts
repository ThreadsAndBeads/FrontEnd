import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { FavouriteService } from 'src/app/services/favourite.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import {io}  from 'socket.io-client';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit{
  isUserLoggedIn: string | null = '';
  totalCartProducts: Number = 0;
  totalFavouritesProducts: Number = 0;
  private socket: any;
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
    this.socket = io('http://127.0.0.1:7000', { transports: ['websocket'] });
  }

  ngOnInit(): void {
    let userId = this.tokenService.getUser()._id ;     
    const room = `seller_${userId}`;
    this.socket.emit("join", room);
    this.socket.on("notification", (data: any) => {
      this.data = data;
    });
    
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
    this.cartService.getProductsCount().subscribe({
      next: (response) => {
        this.totalCartProducts = response.totalProducts;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public getFavouritesCount() {
    this.favouriteService.getFavouritesProductsCount().subscribe({
      next: (response) => {
        this.totalFavouritesProducts = response.totalFavourites;
      },
      error: (error) => {
        console.log(error);
      },
    });
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
  ngOnDestroy(): void {
    // Leave the seller's room when the component is destroyed
    const sellerId = "123"; // replace with the seller's id
    const room = `seller_${this.tokenService.getUser()._id }`;
    this.socket.emit("leave", room);
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
