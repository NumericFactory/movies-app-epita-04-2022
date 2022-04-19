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

  getUrlImage(movieImageString:string) {
    return 'https://image.tmdb.org/t/p/w500'+movieImageString
  }

  getNextMoviesOnAction() {
    
  }

}
