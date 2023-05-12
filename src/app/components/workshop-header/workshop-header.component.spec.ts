import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopHeaderComponent } from './workshop-header.component';

describe('WorkshopHeaderComponent', () => {
  let component: WorkshopHeaderComponent;
  let fixture: ComponentFixture<WorkshopHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkshopHeaderComponent]
    });
    fixture = TestBed.createComponent(WorkshopHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
