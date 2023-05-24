import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopHomeSectionComponent } from './workshop-home-section.component';

describe('WorkshopHomeSectionComponent', () => {
  let component: WorkshopHomeSectionComponent;
  let fixture: ComponentFixture<WorkshopHomeSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkshopHomeSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshopHomeSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
