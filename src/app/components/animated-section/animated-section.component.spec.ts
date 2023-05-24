import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedSectionComponent } from './animated-section.component';

describe('AnimatedSectionComponent', () => {
  let component: AnimatedSectionComponent;
  let fixture: ComponentFixture<AnimatedSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimatedSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimatedSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
