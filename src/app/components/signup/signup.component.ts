import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent{

  name: string = '';
  email: string = '';
  password: string = '';
  type: string = '';
  error = {
    email: '',
    password: ''
  };
  constructor(private http: HttpClient) { }

  onSignUpSubmit() {
    const userData = {
      name: this.name,
      email: this.email,
      password: this.password,
      type: this.type
    };
    this.http.post<any>('http://localhost:7000/api/v1/users/signup', userData)
    .subscribe({
      next: (response) => {
        console.log(response.data);
      },
      error: (error: HttpErrorResponse) => {
        this.error = error.error.errors;
      }
    });
  }
}
