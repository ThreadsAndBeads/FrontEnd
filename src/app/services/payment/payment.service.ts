import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiUrl = environment.apiUrl;
  BASE_URL = this.apiUrl + '/api/v1/processPayment';
  private amount: number = 0;
  paymentHandler: any = null;

  setAmount(amount: number) {
    this.amount = amount;
  }

  getAmount(): number {
    return this.amount;
  }

  constructor(private httpClient: HttpClient) { }

  makePayment() {
    const amount = this.getAmount();
    if (this.paymentHandler) {
      this.openPayment(amount);
    }
  }

  openPayment(amount: number) {
    this.paymentHandler.open({
      name: 'Positronx',
      description: '3 widgets',
      amount: amount * 100,
    });
  }

  public stripePayment(body: any) {
    return this.httpClient.post<any>(`${this.BASE_URL}`, body);
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51N8TnoIudPN1uZnnijC0SWZydb6SEHCPOYhHrs1WLbpxtdTWyjOmqbx6SS6EAMKlUCYYAd9JZ7GyobbGQ4bMJ8pY005OrIYVCA',
          locale: 'auto',
          token: function (stripeToken: any) {

          },
        });

        this.makePayment();
      };
      window.document.body.appendChild(script);
    } else {
      this.makePayment();
    }
  }
}
