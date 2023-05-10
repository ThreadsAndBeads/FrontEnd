import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  email: string = '';
  password: string = '';
  error = {
    email: '',
    password: '',
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenStorageService
  ) {}

  onSignInSubmit() {
    this.error.email = '';
    this.error.password = '';

    const userData = {
      email: this.email,
      password: this.password,
    };

    this.authService.login(userData).subscribe({
      next: (response) => {
        console.log(response.data.user._id);
        this.tokenService.setUser(response.data.user)
        this.tokenService.setToken(response.token);
        this.router.navigate(['']);
      },
      error: (error) => {
        if (error.error.message === 'Wrong password') {
          this.error.password = error.error.message;
        } else if (
          error.error.message === 'Please verify your email to login' ||
          error.error.message === "This email doesn't exist"
        ) {
          this.error.email = error.error.message;
        }
      },
    });
  }
}

