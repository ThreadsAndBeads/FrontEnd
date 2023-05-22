import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartProducts: any[] = [];
  cartNotEmpty: boolean = false;
  totalItems!: number;
  totalPrice!: number;

  constructor(
    public cartService: CartService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.getCartProducts();
    this.cartService.cartUpdated$.subscribe(() => {
      this.getCartProducts();
      this.cdr.detectChanges();
    });
  }

  getCartProducts() {
    this.cartProducts = [];
    this.cartService.getCartProducts().subscribe({
      next: (response) => {
        if (response.data.cart && response.data.cart.products) {
          this.cartProducts = response.data.cart.products;
          this.calculateSubtotal();
        } 

        if (this.cartProducts.length > 0) {
          this.cartNotEmpty = true;
        } else {
          this.cartNotEmpty = false;
        }
        this.cdr.detectChanges(); 
        
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  calculateSubtotal() {
    this.totalItems = 0;
    this.totalPrice = 0;

    this.cartProducts.forEach((product) => {
      this.totalItems += product.quantity;
      this.totalPrice += product.quantity * product.productId.price;
    });
  }
}
