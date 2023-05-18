import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-top-selling-products',
  templateUrl: './top-selling-products.component.html',
  styleUrls: ['./top-selling-products.component.css'],
})
export class TopSellingProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getTopDiscountedProduct().subscribe(
      (response: any) => {
        for (let i = 0; i < response.data.products.length; i++) {
          this.products.push(response.data.products[i]);
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
}
