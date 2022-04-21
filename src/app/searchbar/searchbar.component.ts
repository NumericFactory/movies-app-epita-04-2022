import { Component, OnInit } from '@angular/core';
import { MovieModel } from '../shared/models/movie.model';
import { MovieService } from '../shared/services/movie.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  // foundMovies:MovieModel[] = [];

  constructor(public movieSvc:MovieService) { }

  ngOnInit(): void {
    // écouter foundMovies$
    // this.movieSvc.foundMovies$.subscribe(
    //   data =>  this.foundMovies = foundMovies
    // )

  }

  searchMoviesAction(searchString: string) {
    console.log(searchString);
    // faire la request
    this.movieSvc.searchMoviesFromApi(searchString)
  }

}
