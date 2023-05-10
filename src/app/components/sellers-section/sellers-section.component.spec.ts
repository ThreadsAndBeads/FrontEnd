import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellersSectionComponent } from './sellers-section.component';

describe('SellersSectionComponent', () => {
  let component: SellersSectionComponent;
  let fixture: ComponentFixture<SellersSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellersSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellersSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
