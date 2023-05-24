import { Component, OnInit } from '@angular/core';
import { SellerService } from 'src/app/services/seller/seller.service';

@Component({
  selector: 'app-top2sellers',
  templateUrl: './top2sellers.component.html',
  styleUrls: ['./top2sellers.component.css']
})
export class Top2sellersComponent implements OnInit {
  topSellers: any[] = [];
  constructor(private sellerService: SellerService) {}

  ngOnInit() {
    this.sellerService.getTopSellers().subscribe(
      {
        next:(data : any)=>{
          this.topSellers = data.data.result;                    
        }, error: (err)=>{
          console.log(err);
          
        }
      }
    );
  }
}
