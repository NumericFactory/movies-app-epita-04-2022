import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  movieId:number = 0
  movieVideo:any;

  constructor(
    private activatedRoute:ActivatedRoute, 
    private movieSvc:MovieService
    ) { }

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.params); 
    // renvoie un objet des paramètres nommés de l'url {id:1234}
    this.movieId = this.activatedRoute.snapshot.params['id'];
    // Faire la request pour récuperer la listes des videos B.A 
    this.movieSvc.getVideosOfMovie(this.movieId).subscribe( 
      response => {
        this.movieVideo = response.results.find( (el:any) =>  el.site == 'YouTube') 
        console.log(this.movieVideo); 
      }
    ) 
  }

  getVideoUrl(videoKey:string) {
    return 'https://www.youtube.com/embed/'+videoKey
  }

}