import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Router} from "@angular/router"
import { error } from 'jquery';
import { SellerService } from 'src/app/services/seller.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
  currentUser: any;
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
    private sellerService: SellerService,
  private router:Router) {
  }

  saveImage(imageInput: HTMLInputElement) {
    const file = imageInput.files?.[0];

    if (file) {

      console.log('File selected:', file);
      const formData: any = new FormData();

      formData.append(`image`,file, file.name)
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
  ngOnInit() {

    this.authService.getUserByID(this.userId).subscribe((data: any) => {
    let userData;
    userData = data.data.user;

    console.log(userData);
    if(userData.type=='seller') {
     this.getSellerStatistics()   
    //  console.log(this.totalOrders) 
    }
    //data = userData;
      this.currentUser= {
    _id: this.userId,
    name: userData.name,
    email: userData.email,
    type: userData.type,
    image:  userData.image || '',
    phone:  userData.phone || null,
    address: {
      appartmentNo: userData.address.appartmentNo || null,
      city: userData.address.city || null,
      country: userData.address.country || null,
    },
    socialMediaLinks: [
      { name: "facebook", link: userData.socialMediaLinks[0].link },
      { name: "instagram", link: userData.socialMediaLinks[1].link }
    ]
      };



  });
}

    checkIfSeller(){
      this.authService.getUserByID(this.userId).subscribe({next:(data: any) => {
        console.log(data);
        
      },error:(error: any) => {}})
    }

    getSellerStatistics(){
      this.sellerService.getSellerStatistics(this.userId).subscribe(
        {
          next:(data:any)=>{ 
            this.revenue=data.totalRevenue;
            this.totalOrders=data.totalOrders;
           },
          error:(error: any) => {console.log(error)}
       }
      )
    }
}
