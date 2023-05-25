import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerProductCardComponent } from './seller-product-card.component';

describe('SellerProductCardComponent', () => {
  let component: SellerProductCardComponent;
  let fixture: ComponentFixture<SellerProductCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellerProductCardComponent]
    });
    fixture = TestBed.createComponent(SellerProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
