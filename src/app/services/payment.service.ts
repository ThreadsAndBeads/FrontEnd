import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private amount: number = 0;
  paymentHandler: any = null;


  setAmount(amount: number) {
    this.amount = amount;
  }

  getAmount(): number {
    return this.amount;
  }
  constructor() {}
  makePayment() {
    const amount = this.getAmount();
    console.log(amount);
     this.paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51N8TnoIudPN1uZnnijC0SWZydb6SEHCPOYhHrs1WLbpxtdTWyjOmqbx6SS6EAMKlUCYYAd9JZ7GyobbGQ4bMJ8pY005OrIYVCA',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        alert('Stripe token generated!');
      },
    });
    if (this.paymentHandler) {
      this.openPayment(amount);
    } else {
      setTimeout(() => {
        this.makePayment();
      }, 500);
    }
  }
  openPayment(amount: number) {
    this.paymentHandler.open({
      name: 'Positronx',
      description: '3 widgets',
      amount: amount * 100,
    });
  }
  // invokeStripe() {
  //   if (!window.document.getElementById('stripe-script')) {
  //     const script = window.document.createElement('script');
  //     script.id = 'stripe-script';
  //     script.type = 'text/javascript';
  //     script.src = 'https://checkout.stripe.com/checkout.js';
  //     script.onload = () => {
  //       this.paymentHandler = (<any>window).StripeCheckout.configure({
  //         key: 'pk_test_51N8TnoIudPN1uZnnijC0SWZydb6SEHCPOYhHrs1WLbpxtdTWyjOmqbx6SS6EAMKlUCYYAd9JZ7GyobbGQ4bMJ8pY005OrIYVCA',
  //         locale: 'auto',
  //         token: function (stripeToken: any) {
  //           console.log(stripeToken);
  //           alert('Payment has been successfull!');
  //         },
  //       });
  //     };
  //     window.document.body.appendChild(script);
  //   }
  // }
}
