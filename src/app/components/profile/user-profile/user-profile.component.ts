import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenStorageService } from 'src/app/services/token/token-storage.service';
import { Router } from '@angular/router';
import { SellerService } from 'src/app/services/seller/seller.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  currentUser: any;
  userData: any;
  revenue: any;
  totalOrders: any;
  userId = this.tokenService.getUser()._id;
  fileText: string = 'Not selected file';

  onFileChange(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.fileText = 'One file selected';
    } else {
      this.fileText = 'Not selected file';
    }
  }

  constructor(
    private tokenService: TokenStorageService,
    private authService: AuthService,
    private router: Router,
    private sellerService: SellerService
  ) {}

  ngOnInit() {
    this.authService.getUserByID(this.userId).subscribe({
      next: (data: any) => {
        this.userData = data.data.user;
        if (this.userData.type == 'seller') {
          this.getSellerStatistics();
        }
      },
      error: (error) => {},
    });
  }

  saveImage(imageInput: HTMLInputElement) {
    const file = imageInput.files?.[0];

    if (file) {
      console.log('File selected:', file);
      const formData: any = new FormData();

      formData.append(`image`, file, file.name);
      this.authService.uploadImage(formData, this.userId).subscribe({
        next: (response) => {
          console.log(response);
          location.reload();
          this.router.navigate(['/profile']);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  checkIfSeller() {
    this.authService.getUserByID(this.userId).subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (error: any) => {},
    });
  }

  getSellerStatistics() {
    this.sellerService.getSellerStatistics(this.userId).subscribe({
      next: (data: any) => {
        this.revenue = data.totalRevenue;
        this.totalOrders = data.totalOrders;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
