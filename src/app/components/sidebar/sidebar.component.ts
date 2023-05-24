import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import * as bootstrap from 'bootstrap';
import * as jQuery from 'jquery';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  currentUser: any;
  isCustomer: any;
  constructor(
    private tokenService: TokenStorageService,
    private authService: AuthService) {
  }
  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser();
    this.isCustomer = !this.tokenService.isSeller();
  }
  ngAfterViewInit() {
    jQuery('body').on({
      click: (e: MouseEvent) => {
        const myOffcanvas = jQuery('#offcanvasRight')[0];
        const bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas);
        e.stopPropagation();
        bsOffcanvas.toggle();
      }
    }, '.toggle_btn');
  }
  onLogoutClick() {
    this.authService.logOut().subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
      });
    }
  }

