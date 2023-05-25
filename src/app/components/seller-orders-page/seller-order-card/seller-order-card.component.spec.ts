import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerOrderCardComponent } from './seller-order-card.component';

describe('SellerOrderCardComponent', () => {
  let component: SellerOrderCardComponent;
  let fixture: ComponentFixture<SellerOrderCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellerOrderCardComponent]
    });
    fixture = TestBed.createComponent(SellerOrderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
