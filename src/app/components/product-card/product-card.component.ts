import { Component, Input } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product: any

  constructor(protected productService: ProductService, protected tokenService: TokenStorageService) {}
  userId = this.tokenService.getUser()._id ;



  addToCart(productId:string) {
    const data= {
      "userId": this.userId,
      "products": {
        "productId": productId,
        "quantity": 1
      }
  }


    this.productService.addToCart(data).subscribe(
      {
        next:    (response) => {
          console.log('Added to cart:', response);
        },
        error:    (error) => {
          console.error('Error adding to cart:', error);
        }
      }
  
  
    );
  }




}




