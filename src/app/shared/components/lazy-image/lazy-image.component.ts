import { Component, Input, OnInit } from '@angular/core';
import { timeout } from 'rxjs';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html'
})
export class LazyImageComponent implements OnInit {

  @Input()
  public url!: string;

  @Input()
  public alternativeText: string = '';

  public hasLoaded: boolean = false; // Inicializo en false porque cuando inicia por primera vez la imagen aún no cargó

  ngOnInit(): void {
    if ( !this.url ) throw new Error('URL property is required');
  }

  // Método que se ejecuta cuando se carga la imagen
  onLoad(): void {
    // Programo un timeout para hacer que las imagenes siempre tarden 1 segundo (1000) en cargar
    setTimeout(() => {
      this.hasLoaded = true;
    }, 1000);
  }

}
