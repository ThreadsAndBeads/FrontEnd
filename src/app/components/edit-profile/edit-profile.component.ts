import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from 'src/app/model/file-handler.model';
import { User } from 'src/app/model/userProfile.model';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { switchMap, map } from 'rxjs/operators';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  userId = this.tokenService.getUser()._id;
  userD: any;
  user!: User;
  userData = this.authService.getUserByID(this.userId).subscribe((data: any) => {
    // let userD = data.user.user;
    this.userData = data.data.user;
     data = this.userData;
  // console.log(data.name);

      this.user= {
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
  // userData: any;
  userForm!: FormGroup;
  // user: User = {
  //   _id: this.userId,
  //   name: this.userD.name,
  //   email: this.userData.email,
  //   type: this.userData.type,
  //   image:  this.userData.image || '',
  //   phone:  this.userData.phone || null,
  //   address: {
  //     appartmentNo: this.userData.address.appartmentNo || null,
  //     city: this.userData.address.city || null,
  //     country: this.userData.address.country || null,
  //   },
  //   socialMediaLinks: [
  //     { name: "facebook", link: this.userData.socialMediaLinks[0].link },
  //     { name: "instagram", link: this.userData.socialMediaLinks[1].link }
  //   ]
  // };
  constructor(private sanitizer: DomSanitizer, private tokenService: TokenStorageService, private authService: AuthService) {
    // this.getUserData();
  }

  prepareFormData(user: User): FormData{
    const formData: any = new FormData();
    formData.append('address[appartmentNo]', user.address.appartmentNo);
    formData.append('address[city]', user.address.city);
    formData.append('address[country]', user.address.country);
    formData.append('phone', user.phone);
    user.socialMediaLinks.forEach((link, index) => {
      formData.append(`socialMediaLinks[${index}][name]`, link.name);
      formData.append(`socialMediaLinks[${index}][link]`, link.link);
    });
    // console.log(user);
    // let image = user.image;/
    formData.append(`image`,user?.image?.file, user?.image?.file!.name)

    return formData;
  }
  onFileSelected(event :any){
    if(event.target.files){
      console.log(event.target.files[0])
     const file = event.target.files[0];
     const fileHandle : FileHandle = {
      file : file ,
      url : this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
     }
      this.user.image = fileHandle;
     console.log(fileHandle)
    }
  }
  removeImage() {
    console.log("in remove");
    this.user.image.file = undefined;
    this.user.image.url = "";
    // this.user.image = [];
  }
  fileDropped(fileHandel : FileHandle){
    this.user.image =  fileHandel;
  }
  editProfile() {
    // const userForm = this.prepareFormData(this.user);
    this.authService.updateProfile( this.user,this.userId).subscribe(
      response => {
        this.tokenService.setUser(this.user)
        console.log(response);
      },
      error => {
        // Handle the error
      }
    );
  }
}
