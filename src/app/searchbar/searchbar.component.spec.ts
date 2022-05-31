import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { MovieModel } from '../shared/models/movie.model';
import { MovieService } from '../shared/services/movie.service';

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
      declarations: [ SearchbarComponent ],
      providers: [{provide: MovieService, useClass:MockMovieService} ]
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
    // component n'est pas null ni undefined
  });
  
  /**
   * 
   * TEST 1
   * 
   * si 0 caractères dans le champ de recherche de la vue HTML
   * Attendu : componentInstance.foundMovies = []
   */
  it('should foundMovies=[] if userInput string=0 chars', () => { 
    // on simule l'envoi d'un event sur le champ de recherche
    component.searchMoviesAction('');
    // on attend que foundMovies soit vide
    expect(component.foundMovies).toEqual([]);
  })
  //it()

    /**
   * 
   * TEST 2
   * 
   * si 3 caractères ou plus dans le champ de recherche de la vue HTML
   * Attendu : 
   *  > on execute la reuqete HTTP, 
   *  > foundMovies contient les résultats Tableau de MobvieModel
   */
  //it()

});


class MockMovieService {
   movies:MovieModel[]  = [
     {
      id: 1,
      titre: 'titre1', 
      date: new Date(),
      image_portrait: 'imgP.jpg', 
      description: 'synopsis1', 
      score: 3,
      image: 'image1.jpg'
    },
    {
      id: 2,
      titre: 'titre2', 
      date: new Date(),
      image_portrait: 'imgP2.jpg', 
      description: 'synopsis2', 
      score: 4, 
      image: 'image4.jpg'
    },
    {
      id: 3,
      titre: 'titre3', 
      date: new Date(),
      image_portrait: 'imgP3.jpg', 
      description: 'synopsis3', 
      score: 1, 
      image: 'image3.jpg'
    },
   ];

   private _movies$ = of(this.movies)

  searchMoviesFromApi(searchString: string) {
      this._movies$ = of(this.movies.filter(m => m.titre.includes(searchString)))
  }
  

  get foundMovies$():Observable<MovieModel[]> {
     return this._movies$
  }

}

  
