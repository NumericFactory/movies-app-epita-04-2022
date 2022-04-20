import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieModel } from '../models/movie.model';
import { MovieService } from '../services/movie.service';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
 
  subscription:Subscription;
  movies:Array<MovieModel> = []
  /* injecter un objet http de la class HttpClient*/ 
  constructor(private movieSvc:MovieService) { 
    console.log(this)
  }

  ngOnInit(): void {


    // 2 on s'abonne à movies$ (un Observable qui contient les movies)
    this.subscription = this.movieSvc.movies$.subscribe( (data:any) => {
      if(data.length==0) {
          // 1 on fait la request HTTP à theMovieDB
          this.movieSvc.getMoviesFromApi(); 
      }
      else {
        this.movies = data
      }
    });
  }

  getUrlImage(movieImageString:string | null ):string {
    return (movieImageString!=null &&movieImageString!='') 
            ? 'https://image.tmdb.org/t/p/w500'+movieImageString
            : 'https://via.placeholder.com/500x281.png?text=no+image'
  }

  /* Au clic sur "films suivants" */
  getNextMoviesOnAction():void {
    // executer la méthode .getNextMoviesFromApi() du movieSvc
    this.movieSvc.getNextMoviesFromApi();
  }

  navToDetail(movie:MovieModel) {
    this.movieSvc.setMovie(movie)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
