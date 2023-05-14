import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from 'src/app/model/file-handler.model';
import { User } from 'src/app/model/userProfile.model';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  userId = this.tokenService.getUser()._id;
  userData = this.tokenService.getUser();

  userForm!: FormGroup;
  user: User = {
    _id: this.userId,
    name: this.userData.name,
    email: this.userData.email,
    type: this.userData.type,
    image: "",
    phone: null,
    address: {
      appartmentNo: null,
      city: "",
      country: "",
    },
    socialMediaLinks: [
      { name: "facebook", link: "" },
      { name: "instagram", link: "" }
    ]
  };
  constructor(private sanitizer: DomSanitizer, private tokenService: TokenStorageService, private authService: AuthService) {
  }


  prepareFormData(user: User): FormData{
    const formData:any = new FormData();
    formData.append('appartmentNo', user.address.appartmentNo);
    formData.append('city', user.address.city);
    formData.append('country', user.address.country);
   // formData.append('phone', user.phone.toString());
    user.socialMediaLinks.forEach((link, index) => {
      formData.append(`socialMediaLinks[${index}][name]`, link.name);
      formData.append(`socialMediaLinks[${index}][link]`, link.link);
    });
    // console.log(user);
    // let image = user.image;
    // formData.append(`image`,user.image.file, user.file!.name)

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
    //  this.user.image.push(fileHandle)
     console.log(fileHandle)
    }
  }
  removeImage(i :number) {
    // this.user.image.splice(i,1);
  }
  fileDropped(fileHandel : FileHandle){
    // this.user.image.push(fileHandel);
  }
  editProfile() {
    this.authService.updateProfile( this.user,this.userId).subscribe(
      response => {
        // console.log(response);
        this.tokenService.setUser(this.user)
        console.log(response);
      },
      error => {
        // Handle the error
      }
    );
  }
}
