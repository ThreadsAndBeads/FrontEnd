import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontallScrollComponent } from './horizontall-scroll.component';

describe('HorizontallScrollComponent', () => {
  let component: HorizontallScrollComponent;
  let fixture: ComponentFixture<HorizontallScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorizontallScrollComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorizontallScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
