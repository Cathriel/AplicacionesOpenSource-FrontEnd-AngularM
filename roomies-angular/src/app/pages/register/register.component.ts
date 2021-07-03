import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/authentication/auth.service";
import {TokenStorageService} from "../../services/authentication/token-storage.service";
import {UsersApiService} from "../../services/users/users-api.service";
import {Landlord} from "../../models/landlord";
import {Leaseholder} from "../../models/leaseholder";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userLogged:any;
  currentUser: any;
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  userInformation: FormGroup;
  loginInformation: FormGroup;
  defaultLandlord: Landlord = {
    address:'',
    birthday:'',
    cellphone:0,
    department:'',
    description:'',
    district:'',
    lastName:'',
    name:'',
    province:'',
    profilePicture:''};
  defaultLeaseholder: Leaseholder = {
    address:'',
    birthday:'',
    cellphone:0,
    department:'',
    description:'',
    district:'',
    lastName:'',
    name:'',
    province:'',
    profilePicture:''};
  accountType: String='';
  isLoggedIn=false;
  roles: string[] = [];

  constructor(private _formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private tokenStorageService: TokenStorageService,
              private userService: UsersApiService) {
    this.isLinear=true;
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      email:[null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      name:[null, [Validators.required]],
      lastname:[null, [Validators.required]],
      cellphone:[null, [Validators.required]],
      birthday:[null, [Validators.required]],
      department:[null, [Validators.required]],
      province:[null, [Validators.required]],
      district:[null, [Validators.required]],
      address:[null, [Validators.required]],
      description:[null],
      profilePicture:[null, [Validators.required]],
    });
    this.userInformation = this._formBuilder.group({
      email:[null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
    this.loginInformation = this._formBuilder.group({
      username:[null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.currentUser = this.tokenStorageService.getUser();
    if (this.currentUser){
      this.router.navigate(['/']).then(()=>{
        console.log(this.router.url);
        window.location.reload();
      });
    }
    if(this.tokenStorageService.getToken()){
      this.isLoggedIn=true;
      this.roles=this.tokenStorageService.getUser().roles;
    }
  }

  setAccountType(type: String): void{
    this.accountType=type;
  }
  changeLinear():void {
    this.isLinear=!this.isLinear;
  }
  logged():void{
    this.userLogged = this.tokenStorageService.getUser();
  }
  onSubmit(planId:number):void{
    console.log(this.secondFormGroup.value);
    this.completeUserInformation();
    console.log(this.userInformation.value);
    this.completeProfileInformation();
    this.authService.register(this.secondFormGroup.value).subscribe(
      data=>{
        console.log(data);
        this.login(planId,data.id);
      }
    );
  }

  login(planId:number,userId:number):void{

    this.authService.login(this.loginInformation.value).subscribe(
      data=>{
        console.log(data);
        this.tokenStorageService.saveToken(data.token);
        this.tokenStorageService.saveUser(data);
        this.roles=this.tokenStorageService.getUser().roles;
        if(this.accountType=='arrendador'){
          this.userService.addLandlord(userId,planId,this.defaultLandlord).subscribe(
            data=>{
              console.log("arrendador crear");
              console.log(data);
              this.router.navigate(['/home-landlord']).then(()=>{
                console.log(this.router.url);
                window.location.reload();
              });
            },
            error => {
              console.log("arrendador error");
              console.log(error.error.errorMessage);
              this.router.navigate(['/home-leaseholder']).then(()=>{
                console.log(this.router.url);
                window.location.reload();
              });
            }
          );
        }else{
          this.userService.addLeaseholder(userId,planId,this.defaultLeaseholder).subscribe(
            data=>{
              console.log("arrendatario crear");
              console.log(data);
              this.router.navigate(['/home-leaseholder']).then(()=>{
                console.log(this.router.url);
                window.location.reload();
              });
            },
            error => {
              console.log("arrendatario error");
              console.log(error.error.errorMessage);
            }
          );
        }

      },
      error => {
        console.log(error.error.errorMessage);
      }
    )
  }

  completeUserInformation():void{
    this.userInformation.value.email=this.secondFormGroup.value.email;
    this.userInformation.value.password=this.secondFormGroup.value.password;
    this.loginInformation.value.username=this.secondFormGroup.value.email;
    this.loginInformation.value.password=this.secondFormGroup.value.password;
  }
  completeProfileInformation():void{
    if(this.accountType=='arrendador'){
      this.defaultLandlord.name=this.secondFormGroup.value.name;
      this.defaultLandlord.lastName=this.secondFormGroup.value.lastname;
      this.defaultLandlord.cellphone=this.secondFormGroup.value.cellphone;
      this.defaultLandlord.birthday=this.secondFormGroup.value.birthday;
      this.defaultLandlord.department=this.secondFormGroup.value.department;
      this.defaultLandlord.province=this.secondFormGroup.value.province;
      this.defaultLandlord.district=this.secondFormGroup.value.district;
      this.defaultLandlord.address=this.secondFormGroup.value.address;
      this.defaultLandlord.description=this.secondFormGroup.value.description;
      this.defaultLandlord.profilePicture=this.secondFormGroup.value.profilePicture;
    }else{
      this.defaultLeaseholder.name=this.secondFormGroup.value.name;
      this.defaultLeaseholder.lastName=this.secondFormGroup.value.lastname;
      this.defaultLeaseholder.cellphone=this.secondFormGroup.value.cellphone;
      this.defaultLeaseholder.birthday=this.secondFormGroup.value.birthday;
      this.defaultLeaseholder.department=this.secondFormGroup.value.department;
      this.defaultLeaseholder.province=this.secondFormGroup.value.province;
      this.defaultLeaseholder.district=this.secondFormGroup.value.district;
      this.defaultLeaseholder.address=this.secondFormGroup.value.address;
      this.defaultLeaseholder.description=this.secondFormGroup.value.description;
      this.defaultLeaseholder.profilePicture=this.secondFormGroup.value.profilePicture;

    }
  }

  plansLandlord: Array<any>= [{
    id:'3',
    name:'Plan Basico',
    benefits: ['30 días de publicaciones','Visibilidad estándar','El más económico para publicar'],
    price: 19.90
  },{
    id:'4',
    name:'Plan Estándar',
    benefits: ['30 días de publicaciones','Visibilidad destacada','Genera más cantidad de interesados'],
    price: 39.90
  },{
    id:'5',
    name:'Plan Basico',
    benefits: ['30 días de publicaciones','Máxima exposición','Genera mayor cantidad de interesados'],
    price: 59.90
  },];

  plansLeaseholder: Array<any>= [{
    id:'1',
    name:'Plan Gratuito',
    benefits: ['Ver los detalles de cada anuncio','Agregar anuncios a tu lista de favoritos','Buscar roomates y contactarlos'],
    price: 0.00
  },{
    id:'2',
    name:'Plan Premium',
    benefits: ['Poder tener una vista de 360° del inmueble','Posibilidad de hacer videollamadas con los posibles roommates','Colocar un video como presentación en tu perfil'],
    price: 19.90
  }];

}
