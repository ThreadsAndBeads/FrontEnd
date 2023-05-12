import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartProductsComponent } from './cart-products.component';

describe('CartProductsComponent', () => {
  let component: CartProductsComponent;
  let fixture: ComponentFixture<CartProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
