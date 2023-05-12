import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('myModal') myModal!: ElementRef;
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
  hasErrors: boolean = false;
  constructor(private authService: AuthService) { }
  ngOnInit() {
  }


  showModal() {
    const modal = new bootstrap.Modal(this.myModal.nativeElement);
    modal.show();
  }

  onSignUpSubmit() {
    this.error.email = '';
    this.error.password = '';
    this.error.name = '';
    this.error.type = '';
    this.hasErrors = false;
    const userData = {
      name: this.name,
      email: this.email,
      password: this.password,
      type: this.type
    };

    this.authService.signup(userData)
    .subscribe({
      next: (response) => {
        this.showModal();
        console.log(this.hasErrors);
        console.log(response.data);
      },
      error: (error) => {
        this.hasErrors = true;
        console.log(this.hasErrors);
        this.error = error.error.errors;
      }
    });
  }

  fbLogin() {
    this.authService.fbLogin().subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
