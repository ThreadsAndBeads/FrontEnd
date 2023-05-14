import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerworkshopsComponent } from './sellerworkshops.component';

describe('SellerworkshopsComponent', () => {
  let component: SellerworkshopsComponent;
  let fixture: ComponentFixture<SellerworkshopsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellerworkshopsComponent]
    });
    fixture = TestBed.createComponent(SellerworkshopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
