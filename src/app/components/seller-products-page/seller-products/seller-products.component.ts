import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { TokenStorageService } from 'src/app/services/token/token-storage.service';

@Component({
  selector: 'app-seller-products',
  templateUrl: './seller-products.component.html',
  styleUrls: ['./seller-products.component.css']
})
export class SellerProductsComponent implements OnInit {
  page = 1;
  limit = 3;
  NumberOfPages!: number;
  currentUser: any;
  currentUserId: any;


  constructor(protected productService: ProductService,
    private tokenService: TokenStorageService,) {}

  ngOnInit() {
    this.currentUser = this.tokenService.getUser();
    this.currentUserId = this.currentUser._id;
    this.getProducts();
  }

  getProducts() {
    this.productService.products = [];
    this.productService.getUserProducts(this.page, this.limit,this.currentUserId).subscribe(
      (response: any) => {
        const { products } = response.data;
        this.NumberOfPages = Math.ceil(response.data.totalRecords / this.limit);

        this.productService.products.push(...products);
      },
      ({ status, message }: HttpErrorResponse) => {
        console.log(`Error ${status}: ${message}`);
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
