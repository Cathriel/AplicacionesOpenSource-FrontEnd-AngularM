import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './pages/home/home.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTable, MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSortModule} from "@angular/material/sort";
import { HomeLeaseholderComponent } from './pages/home-leaseholder/home-leaseholder.component';
import {MatExpansionModule} from "@angular/material/expansion";



import {MatTooltipModule} from "@angular/material/tooltip";
import {MatRadioModule} from "@angular/material/radio";
import {MatSliderModule} from "@angular/material/slider";
import {MatStepperModule} from "@angular/material/stepper";
import { SuccessfulAddComponent } from './pages/successful-add/successful-add.component';
import { RegisterComponent } from './pages/register/register.component';
import { AddPostComponent } from './pages/forms/add-post/add-post.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { SearchPropertyComponent } from './pages/search-property/search-property.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatOptionModule} from "@angular/material/core";
import {NgxSliderModule} from "@angular-slider/ngx-slider";
import {FlexModule} from "@angular/flex-layout/typings/flex";
import {FlexLayoutModule} from "@angular/flex-layout";
import {DetailedPostComponent} from './pages/detailed-post/detailed-post.component';
import {MatButtonToggle, MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import {MatListModule} from "@angular/material/list";
import {FilterPipe} from "./pages/search-property/filter.pipe";
import {MatCheckboxModule} from '@angular/material/checkbox';
import { HomeLandlordComponent } from './pages/home-landlord/home-landlord.component';
import {authInterceptorProviders} from "./helpers/auth.interceptor";
import {SearchLeaseholderComponent} from "./pages/search-leaseholder/search-leaseholder.component";
import { FavouritePostsComponent } from './pages/favourite-posts/favourite-posts.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
//import {GoogleMapsModule} from "@angular/google-maps";
/*
import { CarouselModule } from 'ngx-bootstrap/carousel';
import {Ng5SliderModule} from "ng5-slider";
*/

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeLeaseholderComponent,
    SuccessfulAddComponent,
    RegisterComponent,
    AddPostComponent,
    LogInComponent,
    SearchPropertyComponent,
    DetailedPostComponent,
    FilterPipe,
    HomeLandlordComponent,
    SearchLeaseholderComponent,
    FavouritePostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatExpansionModule,
    MatTooltipModule,
    MatRadioModule,
    MatSliderModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatOptionModule,
    NgxSliderModule,
    FlexLayoutModule,
    MatButtonToggleModule,
    MatBottomSheetModule,
    MatListModule,
    //GoogleMapsModule,
    MatExpansionModule,
    HttpClientModule,
    MatCheckboxModule,
    CarouselModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
