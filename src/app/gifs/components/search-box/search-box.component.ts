import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input type="text"
      class="form-control"
      placeholder="Buscar gifs..."
      (keyup.enter)="searchTag()"
      #txtTagInput>
  `
})

export class SearchBoxComponent {

  @ViewChild('txtTagInput') // Nos sirve para tomar una referencia local. El txtTagInput esta declarado en el template y toma el valor del campo input.
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor( private gifsService: GifsService ) { }

  searchTag(): void {
    // Obtengo el valor de la búsqueda
    const newTag = this.tagInput.nativeElement.value;

    // Llamo al searchTag del gifsService con el newTag
    this.gifsService.searchTag(newTag);

    // Elimino el valor del cuadro de búsqueda
    this.tagInput.nativeElement.value = '';
  }

}
