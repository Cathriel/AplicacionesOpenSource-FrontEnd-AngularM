import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Leaseholder} from "../models/leaseholder";
import {catchError, retry} from "rxjs/operators";
import {Plan} from "../models/plan";

@Injectable({
  providedIn: 'root'
})
export class PlansApiService {

  basePath = 'https://roomiesheroku.herokuapp.com/api/plans';
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

  addPlan(item: any): Observable<Plan> {
    return this.http.post<Plan>(this.basePath, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getAllPlan(): Observable<Plan>{
    //this.http.request("GET", this.basePath, {body: this.pageable});
    return  this.http.get<Plan>(this.basePath)
      .pipe(retry(2), catchError(this.handleError));
  }

}
