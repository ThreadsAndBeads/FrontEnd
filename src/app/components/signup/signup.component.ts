import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

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
    name: '',
    email: '',
    password: '',
    type: ''
  };
  constructor( private authService: AuthService,) { }

  onSignUpSubmit() {
    this.error.email = '';
    this.error.password = '';
    this.error.name = '';
    this.error.type = '';

    const userData = {
      name: this.name,
      email: this.email,
      password: this.password,
      type: this.type
    };
    
    this.authService.signup(userData)
    .subscribe({
      next: (response) => {
        console.log(response.data);
      },
      error: (error) => {
        this.error = error.error.errors;
      }
    });
  }
}
