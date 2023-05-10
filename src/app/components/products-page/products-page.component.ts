import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent implements OnInit {
  page = 1;
  limit = 2;
  NumberOfPages!: number;

  constructor(protected productService: ProductService) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.products = [];
    this.productService.getAllProducts(this.page, this.limit).subscribe(
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
