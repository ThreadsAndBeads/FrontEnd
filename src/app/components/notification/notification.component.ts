import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  constructor(
    private tokenService: TokenStorageService,    private userService: UserService
  ) {
    this.socket = io('http://127.0.0.1:7000', { transports: ['websocket'] });
  }
  ngOnInit() {
    let userId = this.tokenService.getUser()._id;
    if(userId){
      const room = `seller_${userId}`;
      this.socket.emit("join", room);
      this.socket.on("notification", (data: any) => {
        this.notifications.push(data); 
        this.notifications.sort(this.compareTimestamps);
        this.hasUnreadNotifications = true; 
          });
  
      this.userService.getSellerNotifications(userId)
        .subscribe(
          (notifications) => {
            this.notifications = this.normalizeNotifications(notifications);
            this.notifications.sort(this.compareTimestamps);
          },
          (error) => {
            console.error('Failed to retrieve notifications:', error);
          }
        );
    }
    

  }
  compareTimestamps(a: any, b: any) {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  }
  showNotifications(): void {
    this.hasUnreadNotifications = false; 
    this.showDropdown = !this.showDropdown; 
  }

  normalizeNotifications(notifications: any[]): any[] {

    return notifications.map((notification) => {
      return { 
        data: notification.notificationDetails ,
        timestamp: notification.timestamp,

      }; 
    });
  }
}
