import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopCardComponent } from './workshop-card.component';

describe('WorkshopCardComponent', () => {
  let component: WorkshopCardComponent;
  let fixture: ComponentFixture<WorkshopCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkshopCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshopCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
