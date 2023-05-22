import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import {io}  from 'socket.io-client';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notifications: any[] = []; 
  hasUnreadNotifications: boolean = false; 
  showDropdown: boolean = false; 
  private socket: any;
  bell = document.getElementById('notification');
  constructor(
    private tokenService: TokenStorageService,    private userService: UserService
  ) {
    this.socket = io('http://127.0.0.1:7000', { transports: ['websocket'] });
  }
  ngOnInit() {
    let userId = this.tokenService.getUser()._id;
    const room = `seller_${userId}`;
    this.socket.emit("join", room);
    this.socket.on("notification", (data: any) => {
      this.notifications.push(data); 
      this.hasUnreadNotifications = true; 
      this.bell!.classList.add('notify');
        });

    this.userService.getSellerNotifications(userId)
      .subscribe(
        (notifications) => {
          this.notifications = this.normalizeNotifications(notifications);
          // this.hasUnreadNotifications = this.notifications.length > 0;
          // console.log(this.notifications);
          
          console.log('Received notifications:', this.notifications);
        },
        (error) => {
          console.error('Failed to retrieve notifications:', error);
        }
      );

  }

  showNotifications(): void {
    this.hasUnreadNotifications = false; 
    this.showDropdown = !this.showDropdown; 
  }

  normalizeNotifications(notifications: any[]): any[] {

    return notifications.map((notification) => {
      console.log(notification);   
      return { 
        data: notification.notificationDetails ,
        timestamp: notification.timestamp,

      }; 
    });
  }
}
