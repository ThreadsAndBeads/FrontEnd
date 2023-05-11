import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import * as bootstrap from 'bootstrap';
import * as jQuery from 'jquery';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  currentUser: any;
  constructor(
    private tokenService: TokenStorageService,
    private userService: UserService) {
  }
  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser();
  }
  ngAfterViewInit() {
    jQuery('body').on({
      click: (e: MouseEvent) => {
        const myOffcanvas = jQuery('#offcanvasRight')[0];
        const bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas);
        e.stopPropagation();
        bsOffcanvas.toggle();
        console.log('hit');
      }
    }, '.toggle_btn');
  }
  onLogoutClick() {
    this.userService.logOut().subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
      });
    }
  }

