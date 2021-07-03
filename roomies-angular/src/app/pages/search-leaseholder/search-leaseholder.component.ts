import { Component, OnInit } from '@angular/core';
import {LeaseholdersApiService} from "../../services/profiles/leaseholders-api.service";
import {Leaseholder} from "../../models/leaseholder";
import {LeaseholderResource} from "../../models/leaseholderResource";

@Component({
  selector: 'app-search-leaseholder',
  templateUrl: './search-leaseholder.component.html',
  styleUrls: ['./search-leaseholder.component.css']
})
export class SearchLeaseholderComponent implements OnInit {

  leaseholders: LeaseholderResource[] ;
  lengthLeaseTotal : number ;
  lengthLeaseDivided: number;
  //leaseholderLength: number = 0;
  constructor(private dataLeaseholder: LeaseholdersApiService) {
    this.leaseholders = [];
    this.lengthLeaseTotal = 0;
    this.lengthLeaseDivided =0;
  }
  DivideByThreeInteger(n : number){

    // return 1;
    return Math.trunc(n/3);
  }

  ReturnArrayDividedByThree(){
    console.log(this.lengthLeaseDivided);
    console.log( Array(this.lengthLeaseDivided).fill(0).map((x,i)=>i*3));

    return Array(this.lengthLeaseDivided).fill(0).map((x,i)=>i*3);

  }

  ngOnInit() {

    console.log(this.leaseholders);
    console.log("Hello")

    this.dataLeaseholder.getAll().subscribe(
      (data) => {
          this.leaseholders = data.content;
          this.lengthLeaseTotal = this.leaseholders.length;
          this.lengthLeaseDivided = this.DivideByThreeInteger(this.lengthLeaseTotal);
          console.log(this.leaseholders);
          console.log(this.lengthLeaseTotal);
      }
    )
  }
  ReturnThreeLeaseholdersStartingBy(n:number){
    console.log("This is the current info of leaseholders")
    console.log(this.leaseholders);
    return this.leaseholders.slice(n,n+3);
  }


}
