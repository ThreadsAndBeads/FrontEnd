import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  email: string = '';
  password: string = '';
  error = {
    email: '',
    password: ''
  };
  constructor(private http: HttpClient , private router: Router) { }

  onSignInSubmit() {
    const userData = {
      email: this.email,
      password: this.password,
    };
    console.log(userData);
    this.http.post<any>('http://localhost:7000/api/v1/users/login', userData)
    .subscribe({
      next: (response) => {

        if (response && response.message === 'Logged in successfully') {
          this.router.navigate(['']);
        }
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 401 && error.error && error.error.message === 'Wrong password') {
          this.error.password = error.error.message;
        } else if (error.status === 404 && error.error && error.error.message === 'Login failed, User does not exist') {
          this.error.email = error.error.message;
        }
      }
    });

  }
}

