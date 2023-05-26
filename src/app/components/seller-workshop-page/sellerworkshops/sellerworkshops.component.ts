import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationExtras, Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { Workshop } from 'src/app/model/workshop.model';
import { WorkshopService } from 'src/app/services/workshop/workshop.service';

@Component({
  selector: 'app-sellerworkshops',
  templateUrl: './sellerworkshops.component.html',
  styleUrls: ['./sellerworkshops.component.css'],
})
export class SellerworkshopsComponent {
  @Input() workshop: any;
  @Input() index: any;
  workshopIdToDelete: any;

  @ViewChild('myModal') myModal!: ElementRef;
  constructor(
    private workshopService: WorkshopService,
    private router: Router
  ) {}

  deleteWorkshop(workshopId: string) {
    console.log(workshopId);

    this.workshopService.deleteWorkshop(workshopId).subscribe({
      next: (data) => {
        location.reload();
        this.router.navigate(['seller/myWorkshops']);
      },
      error: (err) => {},
    });
  }

  showModal() {
    const modal = new bootstrap.Modal(this.myModal.nativeElement);
    modal.show();
  }

  openEditWorkshopModal() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(this.workshop),
      },
    };

    this.router.navigate([
      `seller/editWorkshop/${this.workshop._id}`,
      navigationExtras,
    ]);
  }

  calculateDuration() {
    const start = new Date(this.workshop.startDate);
    const end = new Date(this.workshop.endDate);
    const durationInMilliseconds = end.getTime() - start.getTime();
    const durationInDays = Math.floor(
      durationInMilliseconds / (1000 * 60 * 60 * 24)
    );
    return `From ${this.formatDate(start)} to ${this.formatDate(end)} (${durationInDays} days)`;
  }

  formatDate(date: Date) {
    const day = date.getDate();
    const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(
      date
    );
    return `${day} ${month}`;
  }
}
