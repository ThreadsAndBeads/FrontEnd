import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService ,GoogleSigninButtonModule, SocialLoginModule, SocialUser} from '@abacritt/angularx-social-login';

import { Router } from '@angular/router';
import {  AuthService } from 'src/app/services/auth.service';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  validationForm!: FormGroup;

  @ViewChild('myModal') myModal!: ElementRef;
  private accessToken = '';
  // name: string = '';
  // email: string = '';
  // password: string = '';
  // type: string = '';
  error = {
    name: '',
    email: '',
    password: '',
    type: '',
  };
  user?: SocialUser;
  loggedIn: any;
  constructor(
    private authService: AuthService,
    private socialAuthService: SocialAuthService,
    private router: Router,
    private tokenService: TokenStorageService,
    private fb: FormBuilder
  ) {
    this.validationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name:['', [Validators.required, Validators.minLength(5)]],
      type:['', [Validators.required]]
    });
  }
  hasErrors: boolean = false;

  get email() {
    return this.validationForm.get('email');
  }

  get password() {
    return this.validationForm.get('password');
  }

  get name() {
    return this.validationForm.get('name');
  }

  get type() {
    return this.validationForm.get('type');
  }

  ngOnInit() {
    this.socialAuthService.authState.subscribe({
      next: (user) => {
        this.user = user;
        this.loggedIn = user != null;
        this.authService
          .googleLogin({
            name: user.name,
            email: user.email,
            image: user.photoUrl,
            password: user.idToken,
            id: user.id,
          })
          .subscribe({
            next: (response: any) => {
              console.log(response);

              let newUser = response.data.user;

              this.tokenService.setUser(newUser);
              this.tokenService.setToken(response.token);
              this.router.navigate(['/home']);
            },
            error: (err) => {
              console.log(err);
            },
          });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  showModal() {
    const modal = new bootstrap.Modal(this.myModal.nativeElement);
    modal.show();
  }

  onSignUpSubmit() {
    if (this.validationForm.valid) {
      this.error.email = '';
      this.error.password = '';
      this.error.name = '';
      this.error.type = '';
      this.hasErrors = false;

      const userData = {
        name: this.name!.value,
        email: this.email!.value,
        password: this.password!.value,
        type: this.type!.value,
      };

      this.authService.signup(userData).subscribe({
        next: (response) => {
          this.showModal();
          console.log(this.hasErrors);
          console.log(response.data);
        },
        error: (error) => {
          this.hasErrors = true;
          console.log(this.hasErrors);
          this.error = error.error.errors;
        },
      });
    }
  }
  signInWithFB(): void {
    console.log(
      this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID)
    );
  }
}
