import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-top-sell',
  templateUrl: './top-sell.component.html',
  styleUrls: ['./top-sell.component.css'],
})

export class TopSellComponent implements OnInit {
  products: Product[]= [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getTopDiscountedProduct().subscribe(
      (response: any) => {
        console.log(response);
        for(let i = 0; i < response.data.products.length; i++) {
          this.products.push(response.data.products[i]);
        }

        // productForm.reset();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );;
  }
}
