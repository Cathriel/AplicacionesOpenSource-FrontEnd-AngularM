import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Leaseholder} from "../../models/leaseholder";
import {catchError, retry} from "rxjs/operators";
import {Review} from "../../models/review";

@Injectable({
  providedIn: 'root'
})
export class ReviewsApiService {

  basePath = 'https://roomiesheroku.herokuapp.com/api/reviews';
  PostReviewPath = `https://roomiesheroku.herokuapp.com/api/post/`;
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

  addReview(item: any): Observable<Review> {
    return this.http.post<Review>(this.basePath, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  getReviewById(id: number): Observable<Review> {
    return this.http.get<Review>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateReview(id:number, item:Review): Observable<Review>{
    return this.http.put<Review>(`${this.basePath}/${id}`,JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteReview(id: number):Observable<any>{
    return  this.http.delete<Review>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
