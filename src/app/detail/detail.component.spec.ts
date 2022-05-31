import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { MovieService } from '../shared/services/movie.service';

import { DetailComponent } from './detail.component';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let debug : DebugElement
  let movieSvc:MovieService;
  //let http: HttpClient;
  //movieSvc = new MovieService(http);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailComponent ],
      providers:[ {
        provide: ActivatedRoute, 
        useValue: {snapshot:{params:[{id:123}]}}
      }
      ],
      imports: [HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    
    movieSvc=jasmine.createSpyObj('MovieService', ['getMovieFromApi', 'getVideosOfMovie'] )
    console.log('movieSvc',movieSvc)
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  // TEST 1
  // Lorsque le component est chargé
  // attendu : la méthode MovieService.getVideosOfMovie() soit exécutée
  // Attendu : la méthode est movieSvc.getMovieFromApi(movieId) est executée
  // la matcher à utiliser .toHaveBeenCalled()


  // Test 2
  // Attendu : Si la méthode est movieSvc.getMovieFromApi(movieId) est executée
  // Attendu : MovieService.movie$ doit un objet MovieModel
});


