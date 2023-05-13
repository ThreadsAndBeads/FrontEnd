import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit{
  RequestResetForm: any;
  forbiddenEmails: any;
  errorMessage: any;
  successMessage: any;
  IsvalidForm = true;

  constructor(
    private authService: AuthService,
    private router: Router,
   ) {

  }
  ngOnInit() {

    this.RequestResetForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
    });
  }


  RequestResetUser(form:any) {
    // console.log(form)
    if (form.valid) {

      this.IsvalidForm = true;
      this.authService.requestReset(this.RequestResetForm.value).subscribe(
        {
        next:data => {
          this.RequestResetForm.reset();
          this.successMessage = "Reset password link send to email successfully.";
          // setTimeout(() => {
          //   this.successMessage = '';
          //   this.router.navigate(['register']);
          // }, 2000);
        },
        error:(err) => {
          if (err.error.message) {
            this.errorMessage = err.error.message;
          }
        }
    });
    } else {
      this.IsvalidForm = false;
    }
  }
}
