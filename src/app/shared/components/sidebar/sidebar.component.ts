import { Component, Input } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  // Inyecto el servicio GifsService
  constructor( private gifsService: GifsService ) {}

  // Creo un getter que me devuelve el tagsHistory del GifsService
  get tags(): string[] {
    return this.gifsService.tagsHistory;
  }

  /* Método que llama al searchTag del servicio.
    Se ejecuta cuando se hace click en algún elemento del historial de búsqueda
  */
  searchTag(tag: string): void {
    this.gifsService.searchTag(tag);
  }
}
