import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import {io}  from 'socket.io-client';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  data: any[] = []; // Array to store received notifications
  hasUnreadNotifications: boolean = false; // Flag to track unread notifications
  showDropdown: boolean = false; // Flag to control dropdown visibility
  private socket: any;
  constructor(
    private tokenService: TokenStorageService,
  ) {
    this.socket = io('http://127.0.0.1:7000', { transports: ['websocket'] });

  }
  ngOnInit() {
    console.log("hereeeee");
    let userId = this.tokenService.getUser()._id ;     
    const room = `seller_${userId}`;
    this.socket.emit("join", room);
    console.log(this.socket);
    
    this.socket.on("notification", (data: any) => {
      this.data.push(data); // Store the received notification
      this.hasUnreadNotifications = true; // Set the flag to indicate unread notifications
      console.log(data);
    });
  }

  showNotifications(): void {
    this.hasUnreadNotifications = false; // Clear the unread notification flag
    this.showDropdown = !this.showDropdown; // Toggle the dropdown visibility
  }

  // Add any additional methods or event handlers as needed...
}
