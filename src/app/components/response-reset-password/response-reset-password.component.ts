import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-response-reset-password',
  templateUrl: './response-reset-password.component.html',
  styleUrls: ['./response-reset-password.component.css']
})
export class ResponseResetPasswordComponent {
  ResponseResetForm: any;
  errorMessage: any;
  successMessage: any;
  resetToken: any;
  CurrentState: any;
  IsResetFormValid = true;
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private tokenService: TokenStorageService,
    private fb: FormBuilder ) {

    this.CurrentState = 'Wait';
    this.route.params.subscribe(
      {
        next:(params:any) => {
          this.resetToken = params.token;
          console.log(this.resetToken);
          this.VerifyToken();
      },
      error:err=>{

      }
      
    });
  }


  ngOnInit() {

    this.Init();
  }

  VerifyToken() {
    console.log(this.resetToken);
    
    this.authService.ValidPasswordToken(this.resetToken ).subscribe(
      {
        next:data => {
          this.CurrentState = 'Verified';
        },
        error:err => {
          this.CurrentState = 'NotVerified';
        }
      }
    );
  }

  Init() {
    this.ResponseResetForm = this.fb.group(
      {
        resettoken: [this.resetToken],
        newPassword: ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(4)]]
      }
    );
  }

  Validate(passwordFormGroup: any) {
    const new_password = passwordFormGroup.controls.newPassword.value;
    const confirm_password = passwordFormGroup.controls.confirmPassword.value;

    if (confirm_password.length <= 0) {
      return null;
    }

    if (confirm_password !== new_password) {
      return {
        doesNotMatch: true
      };
    }

    return null;
  }


  ResetPassword(form:any) {
    // console.log(form.get('confirmPassword'));
    if (form.valid) {
      this.IsResetFormValid = true;
      this.authService.newPassword(this.ResponseResetForm.value).subscribe(
        data => {
          this.ResponseResetForm.reset();
          this.successMessage = data.message;
          setTimeout(() => {
            this.successMessage = null;
            this.router.navigate(['register']);
          }, 3000);
        },
        err => {
          if (err.error.message) {
            this.errorMessage = err.error.message;
          }
        }
      );
    } else { this.IsResetFormValid = false; }
  }
}
