import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Landlord} from "../../models/landlord";
import {catchError, retry} from "rxjs/operators";
import {Leaseholder} from "../../models/leaseholder";

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  basePath = 'https://roomiesheroku.herokuapp.com/api/users';
  token =<string>window.sessionStorage.getItem("auth-token");

  constructor(private http: HttpClient) {
  }
  httpOptions = {headers: new HttpHeaders({'Content-Type':'application/json'})};

  handleError(error: HttpErrorResponse): Observable<never>{
    if (error.error instanceof ErrorEvent){
      console.log('An error occurred: ', error.error.message);
    } else{
      console.log(`Backend returned code ${error.status}, body was: ${error.error.message}`);
    }
    return throwError('Something happened with request, please try again later.');
  }

  addLandlord(userId:number, planId:number ,item: Landlord): Observable<any> {
    console.log(item);
    console.log(JSON.stringify(item));
    return this.http.post<Landlord>(`${this.basePath}/${userId}/plans/${planId}/landlords`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  addLeaseholder(userId:number, planId:number ,item: any): Observable<Leaseholder> {
    return this.http.post<Leaseholder>(`${this.basePath}/${userId}/plans/${planId}/leaseholders`, JSON.stringify(item), this.httpOptions);
  }

  getProfileByUserId(userId:number): Observable<any>{
    return this.http.get(`${this.basePath}/${userId}/profiles`);
  }

  getUserByEmail(email: any): Observable<any>{
    return this.http.post(`${this.basePath}`,JSON.stringify(email),this.httpOptions);
  }

}
