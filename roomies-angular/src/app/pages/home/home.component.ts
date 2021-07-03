import { Component, OnInit } from '@angular/core';
import {Post} from "../../models/post";
import {PostsApiService} from "../../services/posts/posts-api.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  postData: Post= {} as Post;
  posts:any=[];
  latestPosts:any=[];

  constructor(private postsApi: PostsApiService) {
  }

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts(): void {
    this.postsApi.getAllPost().subscribe((response: any) => {
      console.log(response);
      this.posts= response.content;
      console.log(this.posts);
      for(let i=1;i<=4;i++){
        this.latestPosts.push(this.posts[this.posts.length-i]);
      }
      console.log(this.latestPosts);
    });
  }
/*
  members: {id:number, title: string, subtitle: string, content: string, url: string}[] = [
    {id:1,title: 'S/ 1800', subtitle: 'San Isidro, Lima', content: 'Content here', url: 'https://img10.naventcdn.com/avisos/11/00/50/67/23/63/1200x1200/29572941.jpg'},
    {id:2,title: 'S/ 1400', subtitle: 'Magdalena, Lima', content: 'Content here', url: 'https://img10.naventcdn.com/avisos/11/00/50/67/23/63/1200x1200/29572941.jpg'},
    {id:3,title: 'S/ 1200', subtitle: 'Magdalena, Lima', content: 'Content here', url: 'https://img10.naventcdn.com/avisos/11/00/50/67/23/63/1200x1200/29572941.jpg'},
    {id:4,title: 'S/ 1900', subtitle: 'San Isidro, Lima', content: 'Content here', url: 'https://img10.naventcdn.com/avisos/11/00/50/67/23/63/1200x1200/29572941.jpg'},
  ];*/
}
