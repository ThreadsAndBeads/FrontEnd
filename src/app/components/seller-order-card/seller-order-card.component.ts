import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-seller-order-card',
  templateUrl: './seller-order-card.component.html',
  styleUrls: ['./seller-order-card.component.css']
})
export class SellerOrderCardComponent {
  @Input() order: any
}
