import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyCartComponent } from './empty-cart.component';

describe('EmptyCartComponent', () => {
  let component: EmptyCartComponent;
  let fixture: ComponentFixture<EmptyCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyCartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
