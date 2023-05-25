import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenStorageService } from 'src/app/services/token/token-storage.service';

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
          // this.VerifyToken();
      },
      error:err=>{

      }
      
    });
  }


  ngOnInit() {

    this.Init();
  }

  Init() {
    this.ResponseResetForm = this.fb.group(
      {
        resettoken: [this.resetToken],
        password: ['', [Validators.required, Validators.minLength(4)]],
        // confirmPassword: ['', [Validators.required, Validators.minLength(4)]]
      }
    );
  }

  ResetPassword(form:any) {
    if (form.valid) {
      this.IsResetFormValid = true;
      const userData = {
        password: this.ResponseResetForm.value.password,
      };
      console.log(userData);
      this.authService.newPassword(userData,this.ResponseResetForm.value.resettoken).subscribe(
        {
        next:data => {
          this.ResponseResetForm.reset();
          this.successMessage = data.message;
          setTimeout(() => {
            this.successMessage = null;
            this.router.navigate(['auth']);
          }, 3000);
        },
        error:err => {
          console.log("ssa");
          
          if (err.error.message) {
            this.errorMessage = err.error.message;
          }
        }
    });
    } else { this.IsResetFormValid = false; }
  }

}
