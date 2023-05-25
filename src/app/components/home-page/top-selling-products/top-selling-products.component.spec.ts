import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSellingProductsComponent } from './top-selling-products.component';

describe('TopSellingProductsComponent', () => {
  let component: TopSellingProductsComponent;
  let fixture: ComponentFixture<TopSellingProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopSellingProductsComponent]
    });
    fixture = TestBed.createComponent(TopSellingProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
