import { Component, Input, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-seller-order-card',
  templateUrl: './seller-order-card.component.html',
  styleUrls: ['./seller-order-card.component.css']
})
export class SellerOrderCardComponent implements OnInit {
  @Input() order: any
  constructor(protected orderService: OrderService) {}


  ngOnInit(): void {
    console.log(this.order.products[0]!.productId);
    const productId=this.order.products[0]!.productId
   
  }
  
}
