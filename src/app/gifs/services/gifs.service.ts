import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' })
export class GifsService {

  public gifsList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs'
  private apiKey: string = 'f6HlH9VFS7Gnq5UNsDHHbr7wEM0ZWJez';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    console.log("Local storage charged")
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  // metodo que usaremos para realizar ciertas configuraciones a la hora de realizar
  // las busquedas de gifs
  private organizeHistory(tag: string): void {
    tag.toLowerCase();

    // comprobamos si el usuario ha introducido un nombre ya buscado anteriormente
    if (this._tagsHistory.includes(tag))
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);


    this._tagsHistory.unshift(tag);
    // si el historial tiene mas de 10 busquedas eliminaremos siempre la ultima
    this._tagsHistory = this._tagsHistory.splice(0, 10)
    this.saveLocalStorage();
  }

  // metodo que usaremos para guardar los datos de las busquedas en el localStorage del navegador
  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory))
  }

  // metodo que usaremos para cargar el local storage del navegador
  private loadLocalStorage(): void {
    // si no tenemos datos no haremos nada
    if (!localStorage.getItem('history'))
      return;

    // en el caso de que si haya data obtendremos
    //los string de estos y los pasaremos a un objeto
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);


    if (this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);

  }

  // metodo que usaremos para buscar los gifs a traves de la api
  searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe(resp => {

        this.gifsList = resp.data;

      });


  }
}
