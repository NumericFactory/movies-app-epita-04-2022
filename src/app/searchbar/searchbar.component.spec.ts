import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchbarComponent } from './searchbar.component';

/**
   * 
   * TEST 1
   * 
   * si 0 caractères dans le champ de recherche
   * Attendu : componentInstance.foundMovies = []
   */

describe('SearchbarComponent', () => {
  let component: SearchbarComponent;
  let fixture: ComponentFixture<SearchbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  /**
   * 
   * TEST 1
   * 
   * si 0 caractères dans le champ de recherche de la vue HTML
   * Attendu : componentInstance.foundMovies = []
   */
});
