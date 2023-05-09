// import { Component, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isUserLoggedIn: string|null = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenStorageService,

  ) {

  }

  public isUserLogged() {
    return this.isUserLoggedIn = this.tokenService.getUserId();
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
