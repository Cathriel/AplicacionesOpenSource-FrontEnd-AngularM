import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Post} from "../../../models/post";
import {PostsApiService} from "../../../services/posts/posts-api.service";
import {TokenStorageService} from "../../../services/authentication/token-storage.service";
import {LandlordResource} from "../../../models/landlordResource";
import {LandlordsApiService} from "../../../services/profiles/landlords-api.service";
import {UsersApiService} from "../../../services/users/users-api.service";
import {JustEmail} from "../../../models/justEmail";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  @ViewChild('postForm', { static: false }) postForm!: NgForm;

  currentUser: any;
  posts: any=[];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  postData: Post = {} as Post;
  profile: any;
  justEmail:JustEmail= {'email':''};
  landlord: LandlordResource= {
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
    profilePicture:''};
  newPostId:number=0;


  constructor(private router: Router,
              private _formBuilder: FormBuilder,
              private postsApi: PostsApiService,
              private landlordsApi: LandlordsApiService,
              private tokenStorageService: TokenStorageService,
              private usersApiService: UsersApiService) {

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
      picture: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser();
    this.justEmail.email=this.currentUser.username;
    if(this.currentUser){
      this.getProfileData();
    }
    else{
      this.router.navigate(['/log-in']).then(()=>{
        console.log(this.router.url);
        window.location.reload();
      });
      this.getAllPosts();
    }
  }

  navigateToSuccessfulAdd(): void {
    /*this.router.navigate(['successfuladd'])
      .then(() => console.log('Navigated to Successful Add'));*/
  }

  addPost(): void {
    console.log(this.secondFormGroup.value.picture);
    const newPost = {title: this.postData.title,
      district: this.postData.district,
      address: this.postData.address,
      roomQuantity:this.postData.roomQuantity,
      bathQuantity:this.postData.bathQuantity,
      price:this.postData.price,
      department:this.postData.department,
      picture:this.secondFormGroup.value.picture};
    console.log(newPost);
    this.landlordsApi.addPost(this.landlord.id,newPost)
      .subscribe(data => {
        console.log(data);
        this.newPostId=data.id;
      });
  }

  getProfileData(){
    this.usersApiService.getUserByEmail(this.justEmail).subscribe(
      data=> {
        console.log(data);
        this.usersApiService.getProfileByUserId(data.id).subscribe(
          user=>{
            this.landlord=user;
          }
        )
      }
    )
  }

  getAllPosts(): void {
    this.postsApi.getAllPost().subscribe((response: any) => {
      console.log(response);
      this.posts= response.content;
    });
  }



  navigateToPost(): void {
    this.landlordsApi.getPostsByLandlordId(this.landlord.id).subscribe(
      data=>{
        console.log(data.content[data.content.length-1].id);
        this.router.navigate([`/detailed-post/${data.content[data.content.length-1].id}`]).then(r  =>
        console.log("Navigate to post Detail"));
      }
    )
  }
}
