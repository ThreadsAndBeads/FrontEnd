import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService ,GoogleSigninButtonModule, SocialLoginModule, SocialUser} from '@abacritt/angularx-social-login';

import { Router } from '@angular/router';
import {  UserService } from 'src/app/services/user.service';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { TokenStorageService } from 'src/app/services/token-storage.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})


export class SignupComponent implements OnInit {
  @ViewChild('myModal') myModal!: ElementRef;
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
  loggedIn: any;
  constructor( private userService: UserService,private authService: SocialAuthService,private router:Router, private tokenService: TokenStorageService) { }
  hasErrors: boolean = false;
 

  ngOnInit() {
    this.authService.authState.subscribe( {
        next:(user)=>{
          // this.user = user;
          // this.loggedIn = (user != null);
          this.userService.googleLogin({name:user.name,email:user.email,image:user.photoUrl,password:user.idToken,id:user.id}).subscribe({
            next:(res)=>{    
                this.tokenService.setUser(user)
                this.tokenService.setToken(user.idToken);
                this.router.navigate(['/home']);
            },
            error:(err)=>{
              console.log(err);
            }
          })
        },
        error:(err)=>{
          console.log(err);
          
        }
    });

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
    
    this.userService.signup(userData)
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
    this.userService.fbLogin().subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  // refreshToken(): void {
  //   this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  // }

  // getAccessToken(): void {
  //   this.authService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(accessToken => this.accessToken = accessToken);
  // }

}
