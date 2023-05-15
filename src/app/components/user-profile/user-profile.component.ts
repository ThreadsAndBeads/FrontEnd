import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  currentUser: any;
  userId = this.tokenService.getUser()._id;
  showButton = false;
  constructor(
    private tokenService: TokenStorageService,
    private authService: AuthService,
    private modalService: NgbModal) {
  }
  openUploadModal() {
    // const modalRef = this.modalService.open(UploadModalComponent);
    // modalRef.result.then(
    //   (result) => {
    //     // Handle modal close
    //     if (result === 'uploaded') {
    //       // Perform necessary actions after successful upload
    //     }
    //   },
    //   (reason) => {
    //     // Handle modal dismissal (e.g., when the user closes the modal without uploading)
    //   }
    // );
    console.log("hiii");
  }

  userData = this.authService.getUserByID(this.userId).subscribe((data: any) => {
    // let userD = data.user.user;
    this.userData = data.data.user;
    data = this.userData;

      this.currentUser= {
    _id: this.userId,
    name: data.name,
    email: data.email,
    type: data.type,
    image:  data.image || '',
    phone:  data.phone || null,
    address: {
      appartmentNo: data.address.appartmentNo || null,
      city: data.address.city || null,
      country: data.address.country || null,
    },
    socialMediaLinks: [
      { name: "facebook", link: data.socialMediaLinks[0].link },
      { name: "instagram", link: data.socialMediaLinks[1].link }
    ]
      };

});
}
