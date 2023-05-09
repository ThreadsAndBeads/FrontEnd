import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSellComponent } from './top-sell.component';

describe('TopSellComponent', () => {
  let component: TopSellComponent;
  let fixture: ComponentFixture<TopSellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopSellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
