/*
  Ce service a été généré à l'aide de la commande :
  >  ng generate service services/movie
*/
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MovieModel } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
// Le service expose des propriétés et méthodes
// qui peuvent être consommées par tous les component 
export class MovieService {

  private _currentPage:number = 1
  private _TMDB_API_URL = environment.apiTmdb;
  private _TMDB_APIKEY = environment.apikey_tmdb;
  /*
    les subjects et behaviorSubjects sont des Observable particuliers
    - on peut s'abonner à cette source via la méthode .subscribe()
    - on peut pousser une nouvelle donnée via la methode .next(value)
  */
 
  private _movies$ = new BehaviorSubject<MovieModel[]>([])

  constructor(private http:HttpClient ) { }

  /* 
    rôle : getter de _movies$
    return un Observable 
    Nos components peuvent consommer : 
    > this.movieSvc.movies$.subscribe()
  */
  get movies$():Observable<MovieModel[]> {
    return this._movies$.asObservable();
    // on retourne un Observable
    // nous ne souhaitons pas exposer directement 
    // le subject et sa méthode de modification (.next())
  }

  set movies$(movies:any) {
    this._movies$.next(movies)
  }

  public getVideosOfMovie(movieId:number) {
    
  }

  /*
    > Faire une requete HTTP à l'API theMovieDB
    > ET charger en valeur de movies$, la réponse (le tableau d'objets movies)
  */
  public getMoviesFromApi():void {
     this.http.get(this._TMDB_API_URL+'/discover/movie?api_key='+this._TMDB_APIKEY+'&language=fr&page='+this._currentPage)
     .pipe( 
        // avec l'opérateur map de RxJS, 
        // on va mapper la reponse de l'API TMDB
        map( (apiResponse:any) => 
          apiResponse.results.map( (movie:any) => new MovieModel(movie))
        ) 
      ) // fin pipe() retourne un Observable
     .subscribe(
       (response:Array<MovieModel>) => {
         console.log(response)
         this._movies$.next(response)
        }
     )
  }
  
  /*
    > Faire une requete HTTP à l'API theMovieDB (sur la page suivant)
    > push dans le tableau de movies les 20 films suivants
    > ET charger en valeur de movies$, le tableau de movies
  */
  getNextMoviesFromApi():void {
   // 0 incrementer this.currentPage;
   this._currentPage += 1
   // 1 faire la request des 20 films suivants (page suivante)
   this.http.get(this._TMDB_API_URL+'/discover/movie?api_key='+this._TMDB_APIKEY+'&language=fr&page='+this._currentPage)
   // pipe : permet de transformer un Observable et retourne un Observable
   .pipe( 
      // avec l'opérateur map de RxJS, 
      // on va mapper la reponse de l'API TMDB
      map( (apiResponse:any) => 
        apiResponse.results.map( (movie:any) => new MovieModel(movie))
      ) 
    ) // fin pipe() retourne un Observable
   .subscribe( (response:Array<MovieModel>) => {
     // 2 construire le tableau de TOUS les films
     let allMovies = [...this._movies$.getValue(), ...response];
     // 3 pousser la nouvelle donnée (tous les films) dans _movies$ (.next())
     this._movies$.next(allMovies);
   })
  
  }


  
}
