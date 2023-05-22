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
  step1: any;
  step2: any;
  step3: any;
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
  setActiveStatus(orderStatus: any): boolean {
    this.step1 = document.querySelector('#step1');
    this.step2 = document.querySelector('#step2');
    this.step3 = document.querySelector('#step3');

    this.step1.classList.remove('active');
    this.step2.classList.remove('active');
    this.step3.classList.remove('active');

    switch (orderStatus) {
      case 'delivered':
        this.step1.classList.add('active');
        this.step2.classList.add('active');
        this.step3.classList.add('active');
        break;
      case 'shipped':
        this.step1.classList.add('active');
        this.step2.classList.add('active');
        break;
      default:
        this.step1.classList.add('active');
        break;
    }

    return this.selectedOrder?.orderStatus === orderStatus;
  }

  cancelOrder(id: any) {
    this.orderService.cancelOrder(id).subscribe({
      next: (Response: any) => {
        location.reload();
      
      },
      error:  (error) => {
        console.log(error);
      },
    });
  }

}
