import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyFavouritesComponent } from './empty-favourites.component';

describe('EmptyFavouritesComponent', () => {
  let component: EmptyFavouritesComponent;
  let fixture: ComponentFixture<EmptyFavouritesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmptyFavouritesComponent]
    });
    fixture = TestBed.createComponent(EmptyFavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
