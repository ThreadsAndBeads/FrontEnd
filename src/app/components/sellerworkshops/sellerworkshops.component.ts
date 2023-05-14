import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sellerworkshops',
  templateUrl: './sellerworkshops.component.html',
  styleUrls: ['./sellerworkshops.component.css']
})
export class SellerworkshopsComponent {
@Input () workshop: any
}
