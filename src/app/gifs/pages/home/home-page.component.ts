import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent {

  // Inyecto el GifsService
  constructor( private gifsService: GifsService ) {}

  // Método getter para el listado de gifs
  get gifs(): Gif[] {
    return this.gifsService.gifs;
  }
}
