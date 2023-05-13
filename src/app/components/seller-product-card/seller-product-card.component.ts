import { Component, Input } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-seller-product-card',
  templateUrl: './seller-product-card.component.html',
  styleUrls: ['./seller-product-card.component.css']
})
export class SellerProductCardComponent {
  @Input() product: any
  constructor(protected productService: ProductService) {  }
  deleteProduct(productId:string) {
    this.productService.deleteProduct(productId).subscribe(res => {
    });
  }
}
