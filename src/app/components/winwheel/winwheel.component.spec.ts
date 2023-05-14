import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinwheelComponent } from './winwheel.component';

describe('WinwheelComponent', () => {
  let component: WinwheelComponent;
  let fixture: ComponentFixture<WinwheelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WinwheelComponent]
    });
    fixture = TestBed.createComponent(WinwheelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
