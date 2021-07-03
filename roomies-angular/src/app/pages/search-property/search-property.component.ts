import {Component,OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {Options, LabelType} from "@angular-slider/ngx-slider";
import {PageEvent} from "@angular/material/paginator";
import {Router} from "@angular/router";
import {PostsApiService} from "../../services/posts/posts-api.service";
import {LeaseholdersApiService} from "../../services/profiles/leaseholders-api.service";
import {TokenStorageService} from "../../services/authentication/token-storage.service";
import {Profile} from "../../models/profile";
import {Plan} from "../../models/plan";
import {JustEmail} from "../../models/justEmail";
import {UsersApiService} from "../../services/users/users-api.service";

@Component({
  selector: 'app-search-property',
  templateUrl: './search-property.component.html',
  styleUrls: ['./search-property.component.css']
})
export class SearchPropertyComponent implements OnInit {

  currentUser: any;
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
  posts:any=[];
  posts2:any=[];
  posts3:any=[];
  posts4:any=[];
  posts5:any=[];

  public form: FormGroup;

  dep: string='';
  province: string='';
  dist: string='';


  package: any;
  filterData: any =[];
  filterData2: any =[];
  filterData3: any =[];


  myControl = new FormControl();
  leftOptions: string[] = ['Lima', 'Trujillo', 'Huancavelica'];
  filteredOptions: Observable<string[]>;

  valuePrice: number = 1000.0;
  highValuePrice: number = 2000.0;
  optionsPrice: Options = {
    floor: 0.0,
    ceil: 5000.0,

    getSelectionBarColor: (): string => {
      return '#fba31b';
    },
    getPointerColor: (): string => {
      return '#fba31b';
    },

    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min price:</b> $' + value;
        case LabelType.High:
          return '<b>Max price:</b> $' + value;
        default:
          return '$' + value;
      }
    }
  };

  rangeValues:number[]=[this.valuePrice,this.highValuePrice];
  durations: any = [];

  valueArea: number = 50;
  highValueArea: number = 120;

  rangeValues2:number[]=[this.valueArea,this.highValueArea];

  optionsArea: Options = {
    floor: 0,
    ceil: 200,
    getSelectionBarColor: (): string => {
      return '#fba31b';
    },
    getPointerColor: (): string => {
      return '#fba31b';
    },
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min area: </b>' + value+' m^2';
        case LabelType.High:
          return '<b>Max area:</b>' + value +' m^2';
        default:
          return value + ' m^2';
      }
    }
  };


  constructor(private fb: FormBuilder
              ,private router: Router
              ,private postsApi: PostsApiService
              , private leaseholderApiService: LeaseholdersApiService
              ,private tokenStorageService: TokenStorageService
              ,private usersApiService: UsersApiService){
    this.form = this.fb.group({
      rating2: [4]
    });

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  ngOnInit():void {
    this.getAllPosts();
    this.currentUser = this.tokenStorageService.getUser();
    this.justEmail.email=this.currentUser.username;
    if(this.currentUser){
      this.getProfileData();
      console.log(this.leaseholder);
    }
    else{
      this.router.navigate(['/log-in']).then(()=>{
        console.log(this.router.url);
        window.location.reload();
      });
    }

  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.leftOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  getProfileData(){
    this.usersApiService.getUserByEmail(this.justEmail).subscribe(
      data=> {
        console.log(data);
        this.usersApiService.getProfileByUserId(data.id).subscribe(
          user=>{
            this.leaseholder=user;
          }
        )
      }
    )
  }

  getAllPosts(): void {
    this.postsApi.getAllPost().subscribe((response: any) => {
      console.log(response);
      this.posts= response.content;
      this.posts2=response.content;
      this.posts3=response.content;
      this.posts4=response.content;
      this.posts5=response.content;
    });
  }

  members: {id:number, title: string, subtitle: string, content: string, url: string,price:number,area:number;nb:number}[] = [
    {id:1,title: 'S/ 1800', subtitle: 'San Isidro, Lima', content: 'Content here', url: 'https://img10.naventcdn.com/avisos/11/00/50/67/23/63/1200x1200/29572941.jpg',price:1800,area:180,nb:1},
    {id:2,title: 'S/ 1400', subtitle: 'Magdalena, Lima', content: 'Content here', url: 'https://img10.naventcdn.com/avisos/11/00/50/67/23/63/1200x1200/29572941.jpg',price:1400,area:140,nb:2},
    {id:3,title: 'S/ 1200', subtitle: 'Magdalena, Lima', content: 'Content here', url: 'https://img10.naventcdn.com/avisos/11/00/50/67/23/63/1200x1200/29572941.jpg',price:1200,area:120,nb:3},
    {id:4,title: 'S/ 1900', subtitle: 'San Isidro, Lima', content: 'Content here', url: 'https://img10.naventcdn.com/avisos/11/00/50/67/23/63/1200x1200/29572941.jpg',price:1900,area:190,nb:1},
    {id:5,title: 'S/ 1500', subtitle: 'Surco, Lima', content: 'Content here', url: 'https://img10.naventcdn.com/avisos/11/00/50/67/23/63/1200x1200/29572941.jpg',price:1500,area:150,nb:1},
    {id:6,title: 'S/ 1000', subtitle: 'Comas, Lima', content: 'Content here', url: 'https://img10.naventcdn.com/avisos/11/00/50/67/23/63/1200x1200/29572941.jpg',price:1000,area:100,nb:2}
  ];

  handleChange() {
    this.posts = this.posts2.filter((item: { price: number; })  => {
      return (item.price > this.valuePrice && item.price < this.highValuePrice)
    });
  }

  handleChange2() {
    this.posts = this.posts3.filter((item: { price:number }) => {
      return (item.price*0.1 > this.valueArea && item.price*0.1 < this.highValueArea)
    });
  }

  handleChange3() {
    this.posts = this.posts4.filter((item: { roomQuantity:number }) => {
      return (this.durations.some((b: any) => b === item.roomQuantity) || this.durations.length === 0)
    });
  }
  handleChange4() {
    this.posts = this.posts5.filter((item: { bathQuantity:number }) => {
      return (this.durations.some((b: any) => b === item.bathQuantity) || this.durations.length === 0)
    });
  }

  checkFilter(id: number) {
    if (this.durations.some((a: number) => a === id)) {
      this.durations = this.durations.filter((a: number) => a !== id)
    } else {
      this.durations.push(id)
    }
    this.handleChange3();
  }

  checkFilter2(id: number) {
    if (this.durations.some((a: number) => a === id)) {
      this.durations = this.durations.filter((a: number) => a !== id)
    } else {
      this.durations.push(id)
    }
    this.handleChange4();
  }

  navigateToDetailPost(postId: number): void {
    this.router.navigate([`/detailed-post/${postId}`])
      .then(() => console.log('Navigated to Post'));
  }

  assignPost(postId: number): void {
    this.leaseholderApiService.assignPostByLeaseholderId(this.leaseholder.id, postId).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error.error().errorMessage);
      }
    )
  }

}
