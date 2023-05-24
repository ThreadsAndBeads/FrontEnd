import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoToLoginComponent } from './go-to-login.component';

describe('GoToLoginComponent', () => {
  let component: GoToLoginComponent;
  let fixture: ComponentFixture<GoToLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoToLoginComponent]
    });
    fixture = TestBed.createComponent(GoToLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
