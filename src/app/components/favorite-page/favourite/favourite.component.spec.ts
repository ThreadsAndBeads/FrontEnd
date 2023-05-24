import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteComponent } from './favourite.component';

describe('FavouriteComponent', () => {
  let component: FavouriteComponent;
  let fixture: ComponentFixture<FavouriteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavouriteComponent]
    });
    fixture = TestBed.createComponent(FavouriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
