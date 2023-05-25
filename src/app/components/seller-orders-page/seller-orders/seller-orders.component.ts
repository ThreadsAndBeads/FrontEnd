import { Component, OnInit, Output } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { TokenStorageService } from 'src/app/services/token/token-storage.service';
import { OrderService } from 'src/app/services/order/order.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-seller-orders',
  templateUrl: './seller-orders.component.html',
  styleUrls: ['./seller-orders.component.css']
})
export class SellerOrdersComponent implements OnInit {
  @Output() order: any
  pending: any[] = [];
  cancelled: any[] = [];
  shipped: any[] = [];
  delivered: any[] = [];
  currentUser: any;
  currentUserId: any;
   constructor(protected orderService: OrderService,
    private tokenService: TokenStorageService,) {}
  ngOnInit() {
    this.currentUser = this.tokenService.getUser();
    this.currentUserId = this.currentUser._id;
    this.getOrders();    
  }

 
  
  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);      
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      let orderStatus=this.getOrderStatus(event);
      let body={"orderId":event.container.data[0]!._id,"orderStatus":orderStatus}
      this.orderService.manageOrder(body).subscribe(
{
           next:(response: any) => {
            console.log(response,'hi');
           },
           error:(err)=>{
           }
      }
      )
    }
  }
  getOrders() {
    this.orderService.seller_orders = [];
    this.orderService.getSellerOrder(this.currentUserId).subscribe(
      {
      next:  (response: any) => {
          const  order  = response.data.data;     
          this.orderService.seller_orders.push(...order);
          const ordersByStatus = this.getOrdersByStatus();
          this.pending = ordersByStatus['pending'] || [];
          this.shipped = ordersByStatus['shipped'] || [];
          this.cancelled = ordersByStatus['cancelled'] || [];
          this.delivered = ordersByStatus['delivered'] || [];

          console.log(response.data.data);
          
        },
      error:  ({ status, message }: HttpErrorResponse) => {
          console.log(`Error ${status}: ${message}`);
        }
      }
    );
  }

  getOrderStatus(event:any){
    let orderStatus;
    switch(event.container!.id) 
    {
      case "cdk-drop-list-0":
        orderStatus="pending";
        break;
      case "cdk-drop-list-1":
        orderStatus="shipped"
        break;
      case "cdk-drop-list-2":
        orderStatus="delivered";
        break;   
    }

    return orderStatus;
  }

  getOrdersByStatus() {
    const ordersByStatus = this.orderService.seller_orders.reduce((result:any, order) => {
      if (!result[order.orderStatus]) {
        result[order.orderStatus] = [];
      }
      result[order.orderStatus].push(order);
      return result;
    }, {});
  
    return ordersByStatus;
  }
}
