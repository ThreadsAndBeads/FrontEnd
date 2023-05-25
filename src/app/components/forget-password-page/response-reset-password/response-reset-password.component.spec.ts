import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseResetPasswordComponent } from './response-reset-password.component';

describe('ResposeResetPasswordComponent', () => {
  let component: ResponseResetPasswordComponent;
  let fixture: ComponentFixture<ResponseResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponseResetPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponseResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
