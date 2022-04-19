import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  movies:Array<any> = []
  /* injecter un objet http de la class HttpClient*/ 
  constructor(private movieSvc:MovieService) { }

  ngOnInit(): void {
    // 1 on fait la request HTTP à theMovieDB
    this.movieSvc.getMoviesFromApi();
    // 2 on s'abonne à movies$ (un Observable qui contient les movies)
    this.movieSvc.movies$.subscribe( (data:any) => this.movies = data );
  }

  getUrlImage(movieImageString:string | null ) {
    return (movieImageString!=null &&movieImageString!='') 
            ? 'https://image.tmdb.org/t/p/w500'+movieImageString
            : 'https://via.placeholder.com/500x281.png?text=no+image'
  }

  /* Au clic sur "films suivants" */
  getNextMoviesOnAction() {
    // executer la méthode .getNextMoviesFromApi() du movieSvc
    this.movieSvc.getNextMoviesFromApi();
  }

}
