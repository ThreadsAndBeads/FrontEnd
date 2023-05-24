import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Top2sellersComponent } from './top2sellers.component';

describe('Top2sellersComponent', () => {
  let component: Top2sellersComponent;
  let fixture: ComponentFixture<Top2sellersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Top2sellersComponent]
    });
    fixture = TestBed.createComponent(Top2sellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
