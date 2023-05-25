import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Workshop } from 'src/app/model/workshop.model';
import { WorkshopService } from 'src/app/services/workshop/workshop.service';
import { TokenStorageService } from '../../../services/token/token-storage.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-workshop-card',
  templateUrl: './workshop-card.component.html',
  styleUrls: ['./workshop-card.component.css'],
})
export class WorkshopCardComponent implements OnInit {
  @Input() workshop: any;
  sellerImage: any;

  constructor(
    private workshopService: WorkshopService,
    private AuthService: AuthService
  ) {}

  ngOnInit(): void {
    this.getSeller(this.workshop.seller_id);
  }

  getSeller(userId: any) {
    this.AuthService.getUserByID(userId).subscribe({
      next: (response: any) => {
        if (response.data.user.image){
          this.sellerImage = response.data.user.image;
        } else {
          
        }
        console.log(this.sellerImage);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  sendWorkshopEmail() {
    const nameInput = document.getElementById('nameInput') as HTMLInputElement;
    const emailInput = document.getElementById(
      'emailInput'
    ) as HTMLInputElement;

    const data = {
      name: nameInput.value,
      email: emailInput.value,
    };
    this.workshopService.sendWorkshopEmail(data).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}




