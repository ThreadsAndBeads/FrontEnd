import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sellercard',
  templateUrl: './sellercard.component.html',
  styleUrls: ['./sellercard.component.css']
})
export class SellercardComponent {
  @Input() seller: any
}
