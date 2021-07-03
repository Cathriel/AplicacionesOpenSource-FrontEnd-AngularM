import { Component } from '@angular/core';
import {TokenStorageService} from "./services/authentication/token-storage.service";
import {JustEmail} from "./models/justEmail";
import {LandlordResource} from "./models/landlordResource";
import {Profile} from "./models/profile";
import {Plan} from "./models/plan";
import {UsersApiService} from "./services/users/users-api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'roomies2';
  private roles: string[] | undefined;
  isLoggedIn=false;
  isLandlord=true;
  username: string | undefined;
  justEmail:JustEmail= {'email':''};
  plan: Plan={
    id:0,
    description:'',
    name:'',
    price:0
  }
  profile: Profile= {
    id:0,
    address:'',
    birthday:'',
    cellphone:0,
    department:'',
    description:'',
    district:'',
    lastName:'',
    name:'',
    province:'',
    profilePicture:'',
    plan: this.plan
  };
  constructor(private tokenStorageService: TokenStorageService,
              private usersApiService: UsersApiService) {}

  ngOnInit():void{
    this.isLoggedIn=!!this.tokenStorageService.getToken();
    if(this.isLoggedIn){
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.username=user.username;
      if (this.username != null) {
        this.justEmail.email = this.username;
        this.getProfileData();
      }
    }
  }

  getProfileData(){
    this.usersApiService.getUserByEmail(this.justEmail).subscribe(
      data=> {
        console.log(data);
        this.usersApiService.getProfileByUserId(data.id).subscribe(
          user=>{
            this.profile=user;
            if(this.profile.plan.id<=2){
              this.isLandlord=false;
            }
          }
        )
      }
    )
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
