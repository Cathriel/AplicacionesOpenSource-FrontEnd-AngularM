import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Leaseholder} from "../../models/leaseholder";
import {catchError, retry} from "rxjs/operators";
import {Post} from "../../models/post";
import {Review} from "../../models/review";
import {LandlordResource} from "../../models/landlordResource";

@Injectable({
  providedIn: 'root'
})
export class PostsApiService {

  basePath = 'https://roomiesheroku.herokuapp.com/api/posts';
  constructor(private http: HttpClient) { }
  httpOptions = {headers: new HttpHeaders({'Content-Type':'application/json'})};
  //pageable: Pageable = new Pageable();

  handleError(error: HttpErrorResponse): Observable<never>{
    if (error.error instanceof ErrorEvent){
      console.log('An error occurred: ', error.error.message);
    } else{
      console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something happened with request, please try again later.');
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getAllReviewByPostId(postid:number):Observable<Review>{
    return this.http.get<Review>(`${this.basePath}/${postid}/reviews`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getLandlordByPostId(id: number): Observable<LandlordResource> {
    return this.http.get<LandlordResource>(`${this.basePath}/${id}/landlords`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getAllPost(): Observable<Post>{
    //this.http.request("GET", this.basePath, {body: this.pageable});
    return this.http.get<Post>(this.basePath)
      .pipe(retry(2), catchError(this.handleError));
  }

  updatePost(id:number, item:Post): Observable<Post>{
    return this.http.put<Post>(`${this.basePath}/${id}`,JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  deletePost(id: number):Observable<any>{
    return  this.http.delete<Post>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
