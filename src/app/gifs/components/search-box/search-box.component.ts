import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'gifs-search-box',
  //keyup lo que hara sera ir mandando las request para buscar los gifs segun vaya escribiendo el usuario
  template: `
    <h5>Buscar:</h5>
    <input type="text"
    class="form-control"
    placeholder="Buscar gifs..."
    (keyup)="searchTag()"
    #txtTagInput
    >


  `
})
export class SearchBoxComponent {

  @ViewChild('txtTagInput')
  tagInput!: ElementRef<HTMLInputElement>;

  constructor() { }

  searchTag() {
    const newTag = this.tagInput.nativeElement.value;


    console.log({ newTag })
  }


}
