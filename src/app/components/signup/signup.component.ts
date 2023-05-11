import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService ,GoogleSigninButtonModule, SocialLoginModule, SocialUser} from '@abacritt/angularx-social-login';

import { Component, ElementRef, NgModule, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {  UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent{
  private accessToken = '';
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
  user?: SocialUser;
  constructor( private userService: UserService,private authService: SocialAuthService,private router:Router) { }

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
    
    this.userService.signup(userData)
    .subscribe({
      next: (response) => {
        console.log(response.data);
      },
      error: (error) => {
        this.error = error.error.errors;
      }
    });
  }

  fbLogin() {
    this.userService.fbLogin().subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  // refreshToken(): void {
  //   this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  // }

  // getAccessToken(): void {
  //   this.authService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(accessToken => this.accessToken = accessToken);
  // }

  googleLogin(){
    console.log('555555');
    
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe({
      next:(user)=>{
        this.userService.googleLogin({name:user.name,email:user.email,image:user.photoUrl}).subscribe({
          next:(res)=>{
            if(res){
              
              this.router.navigate(['/'])
            }
          },
          error:(err)=>{
            console.log(err);
            
          }
        })
      },
      error:(err)=>{
        console.log(err);
        
      }
    })

  }
}
