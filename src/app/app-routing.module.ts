import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostsComponent} from "./posts/posts.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PostsComponent,
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
