/*
  Ce service a été généré à l'aide de la commande :
  >  ng generate service services/movie
*/
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// Le service expose des propriétés et méthodes
// qui peuvent être consommées par tous les component 
export class MovieService {

  private _currentPage:number = 1
  private _url:string = 'https://api.themoviedb.org/3/discover/movie?api_key=efdeb661aaa006b1e4f36f990a5fd8fd&language=fr';
  /*
    les subjects et behaviorSubjects sont des Observable particuliers
    - on peut s'abonner à cette source via la méthode .subscribe()
    - on peut pousser une nouvelle donnée via la methode .next(value)
  */
  private _movies$:BehaviorSubject<any> = new BehaviorSubject([])

  constructor(private http:HttpClient ) { }

  /* 
    rôle : getter de _movies$
    return un Observable 
    Nos components peuvent consommer : 
    > this.movieSvc.movies$.subscribe()
  */
  get movies$():Observable<any> {
    return this._movies$.asObservable();
    // on retourne un Observable
    // nous ne souhaitons pas exposer directement 
    // le subject et sa méthode de modification (.next())
  }

  set movies$(movies:any) {
    this._movies$.next(movies)
  }
  /*
    > Faire une requete HTTP à l'API theMovieDB
    > ET charger en valeur de movies$, la réponse (le tableau d'objets movies)
  */
  public getMoviesFromApi() {
     this.http.get(this._url+'&page='+this._currentPage).subscribe(
       (response:any) => {
         this._movies$.next(response.results)
        }
     )
  }
  /*
    > Faire une requete HTTP à l'API theMovieDB (sur la page suivant)
    > push dans le tableau de movies les 20 films suivants
    > ET charger en valeur de movies$, le tableau de movies
  */
  getNextMoviesFromApi() {
   // 0 incrementer this.currentPage;
   this._currentPage += 1
   // 1 faire la request des 20 films suivants (page suivante)
   this.http.get(this._url+'&page='+this._currentPage).subscribe( (response:any) => {
     // 2 construire le tableau de TOUS les films
     let allMovies = [...this._movies$.getValue(), ...response.results];
     // 3 pousser la nouvelle donnée (tous les films) dans _movies$ (.next())
     this._movies$.next(allMovies);
   })
  
  }


  
}
