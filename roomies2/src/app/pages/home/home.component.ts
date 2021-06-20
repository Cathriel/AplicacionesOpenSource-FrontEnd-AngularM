import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }

  members: {title: string, subtitle: string, content: string, url: string}[] = [
    {title: 'San Miguel, Lima', subtitle: 'Alquiler Departamento Amoblado en San Juan de Miraflores', content: '', url: 'https://img10.naventcdn.com/avisos/11/00/50/67/23/63/1200x1200/29572941.jpg'},
    {title: 'Surco, Lima', subtitle: 'Alquiler Departamento Amoblado en San Juan de Miraflores', content: '', url: 'https://www.bienesonline.com/peru/photos/casa-salamanca-13722879290.jpg'},
    {title: 'Chorrillos, Lima', subtitle: 'Alquiler Departamento Amoblado en San Juan de Miraflores', content: '', url: 'https://img10.naventcdn.com/avisos/111/00/60/46/98/52/720x532/246463138.jpg'}
  ];
}
