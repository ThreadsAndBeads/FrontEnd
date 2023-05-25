import { Component, Input } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
@Component({
  selector: 'app-seller-product-card',
  templateUrl: './seller-product-card.component.html',
  styleUrls: ['./seller-product-card.component.css']
})
export class SellerProductCardComponent {
  @Input() product: any
  productIdToDelete: any;
  constructor(
    protected productService: ProductService,
    protected cartService: CartService,
    private router: Router
  ) { }

  deleteProduct(productId:string) {
    this.productService.deleteProduct(productId).subscribe(res => {
      location.reload();
      this.cartService.cartUpdatedSubject.next();
      this.router.navigate(['seller/sellerProducts']);
    });

  }
  openEditProductModal(productId: string) {
    this.router.navigate(['seller/editProduct', productId]);
  }

}
