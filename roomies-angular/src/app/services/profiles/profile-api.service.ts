import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileApiService {

  basePath = 'https://roomiesheroku.herokuapp.com/api/profiles';
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



}
