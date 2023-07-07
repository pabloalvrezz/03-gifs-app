import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';



@Injectable({ providedIn: 'root' })
export class GifsService {

  public gifsList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs'
  private apiKey: string = 'f6HlH9VFS7Gnq5UNsDHHbr7wEM0ZWJez';

  constructor(private http: HttpClient) { }


  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string): void {
    tag.toLowerCase();

    // comprobamos si el usuario ha introducido un nombre ya buscado anteriormente
    if (this._tagsHistory.includes(tag))
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag)


    this._tagsHistory.unshift(tag)

    // si el historial tiene mas de 10 busquedas eliminaremos siempre la ultima
    this._tagsHistory = this._tagsHistory.splice(0, 10)
  }


  searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag)


    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe(resp => {
        this.gifsList = resp.data
        console.log({ gifs: this.gifsList })
      })

  }

}
