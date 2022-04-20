import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  movieId:number = 0

  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.params); 
    // renvoie un objet des paramètres nommés de l'url {id:1234}
    this.movieId = this.activatedRoute.snapshot.params['id'];
    // Faire la request pour récuperer la listes des videos B.A 
    // /movie/{id}/videos

  
  }

}
