import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  currentUser: any;
  constructor(
    private tokenService: TokenStorageService,
    private authService: AuthService) {
  }
  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser();
  }
}
