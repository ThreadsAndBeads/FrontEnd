import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';

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
    private http: HttpClient,
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
        this.tokenService.setToken(response.token);
        this.router.navigate(['']);
      },
      error: (error) => {
        if (error.error.message === 'Wrong password') {
          this.error.password = error.error.message;
        } else if (
          error.error.message === 'Please verify your email to login' ||
          error.error.message === 'Login failed, User does not exist'
        ) {
          this.error.email = error.error.message;
        }
      },
    });
  }
}

