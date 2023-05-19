import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkshopComponent } from './edit-workshop.component';

describe('EditWorkshopComponent', () => {
  let component: EditWorkshopComponent;
  let fixture: ComponentFixture<EditWorkshopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditWorkshopComponent]
    });
    fixture = TestBed.createComponent(EditWorkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
