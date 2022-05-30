import { Component, OnInit } from '@angular/core';
import { MovieModel } from '../shared/models/movie.model';
import { MovieService } from '../shared/services/movie.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  foundMovies:MovieModel[] = [];

  constructor(public movieSvc:MovieService) { 
    console.log(this)
  }

  ngOnInit(): void {
    // écouter foundMovies$
    // this.movieSvc.foundMovies$.subscribe(
    //   data =>  this.foundMovies = foundMovies
    // )

  }
  /**
   * 
   * @param searchString 
   * si moins de 3 caractères on ne déclenche pas la request
   * si >= 3 caracteres, on appelle searchMoviesFromApi
   * 
   * si 0 caractères dans le champ de recherche
   */
  searchMoviesAction(searchString: string) {

    console.log(searchString);
    // faire la request
    this.movieSvc.searchMoviesFromApi(searchString);
    // s'abonner
    this.movieSvc.foundMovies$
    .subscribe(data => this.foundMovies = data);
    
  }

}
