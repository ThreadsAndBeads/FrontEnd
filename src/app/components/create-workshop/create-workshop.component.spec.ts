import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWorkshopComponent } from './create-workshop.component';

describe('CreateWorkshopComponent', () => {
  let component: CreateWorkshopComponent;
  let fixture: ComponentFixture<CreateWorkshopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateWorkshopComponent]
    });
    fixture = TestBed.createComponent(CreateWorkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
