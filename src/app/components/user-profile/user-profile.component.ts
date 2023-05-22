import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  currentUser: any;
  userData: any;
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
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.getUserByID(this.userId).subscribe({next:(data: any) => {
      this.userData = data.data.user;
      // console.log(this.userData);
      //data = userData;

      // this.currentUser = {
      //   // _id: this.userId,
      //   name: this.userData.name,
      //   email: this.userData.email,
      //   type: this.userData.type,
      //   image: this.userData.image,
      //   phone: this.userData.phone || null,
      //   address: {
      //     // appartmentNo: userData.address.appartmentNo || null,
      //     city: this.userData.address.city || null,
      //     country: this.userData.address.country || null,
      //   },
      //   socialMediaLinks: [
      //     { name: 'facebook', link: this.userData.socialMediaLinks[0].link },
      //     { name: 'instagram', link: this.userData.socialMediaLinks[1].link },
      //   ],
      // };
      // console.log(this.currentUser);
    },error:(error) => {

    }});
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
}
