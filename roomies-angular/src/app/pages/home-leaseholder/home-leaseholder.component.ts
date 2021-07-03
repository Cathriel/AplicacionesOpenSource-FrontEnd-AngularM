import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PostsApiService} from "../../services/posts/posts-api.service";
import {TokenStorageService} from "../../services/authentication/token-storage.service";
import {UsersApiService} from "../../services/users/users-api.service";
import {LandlordsApiService} from "../../services/profiles/landlords-api.service";
import {JustEmail} from "../../models/justEmail";
import {LeaseholderResource} from "../../models/leaseholderResource";
import {LeaseholdersApiService} from "../../services/profiles/leaseholders-api.service";
import {Plan} from "../../models/plan";
import {Profile} from "../../models/profile";

@Component({
  selector: 'app-home-leaseholder',
  templateUrl: './home-leaseholder.component.html',
  styleUrls: ['./home-leaseholder.component.css']
})
export class HomeLeaseholderComponent implements OnInit {
  currentUser: any;
  profile: any;
  justEmail:JustEmail= {'email':''};
  posts:any=[];
  somePosts:any=[];
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
  profiles:any=[];
  someProfiles:any=[];

  constructor(private router: Router, private route: ActivatedRoute,private postsApi: PostsApiService,
              private tokenStorageService: TokenStorageService,
              private usersApiService: UsersApiService,
              private leaseholderApiService: LeaseholdersApiService) { }

  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser();
    this.justEmail.email=this.currentUser.username;
    if(this.currentUser){
      this.getProfileData();
      console.log(this.leaseholder);
      console.log("aaaa");
    }
    else{
      this.router.navigate(['/log-in']).then(()=>{
        console.log(this.router.url);
        window.location.reload();
      });
    }
  }
  panelOpenState = false;


  getAllPosts(): void {
    this.postsApi.getAllPost().subscribe((response: any) => {
      console.log(response);
      this.posts= response.content;
      for(let i=1; i<=4; i++){
        this.somePosts.push(this.posts[this.posts.length-i])
      }
      console.log(this.somePosts);
    });
  }


  getProfileData(){
    this.getAllPosts();
    this.getLeaseholders();
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

  getLeaseholders(){
    this.leaseholderApiService.getAll().subscribe(
      data=>{
        console.log(data.content);
        this.profiles= data.content;
        for(let i=1; i<=1; i++){
          this.someProfiles.push(this.profiles[this.profiles.length-i])
        }
        console.log(this.someProfiles);
      }
    )
  }

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
