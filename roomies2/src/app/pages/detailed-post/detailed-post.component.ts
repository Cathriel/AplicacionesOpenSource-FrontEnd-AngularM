import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from "@angular/material/bottom-sheet";
import {ActivatedRoute, Router} from "@angular/router";
import {PostsApiService} from "../../services/posts/posts-api.service";
import * as _ from 'lodash';
import {Post} from "../../models/post";
import {ReviewsApiService} from "../../services/posts/reviews-api.service";
import {TokenStorageService} from "../../services/authentication/token-storage.service";
import {LandlordResource} from "../../models/landlordResource";

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  url:string;
}

export interface Detalles {
  precio: number;
  dormitorios: number;
  banos: number;
  m2: number
}

@Component({
  selector: 'app-detailed-post',
  templateUrl: './detailed-post.component.html',
  styleUrls: ['./detailed-post.component.css']
})
export class DetailedPostComponent implements OnInit {

  currentUser: any;
  postId!: number;
  posts:any=[];
  postData: Post = {} as Post;
  landlordData:LandlordResource={}as LandlordResource;
  reviews:any=[];

  constructor(private router: Router, private route: ActivatedRoute,private postsApi: PostsApiService,private tokenStorageService: TokenStorageService) {}

  tiles: Tile[] = [
    {text: 'One', cols: 2, rows: 2, color: 'lightblue',url:'https://www.elmueble.com/medio/2020/08/24/salon-pequeno-con-sofa-chaiselongue_7e35693f_1593x2000.jpg'},
    {text: 'Two', cols: 1, rows: 1, color: 'lightgreen',url:'https://www.milideas.net/wp-content/uploads/colores-relajantes-dormitorio.jpg'},
    {text: 'Tree', cols: 1, rows: 1, color: 'lightpink',url:'https://i.pinimg.com/originals/14/71/0b/14710bb776a082ab178a061c211168f7.jpg'},
    {text: 'Four', cols: 1, rows: 1, color: '#DDBDF1',url:'https://imgs.6sqft.com/wp-content/uploads/2017/05/31120343/bathroom-plants.jpg'},
    {text: 'Four', cols: 1, rows: 1, color: '#DDBDF1',url:'https://www.balconydecoration.com/wp-content/uploads/2019/07/Small-apartment-balcony-16-600x735.jpg'}
  ]

  ngOnInit(): void {
    this.getAllPosts();
    this.postId = Number(this.route.params.subscribe( params => {
      if (params.id) {
        const id = params.id;
        console.log(id);
        this.retrievePost(id);
        this.getLandlordByPostId(id);
        this.getAllReviews(id);
        // this.isEditMode = true;
        return id;
      }
    }));

    this.currentUser = this.tokenStorageService.getUser();
    if(this.currentUser){

    }else{
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
  getAllReviews(id:number):void{
    this.postsApi.getAllReviewByPostId(id).subscribe((response: any) => {
      console.log(response);
      this.reviews= response.content;
    });
  }

  getLandlordByPostId(id:number):void{
    this.postsApi.getLandlordByPostId(id)
      .subscribe((response: LandlordResource) => {
        this.landlordData= {} as LandlordResource;
        this.landlordData = _.cloneDeep(response);
        console.log(this.landlordData);
      });
  }
  retrievePost(id: number): void {
    this.postsApi.getPostById(id)
      .subscribe((response: Post) => {
        this.postData = {} as Post;
        this.postData = _.cloneDeep(response);

        console.log(response);
        console.log(this.postData);
      });
  }

  members: {id:number, title: string, subtitle: string, content: string, url: string}[] = [
    {id:1,title: 'S/ 1800', subtitle: 'San Isidro, Lima', content: 'Content here', url: 'https://img10.naventcdn.com/avisos/11/00/50/67/23/63/1200x1200/29572941.jpg'},
    {id:2,title: 'S/ 1400', subtitle: 'Magdalena, Lima', content: 'Content here', url: 'https://img10.naventcdn.com/avisos/11/00/50/67/23/63/1200x1200/29572941.jpg'},
    {id:3,title: 'S/ 1200', subtitle: 'Magdalena, Lima', content: 'Content here', url: 'https://img10.naventcdn.com/avisos/11/00/50/67/23/63/1200x1200/29572941.jpg'},
    {id:4,title: 'S/ 1900', subtitle: 'San Isidro, Lima', content: 'Content here', url: 'https://img10.naventcdn.com/avisos/11/00/50/67/23/63/1200x1200/29572941.jpg'},
  ];

}

