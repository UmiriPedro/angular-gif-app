import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {


  private _tagsHistory: string[] = []; // Variable privada que va a tener el historial de búsqueda
  private gifsList: Gif[] = []; // Variable privada que va a contener un listado de gifs
  private apiKey: string = 'P5gaTEeCaAzc6femN7rOPNMOLZV9kNf2'; // Variable privada que contiene el apiKey de Giphy
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs'; // Variable privada que contiene el url del servicio de bùsqueda a Giphy

  // Inyectamos el HttpClient
  constructor( private http: HttpClient ) {
    // Cuando se construye el servicio, cargo el local storage
    this.loadLocalStorage();

    console.log('Gifs Service Ready');
   }

  // Getter de la variable que contiene el historial de búsqueda
  get tagsHistory(): string[] {
    return [...this._tagsHistory]; // Devuelvo una copia del _tagHistory
  }

  // Getter de la variable que contiene el listado de gifs
  get gifs(): Gif[] {
    return this.gifsList;
  }

  searchTag( tag: string ): void {
    // Si el tag está vacío, no hago nada
    if (tag.length === 0) return;

    // Llamo al método que organiza el _tagsHistory
    this.organizeHistory(tag);

    // Constante con los parámetros que se utilizan para el search de Giphy
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag);

    // Hacemos una llamada http del tipo get a Giphy.
    this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, { params: params })
      .subscribe( resp => { // Nos subscribimos a la respuesta
        this.gifsList = resp.data; // Guardo resp.data en la lista de gifs
      });
  }

  private organizeHistory( tag: string ) {
    tag = tag.toLowerCase();  // Paso todo el tag a minúscula

    // Si tagHistory contiene tag
    if (this.tagsHistory.includes(tag) ) {
      // Actualizo _tagsHistory quitando el elemento tag
      this._tagsHistory = this.tagsHistory.filter( (oldTag) => oldTag != tag);
    }

    // Agrego el nuevo tag al inicio del _tagsHistory
    this._tagsHistory.unshift( tag.toLowerCase() );

    // Mantngo el _tagsHistory con los últimos 10 elementos
    this._tagsHistory = this.tagsHistory.splice(0, 10);

    // Guardo el _tagsHistory en el local storage
    this.saveLocalStorage();
  }

  // Método para guardar el _tagsHistory en el local storage
  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this.tagsHistory)); // Serializo el _tagsHistory
  }

  // Método para recuperar el _tagsHistory del local storage
  private loadLocalStorage(): void {
    // Si en el local storage no tenemos la key 'history', termina la ejecución del método
    if ( !localStorage.getItem('history') ) return;

    // Deserealizo el 'history' del local storage y el resultado lo guardo en _tagsHistory
    this._tagsHistory = JSON.parse( localStorage.getItem('history')! ); // Uso el operador '!' porque ya se que no va a ser null

    // Si _tagsHistory está vacío, termina la ejecución del método
    if (this.tagsHistory.length === 0) return;

    // Cargo los gifs de la última búsqueda
    this.searchTag(this.tagsHistory[0]);
  }
}
