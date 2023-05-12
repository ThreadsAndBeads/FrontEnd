import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopPageComponent } from './workshop-page.component';

describe('WorkshopPageComponent', () => {
  let component: WorkshopPageComponent;
  let fixture: ComponentFixture<WorkshopPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkshopPageComponent]
    });
    fixture = TestBed.createComponent(WorkshopPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
