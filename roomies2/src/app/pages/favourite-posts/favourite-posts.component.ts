import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../services/authentication/token-storage.service";
import {LeaseholdersApiService} from "../../services/profiles/leaseholders-api.service";
import {Router} from "@angular/router";
import {UsersApiService} from "../../services/users/users-api.service";
import {Plan} from "../../models/plan";
import {Profile} from "../../models/profile";
import {JustEmail} from "../../models/justEmail";

@Component({
  selector: 'app-favourite-posts',
  templateUrl: './favourite-posts.component.html',
  styleUrls: ['./favourite-posts.component.css']
})
export class FavouritePostsComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService
              , private leaseholderApiService: LeaseholdersApiService
              , private router: Router,
              private usersApiService: UsersApiService) { }

  currentUser: any;
  posts: any = [];
  plan: Plan={
    id:0,
    description:'',
    name:'',
    price:0
  }
  leaseholder: Profile= {
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
    plan:this.plan};

  justEmail:JustEmail= {'email':''};

  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser();
    this.justEmail.email=this.currentUser.username;

    if (this.currentUser) {
      this.getProfileData();
    }else{
      this.router.navigate(['/log-in']).then(()=>{
        console.log(this.router.url);
        window.location.reload();
      });
  }
  }

  members: {id:number, title: string, subtitle: string, content: string, url: string,price:number,area:number;nb:number}[] = [
    {id:1,title: 'S/ 1800', subtitle: 'San Isidro, Lima', content: 'Content here', url: 'https://img10.naventcdn.com/avisos/11/00/50/67/23/63/1200x1200/29572941.jpg',price:1800,area:180,nb:1},
    {id:2,title: 'S/ 1400', subtitle: 'Magdalena, Lima', content: 'Content here', url: 'https://img10.naventcdn.com/avisos/11/00/50/67/23/63/1200x1200/29572941.jpg',price:1400,area:140,nb:2},
    {id:3,title: 'S/ 1200', subtitle: 'Magdalena, Lima', content: 'Content here', url: 'https://img10.naventcdn.com/avisos/11/00/50/67/23/63/1200x1200/29572941.jpg',price:1200,area:120,nb:3},
    {id:4,title: 'S/ 1900', subtitle: 'San Isidro, Lima', content: 'Content here', url: 'https://img10.naventcdn.com/avisos/11/00/50/67/23/63/1200x1200/29572941.jpg',price:1900,area:190,nb:1},
    {id:5,title: 'S/ 1500', subtitle: 'Surco, Lima', content: 'Content here', url: 'https://img10.naventcdn.com/avisos/11/00/50/67/23/63/1200x1200/29572941.jpg',price:1500,area:150,nb:1},
    {id:6,title: 'S/ 1000', subtitle: 'Comas, Lima', content: 'Content here', url: 'https://img10.naventcdn.com/avisos/11/00/50/67/23/63/1200x1200/29572941.jpg',price:1000,area:100,nb:2}
  ];

  navigateToDetailedPost(postId: number): void {
    this.router.navigate([`/detailed-post/${postId}`])
      .then(() => console.log('Navigated to Post'));
  }

  UnassignPost(postId: number): void {
    this.leaseholderApiService.unassignPostByLeaseholderId(this.leaseholder.id, postId).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error.error().errorMessage);
      }
    )
  }

  getProfileData(){
    this.usersApiService.getUserByEmail(this.justEmail).subscribe(
      data=> {
        console.log(data);
        this.usersApiService.getProfileByUserId(data.id).subscribe(
          user=>{
            this.leaseholder=user;
            if(this.leaseholder.plan.id>=3){
              this.router.navigate(['/home-landlord']).then(()=>{
                console.log(this.router.url);
                window.location.reload();
              });
            }
            this.leaseholderApiService.getAllPostsByLeaseholderId(this.leaseholder.id).subscribe(
              response => {
                console.log(response);
                this.posts = response;
              },
              error => {
                console.log(error.error.errorMessage);
              });
          }
        )
      }
    )
  }

}
