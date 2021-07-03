import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Landlord} from "../../models/landlord";
import {catchError, retry} from "rxjs/operators";
import {Post} from "../../models/post";

@Injectable({ providedIn: 'root'})
export class LandlordsApiService {

  basePath = 'https://roomiesheroku.herokuapp.com/api/landlords';
  constructor(private http: HttpClient) { }
  httpOptions = {headers: new HttpHeaders({'Content-Type':'application/json'})};

  handleError(error: HttpErrorResponse): Observable<never>{
    if (error.error instanceof ErrorEvent){
      console.log('An error occurred: ', error.error.message);
    } else{
      console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something happened with request, please try again later.');
  }

  getLandlordById(id: number): Observable<Landlord> {
    return this.http.get<Landlord>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getAllLandlord(): Observable<Landlord>{
    //this.http.request("GET", this.basePath, {body: this.pageable});
    return  this.http.get<Landlord>(this.basePath)
      .pipe(retry(2), catchError(this.handleError));
  }

  getPostsByLandlordId(landlordId: number): Observable<any>{
    return this.http.get(`${this.basePath}/${landlordId}/posts`,this.httpOptions);
  }

  addPost(id:number,item: any): Observable<Post> {
    return this.http.post<Post>(`${this.basePath}/${id}/posts`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateLandlord(id:number, item:Landlord): Observable<Landlord>{
    return this.http.put<Landlord>(`${this.basePath}/${id}`,JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteLandlord(id: number):Observable<any>{
    return  this.http.delete<Landlord>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

}
