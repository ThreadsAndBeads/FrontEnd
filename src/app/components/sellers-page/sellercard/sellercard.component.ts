import { Component, Input, OnInit } from '@angular/core';
import { SellerService } from 'src/app/services/seller/seller.service';

@Component({
  selector: 'app-sellercard',
  templateUrl: './sellercard.component.html',
  styleUrls: ['./sellercard.component.css'],
})
export class SellercardComponent implements OnInit {
  @Input() seller: any;
  totalOrders: any;
  constructor(private sellerService: SellerService) {}
  ngOnInit(): void {
    this.getSellerStatistics();
  }
  getSellerStatistics() {
    this.sellerService.getSellerStatistics(this.seller._id).subscribe({
      next: (data: any) => {
        this.totalOrders = data.totalOrders;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
