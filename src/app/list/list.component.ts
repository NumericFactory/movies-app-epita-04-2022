import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  movies:Array<any> = []
  url:string = 'https://api.themoviedb.org/3/discover/movie?api_key=efdeb661aaa006b1e4f36f990a5fd8fd&language=fr'

  /* injecter un objet http de la class HttpClient*/ 
  constructor(private movieSvc:MovieService) { }

  ngOnInit(): void {
   
    // 1 fais la request
    this.movieSvc.getMoviesFromApi();
    
    // 2 on s'abonne à movies$
    this.movieSvc.movies$.subscribe( 
      (movies:any) => this.movies = movies
    );

  }

  getUrlImage(movieImageString:string) {
    return 'https://image.tmdb.org/t/p/w500'+movieImageString
  }

}
