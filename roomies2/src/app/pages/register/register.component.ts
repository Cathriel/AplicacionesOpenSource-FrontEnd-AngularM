import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  accountType: String='';

  constructor(private _formBuilder: FormBuilder) {
    this.isLinear=true;
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  ngOnInit() {
  }
  setAccountType(type: String): void{
    this.accountType=type;
  }
  changeLinear():void {
    this.isLinear=!this.isLinear;
  }

  plansLandlord: Array<any>= [{
    name:'Plan Basico',
    benefits: ['30 días de publicaciones','Visibilidad estándar','El más económico para publicar'],
    price: 19.90
  },{
    name:'Plan Estándar',
    benefits: ['30 días de publicaciones','Visibilidad destacada','Genera más cantidad de interesados'],
    price: 39.90
  },{
    name:'Plan Basico',
    benefits: ['30 días de publicaciones','Máxima exposición','Genera mayor cantidad de interesados'],
    price: 59.90
  },];

  plansLeaseholder: Array<any>= [{
    name:'Plan Gratuito',
    benefits: ['Ver los detalles de cada anuncio','Agregar anuncios a tu lista de favoritos','Buscar roomates y contactarlos'],
    price: 0.00
  },{
    name:'Plan Premium',
    benefits: ['Poder tener una vista de 360° del inmueble','Posibilidad de hacer videollamadas con los posibles roommates','Colocar un video como presentación en tu perfil'],
    price: 19.90
  }];

}
