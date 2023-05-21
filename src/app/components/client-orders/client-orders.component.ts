import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order.model';
import { OrderService } from 'src/app/services/order.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Product } from '../../model/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-client-orders',
  templateUrl: './client-orders.component.html',
  styleUrls: ['./client-orders.component.css']
})
export class ClientOrdersComponent implements OnInit{
  orders: any;
  selectedOrder: any;

  openModal(orderItem: any) {
    this.selectedOrder = orderItem;
  }
  userId = this.tokenService.getUser()._id;
  constructor(
    private orderService: OrderService,
    private tokenService: TokenStorageService,
    private productService: ProductService
  ) { }
  ngOnInit() {
    // this.orderService.getClientOrder(this.userId).subscribe({
    //   next: (response: any) => {
    //     this.orders = response.data.data;
    //     console.log(this.orders);
    //     console.log(this.orders[0].products[0].productId);
    //   },
    //   error: (error) => {
    //     console.log(error);

    //   },
    // })
    this.orderService.getClientOrder(this.userId).subscribe({
      next: (response: any) => {
        this.orders = response.data.data;
        console.log(this.orders);

        this.orders.forEach((order: any) => {

          const productId = order.products[0].productId;

          this.productService.getOneProduct(productId).subscribe({
            next: (productResponse: any) => {

              order.productData = productResponse.data;
              console.log(order.productData);

            },
            error: (error) => {
              console.log(error);
            }
          });
        });
        console.log(this.orders);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
