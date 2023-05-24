import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellercardComponent } from './sellercard.component';

describe('SellercardComponent', () => {
  let component: SellercardComponent;
  let fixture: ComponentFixture<SellercardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellercardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellercardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
