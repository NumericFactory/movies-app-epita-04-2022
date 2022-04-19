import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  movies:Array<any> = []
  url:string = 'https://api.themoviedb.org/3/discover/movie?api_key=efdeb661aaa006b1e4f36f990a5fd8fd&language=fr'

  /* injecter un objet http de la class HttpClient*/ 
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.http.get(this.url).subscribe( (response:any) => this.movies = response.results )
  }

  getUrlImage(movieImageString:string) {
    return 'https://image.tmdb.org/t/p/w500'+movieImageString
  }

}
