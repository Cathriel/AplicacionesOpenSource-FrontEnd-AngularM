import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PostsApiService} from "../../services/posts/posts-api.service";
import {TokenStorageService} from "../../services/authentication/token-storage.service";
import {UsersApiService} from "../../services/users/users-api.service";
import {JustEmail} from "../../models/justEmail";
import {Post} from "../../models/post";
import {LandlordsApiService} from "../../services/profiles/landlords-api.service";
import {LandlordResource} from "../../models/landlordResource";
import {Profile} from "../../models/profile";
import {Plan} from "../../models/plan";

@Component({
  selector: 'app-home-landlord',
  templateUrl: './home-landlord.component.html',
  styleUrls: ['./home-landlord.component.css']
})
export class HomeLandlordComponent implements OnInit {
  currentUser: any;
  profile: any;
  myposts:any=[];
  posts:any=[];
  reviews:any=[];
  justEmail:JustEmail= {'email':''};
  plan: Plan={
    id:0,
    description:'',
    name:'',
    price:0
  }
  lanlord: Profile= {
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
  latestPost: Post={
    id:0,
    address:'',
    bathQuantity:0,
    department:'',
    district:'',
    price:0,
    roomQuantity:0,
    title:'',
    picture:'',
  };

  constructor(private router: Router, private route: ActivatedRoute,private postsApi: PostsApiService,
              private tokenStorageService: TokenStorageService,
              private usersApiService: UsersApiService,
              private landlordApiService: LandlordsApiService) { }

  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser();
    this.justEmail.email=this.currentUser.username;
    console.log(this.justEmail);
    if(this.currentUser!=null){
      this.getProfileData();
    }
    else{
      this.router.navigate(['/log-in']).then(()=>{
        console.log(this.router.url);
        window.location.reload();
      });
    }
  }

  getAllPosts(): void {
    this.postsApi.getAllPost().subscribe((response: any) => {
      console.log(response);
      this.posts= response.content;
    });
  }
  getLatestPost():void{
    this.landlordApiService.getPostsByLandlordId(this.lanlord.id).subscribe(
      data=>{
        console.log(data);
        this.myposts=data.content;
        console.log(this.myposts);
        this.latestPost=this.myposts[this.myposts.length-1];
        console.log(this.latestPost);
        this.getAllReviewsOfTheLatestPost();
      }
    )
  }
  getAllReviewsOfTheLatestPost(){
    this.postsApi.getAllReviewByPostId(this.latestPost.id).subscribe(
      data=>{
        console.log(data);
        this.reviews=data.content;
      }
    )
  }

  getProfileData(){
    this.getAllPosts();
    this.usersApiService.getUserByEmail(this.justEmail).subscribe(
      data=> {
        console.log(data);
        this.usersApiService.getProfileByUserId(data.id).subscribe(
          user=>{
            this.lanlord=user;
            console.log(this.lanlord);
            this.getLatestPost();
            if(this.lanlord.plan.id<=2){
              this.router.navigate(['/home-leaseholder']).then(()=>{
                console.log(this.router.url);
                window.location.reload();
              });
            }
          }
        )
      }
    )
  }
  gotToTarget(postId:number){
    this.router.navigate([`/detailed-post/${postId}`]).then(()=>{
      console.log(this.router.url);
      window.location.reload();
    });

  }
  members: {id:number, title: string, subtitle: string, content: string, url: string}[] = [
    {id:1,title: 'S/ 1800', subtitle: 'San Isidro, Lima', content: 'Content here', url: 'https://img10.naventcdn.com/avisos/11/00/50/67/23/63/1200x1200/29572941.jpg'},
    {id:2,title: 'S/ 1400', subtitle: 'Magdalena, Lima', content: 'Content here', url: 'https://img10.naventcdn.com/avisos/11/00/50/67/23/63/1200x1200/29572941.jpg'},
    {id:3,title: 'S/ 1200', subtitle: 'Magdalena, Lima', content: 'Content here', url: 'https://img10.naventcdn.com/avisos/11/00/50/67/23/63/1200x1200/29572941.jpg'},
    {id:4,title: 'S/ 1900', subtitle: 'San Isidro, Lima', content: 'Content here', url: 'https://img10.naventcdn.com/avisos/11/00/50/67/23/63/1200x1200/29572941.jpg'},
  ];
}
