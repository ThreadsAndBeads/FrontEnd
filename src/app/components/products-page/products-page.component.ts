import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent implements OnInit {

  constructor(protected productService: ProductService) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe(
      (response: any) => {
        console.log(response);
        for (let i = 0; i < response.data.products.length; i++) {
          this.productService.products.push(response.data.products[i]);
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
}
