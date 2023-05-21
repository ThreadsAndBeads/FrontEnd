import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteProductsComponent } from './favourite-products.component';

describe('FavouriteProductsComponent', () => {
  let component: FavouriteProductsComponent;
  let fixture: ComponentFixture<FavouriteProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavouriteProductsComponent]
    });
    fixture = TestBed.createComponent(FavouriteProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
