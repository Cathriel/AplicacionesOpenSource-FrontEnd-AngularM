import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from "@angular/material/bottom-sheet";

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  url:string;
}

export interface Detalles {
  precio: number;
  dormitorios: number;
  banos: number;
  m2: number
}

@Component({
  selector: 'app-detailed-post',
  templateUrl: './detailed-post.component.html',
  styleUrls: ['./detailed-post.component.css']
})
export class DetailedPostComponent implements OnInit {

  constructor() {}

  //TABLAS
  ELEMENT_DATA: Detalles[] = [
    { precio: 200, dormitorios: 3, banos: 2, m2: 128},
  ]
  displayedColumns: string[] = ['precio','dormitorios','banos','m2'];
  dataSource = this.ELEMENT_DATA;

  //REEMPLAZO DE LAS IMAGENES CARRUSEL
  tiles: Tile[] = [
    {text: 'One', cols: 2, rows: 2, color: 'lightblue',url:'https://www.elmueble.com/medio/2020/08/24/salon-pequeno-con-sofa-chaiselongue_7e35693f_1593x2000.jpg'},
    {text: 'Two', cols: 1, rows: 1, color: 'lightgreen',url:'https://www.milideas.net/wp-content/uploads/colores-relajantes-dormitorio.jpg'},
    {text: 'Tree', cols: 1, rows: 1, color: 'lightpink',url:'https://i.pinimg.com/originals/14/71/0b/14710bb776a082ab178a061c211168f7.jpg'},
    {text: 'Four', cols: 1, rows: 1, color: '#DDBDF1',url:'https://imgs.6sqft.com/wp-content/uploads/2017/05/31120343/bathroom-plants.jpg'},
    {text: 'Four', cols: 1, rows: 1, color: '#DDBDF1',url:'https://www.balconydecoration.com/wp-content/uploads/2019/07/Small-apartment-balcony-16-600x735.jpg'}
  ]

  //PARA LOS MAPS
  ubicacion = {
    lat: -12.07656,
    lng: -77.09375
  }

  ngOnInit(): void {
  }

  members: {title: string, subtitle: string, content: string, url: string}[] = [
    {title: 'San Miguel, Lima', subtitle: 'Alquiler Departamento Amoblado en San Juan de Miraflores', content: '', url: 'https://img10.naventcdn.com/avisos/11/00/50/67/23/63/1200x1200/29572941.jpg'},
    {title: 'Surco, Lima', subtitle: 'Alquiler Departamento Amoblado en San Juan de Miraflores', content: '', url: 'https://www.bienesonline.com/peru/photos/casa-salamanca-13722879290.jpg'},
    {title: 'Chorrillos, Lima', subtitle: 'Alquiler Departamento Amoblado en San Juan de Miraflores', content: '', url: 'https://img10.naventcdn.com/avisos/111/00/60/46/98/52/720x532/246463138.jpg'},
    {title: 'Chorrillos, Lima', subtitle: 'Alquiler Departamento Amoblado en San Juan de Miraflores', content: '', url: 'https://www.bienesonline.com/peru/photos/casa-surco1357930686.jpg'}
  ];

}

