import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
})
export class LazyImageComponent implements OnInit {

  @Input()
  public url!: string;

  @Input()
  public alt?: string;

  public hasLoaded: boolean = false

  ngOnInit(): void {
    if (!this.url)
      throw new Error('Se necesita la URL.');

    if (!this.alt)
      this.alt = ''
  }

  // metodo que usaremos para saber cuando se cargan las imagenes
  onLoad() {
    console.log("Imagen cargada")
    this.hasLoaded = true
  }

}
