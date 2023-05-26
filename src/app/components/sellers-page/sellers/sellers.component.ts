import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { SellerService } from 'src/app/services/seller/seller.service';

@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.css']
})
export class SellersComponent {
  page = 1;
  limit = 2;
  NumberOfPages!: number;

  constructor(protected sellerService: SellerService) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.sellerService.sellers = [];
    this.sellerService.getAllSellers(this.page, this.limit).subscribe(
      (response: any) => {
        const { sellers } = response.data;        
        this.NumberOfPages = Math.ceil(response.data.totalRecords / this.limit);

        this.sellerService.sellers.push(...sellers);
      },
      ({ status, message }: HttpErrorResponse) => {
        // console.log(`Error ${status}: ${message}`);
      }
    );
  }
  get pages(): number[] {
    return Array.from({ length: this.NumberOfPages }, (_, i) => i + 1);
  }
  previous() {
    if (this.page > 1) {
      this.page--;
      this.getProducts();
    }
  }

  next() {
    if (this.page < this.NumberOfPages) {
      this.page++;
      this.getProducts();
    }
  }

  navToPage(page: number){
    this.page = page;
    this.getProducts();
  };
}
