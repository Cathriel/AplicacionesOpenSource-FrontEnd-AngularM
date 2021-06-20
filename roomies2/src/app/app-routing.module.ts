import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {HomeLeaseholderComponent} from "./pages/home-leaseholder/home-leaseholder.component";
import {SuccessfulAddComponent} from "./pages/successful-add/successful-add.component";
import {RegisterComponent} from "./pages/register/register.component";
import {AddPostComponent} from "./pages/forms/add-post/add-post.component";
import {LogInComponent} from "./pages/log-in/log-in.component";
import {SearchPropertyComponent} from "./pages/search-property/search-property.component";
import {DetailedPostComponent} from "./pages/detailed-post/detailed-post.component";


const routes: Routes = [
 { path: '', component: HomeComponent},
 // { path: '', component: HomeLeaseholderComponent},
  {path: 'add-post', component: AddPostComponent},
  {path: 'successful-add', component: SuccessfulAddComponent},
  {path: 'register',component: RegisterComponent},
  {path: 'log-in',component: LogInComponent},
  {path: 'search-property',component: SearchPropertyComponent},
  {path: 'detailed-post',component: DetailedPostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
