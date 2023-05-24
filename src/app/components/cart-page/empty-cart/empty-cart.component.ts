import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-empty-cart',
  templateUrl: './empty-cart.component.html',
  styleUrls: ['./empty-cart.component.css'],
})
export class EmptyCartComponent {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
