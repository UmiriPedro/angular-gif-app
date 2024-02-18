import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card',
  templateUrl: './card.component.html'
})
export class CardComponent implements OnInit{
  /* El OnInit es un método especial del ciclo de vida de los componentes de Angular
  que se ejecuta cuando el componente se ha inicializado.
  */

  @Input()
  public gif!: Gif;

  ngOnInit(): void {
    // Si la propiedad gif no viene, lanza un error
    if ( !this.gif ) throw new Error('Gif property is required');
  }

}
