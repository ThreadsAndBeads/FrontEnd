import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';

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
  subTotalPrice!: number;
  discount: number = 0;
  is_gift: boolean = false;
  errorMessage: string = '';

  constructor(
    public cartService: CartService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getCartProducts();
    this.cartService.cartUpdated$.subscribe(() => {
      this.getCartProducts();
      this.cdr.detectChanges();
    });
    this.is_gift = sessionStorage.getItem('is_gift') === 'true';
    const discount = sessionStorage.getItem('discount');
    if (discount === null) {
      this.discount = 0;
    } else {
      this.discount = parseInt(discount, 10);
    }
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
          sessionStorage.removeItem('is_gift');
          sessionStorage.removeItem('discount');
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
    this.subTotalPrice = 0;

    this.cartProducts.forEach((product) => {
      this.totalItems += product.quantity;
      this.subTotalPrice += product.quantity * product.productId.price;
    });
    
    this.totalPrice = this.subTotalPrice - this.discount;
  }

  checkCoupon() {
    this.discount = 0;
    this.errorMessage = '';
    const couponCode = (document.getElementById('coupon') as HTMLInputElement)
      .value;
    if (couponCode != '') {
      this.cartService.isValidCoupon(couponCode).subscribe({
        next: (response: any) => {
          if (response.valid) {
            this.discount = response.discountPercentage;
            sessionStorage.setItem('discount', this.discount.toString());
          } else {
            this.errorMessage = 'Coupon code is invalid';
          }
        },
        error: (error: any) => {
          console.error('Error checking coupon:', error);
        },
      });
    } else {
      this.errorMessage = "You didn't enter any coupon code";
    }
  }

  isGift(event: Event) {
    this.is_gift = (event.target as HTMLInputElement).checked;
    sessionStorage.setItem('is_gift', this.is_gift.toString());
  }
}
