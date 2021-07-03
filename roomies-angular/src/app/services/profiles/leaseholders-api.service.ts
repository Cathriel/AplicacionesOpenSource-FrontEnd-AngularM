import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Landlord} from "../../models/landlord";
import {catchError, retry} from "rxjs/operators";
import {Leaseholder} from "../../models/leaseholder";

@Injectable({
  providedIn: 'root'
})
export class LeaseholdersApiService {

  basePath = 'https://roomiesheroku.herokuapp.com/api/leaseholders';
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

  getAll(): Observable<any>{
    return this.http.get(`${this.basePath}`,this.httpOptions).pipe(retry(2),catchError(this.handleError));
  }

  getLeaseholderById(id: number): Observable<Leaseholder> {
    return this.http.get<Leaseholder>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getAllPostsByLeaseholderId(id:number):Observable<any>{
    return this.http.get<Leaseholder>(`${this.basePath}/${id}/posts`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateLeaseholder(id:number, item:Leaseholder): Observable<Leaseholder>{
    return this.http.put<Leaseholder>(`${this.basePath}/${id}`,JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteLeaseholder(id: number):Observable<any>{
    return  this.http.delete<Leaseholder>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }


  unassignPostByLeaseholderId(id: number, postId: number): Observable<any>{
    return  this.http.delete<Leaseholder>(`${this.basePath}/${id}/posts/${postId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  assignPostByLeaseholderId(id: number, postId: number): Observable<any>{
    return  this.http.post<Leaseholder>(`${this.basePath}/${id}/posts/${postId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

}
