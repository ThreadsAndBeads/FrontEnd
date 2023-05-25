import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellersComponent } from './sellers.component';

describe('SellersComponent', () => {
  let component: SellersComponent;
  let fixture: ComponentFixture<SellersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
