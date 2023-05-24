import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  validationForm!: FormGroup;

  // email: string = '';
  // password: string = '';
  error = {
    email: '',
    password: '',
    invalidData: ''
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenStorageService,
    private fb: FormBuilder
  ) {
      this.validationForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
          ],
        ],
        rememberMe: [false],
      });
  }

  get email() {
      return this.validationForm.get('email');
    }

  get password() {
      return this.validationForm.get('password');
    }


  SignInSubmit() {
    if (this.validationForm.valid) {


      this.error.email = '';
      this.error.password = '';

      const userData = {
        email: this.email!.value,
        password: this.password!.value,
      };

      this.authService.login(userData).subscribe({
        next: (response) => {
          console.log(response.data.user._id);
          this.tokenService.setUser(response.data.user);
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
    }else{
      this.error.invalidData = 'Invalid data format!';
      console.log(this.password?.errors);
    }

  }
}

