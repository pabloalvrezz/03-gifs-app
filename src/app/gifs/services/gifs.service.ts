import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GifsService {

  private _tagsHistory: string[] = [];


  constructor() { }


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

  public searchTag(tag: string): void {
    this.organizeHistory(tag);




  }

}
