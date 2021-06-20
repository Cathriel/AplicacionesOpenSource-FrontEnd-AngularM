import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-leaseholder',
  templateUrl: './home-leaseholder.component.html',
  styleUrls: ['./home-leaseholder.component.css']
})
export class HomeLeaseholderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  panelOpenState = false;

  latest: {title: string,  description: string, dateVisited:string,url: string}[] = [
    {title: 'Casa de 2 pisos con habitacion compartida', description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, ' +
        'sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam' +
        ' et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
      dateVisited:'09/06/2021', url: 'https://img10.naventcdn.com/avisos/11/00/50/67/23/63/1200x1200/29572941.jpg'},

    {title: 'Departamento con vista al mar en Costa Verde', description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, ' +
        'sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et ' +
        'justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
      dateVisited:'09/06/2021',url: 'https://www.bienesonline.com/peru/photos/casa-salamanca-13722879290.jpg'},

    {title: 'Habitacion para 4 personas',description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod ' +
        'tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea' +
        ' rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
      dateVisited:'09/06/2021', url: 'https://img10.naventcdn.com/avisos/111/00/60/46/98/52/720x532/246463138.jpg'}
  ];


  members: {title: string, subtitle: string, content: string, url: string}[] = [
    {title: 'San Miguel, Lima', subtitle: 'Alquiler Departamento Amoblado en San Juan de Miraflores', content: '', url: 'https://img10.naventcdn.com/avisos/11/00/50/67/23/63/1200x1200/29572941.jpg'},
    {title: 'Surco, Lima', subtitle: 'Alquiler Departamento Amoblado en San Juan de Miraflores', content: '', url: 'https://www.bienesonline.com/peru/photos/casa-salamanca-13722879290.jpg'},
    {title: 'Chorrillos, Lima', subtitle: 'Alquiler Departamento Amoblado en San Juan de Miraflores', content: '', url: 'https://img10.naventcdn.com/avisos/111/00/60/46/98/52/720x532/246463138.jpg'}
  ];

  leaseholders: {name: string, district: string, description: string, url: string}[] = [
    {name:'Ana López',district: 'San Miguel, Lima',description:'Lorem ipsum iam nonumy eirmod tempor invidunt ut labore et dolore magna ' +
        'aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea reb',
      url: 'https://media.istockphoto.com/photos/portrait-of-young-woman-with-curly-hair-in-the-city-picture-id1218228957?k=6&m=1218228957&s=612x612&w=0&h=Oc5qFk225PFhWuDawxef2BZfcgkqGo-QWU5ZMXPWC7M='},
    {name:'Andrés Rodríguez',district: 'La Molina, Lima',description:'Lorem ipsum iam nonumy eirmod tempor invidunt ut labore et dolore magna ' +
        'aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea reb',
      url: 'https://www.mensjournal.com/wp-content/uploads/mf/1280-selfie.jpg?quality=86&strip=all'},
    {name:'Rosana Gómez',district: 'Chorrillos, Lima',description:'Lorem ipsum iam nonumy eirmod tempor invidunt ut labore et dolore magna ' +
        'aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea reb',
      url: 'https://media.istockphoto.com/photos/smiling-businesswoman-looking-at-camera-webcam-make-conference-call-picture-id1129638608?k=6&m=1129638608&s=612x612&w=0&h=8OhKQCq_elLsW_PAWA4n8pzQy3mlkf5a_ztp2Nbv8Y8='},
  ];
}
