import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PostComponent } from './post/post.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './auth.interceptor';
import { NewPostComponent } from './new-post/new-post.component';
import { NewCategoryComponent } from './new-category/new-category.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryComponent } from './category/category.component';
import { CategorySelectComponent } from './category-select/category-select.component';
import { CategoryOptionComponent } from './category-option/category-option.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { NavOffCanvasComponent } from './nav-off-canvas/nav-off-canvas.component';

export function tokenGetter() {
  return localStorage.getItem('BearerToken');
}

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    PostComponent,
    NavComponent,
    LoginComponent,
    NewPostComponent,
    NewCategoryComponent,
    CategoriesComponent,
    CategoryComponent,
    CategorySelectComponent,
    CategoryOptionComponent,
    NavOffCanvasComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['http://localhost:4200/'],
        disallowedRoutes: [],
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
