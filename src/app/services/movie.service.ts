/*
  Ce service a été généré à l'aide de la commande :
  >  ng generate service services/movie
*/
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// Le service expose des propriétés et méthodes
// qui peuvent être consommées par tous les component 
export class MovieService {

  currentPage:number = 1
  private _url:string = 'https://api.themoviedb.org/3/discover/movie?api_key=efdeb661aaa006b1e4f36f990a5fd8fd&language=fr&page='+this.currentPage;
  /*
    les subects et behaviorSubjects sont des Observable
    - on peut s'abonner à cette source via la méthode .subcribe()
    - on peut pousser une nouvelle donnée via la methode .next(value)
  */
  private _movies$:BehaviorSubject<any> = new BehaviorSubject([])

  constructor(private http:HttpClient ) { }

  /* 

  */
  get movies$() {
    return this._movies$.asObservable()
  }

  set movies$(movies:any) {
    this._movies$.next(movies)
  }
  /*
    > Faire une requete HTTP à l'API theMovieDB
    > ET charger en valeur de movies$, la réponse (le tableau d'objets movies)
  */
  public getMoviesFromApi() {
     this.http.get(this._url).subscribe(
       (response:any) => this._movies$.next(response.results)
     )
  }
  /*
    > Faire une requete HTTP à l'API theMovieDB (sur la page suivant)
    > push dans le tableau de movies les 20 films suivants
    > ET charger en valeur de movies$, le tableau de movies
  */
  getNextMoviesFromApi() {
   
  }


  
}
