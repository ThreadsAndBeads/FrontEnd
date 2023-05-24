import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SuccessModalComponent } from 'src/app/components/success-modal/success-modal.component';
@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {
  RequestResetForm: any;
  forbiddenEmails: any;
  errorMessage: any;
  successMessage: any;
  IsvalidForm = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.RequestResetForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
    });
  }

  RequestResetUser(form: any) {
    if (form.valid) {
      this.IsvalidForm = true;
      this.authService.requestReset(this.RequestResetForm.value).subscribe({
        next: (data) => {
          this.RequestResetForm.reset();
          this.successMessage = 'Reset password link sent to email successfully.';
          this.modalService.open(SuccessModalComponent, { centered: true });
        },
        error: (err) => {
          if (err.error.message) {
            this.errorMessage = err.error.message;
          }
        },
      });
    } else {
      this.IsvalidForm = false;
    }
  }
}