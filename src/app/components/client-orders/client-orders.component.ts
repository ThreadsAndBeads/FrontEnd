import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order.model';
import { OrderService } from 'src/app/services/order.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-client-orders',
  templateUrl: './client-orders.component.html',
  styleUrls: ['./client-orders.component.css']
})
export class ClientOrdersComponent implements OnInit{
  orders: any;

  userId = this.tokenService.getUser()._id;
  constructor(
    private orderService: OrderService,
    private tokenService: TokenStorageService
  ) { }
  ngOnInit() {
    this.orderService.getClientOrder(this.userId).subscribe({
      next: (response: any) => {
        this.orders = response.data.data;
        console.log(this.orders);
      },
      error: (error) => {
        console.log(error);

      },
    })
  }
}
