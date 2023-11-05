import { Component, OnInit } from '@angular/core';
import { PostsService } from '../service/postService/posts.service';
import { Observable } from 'rxjs';
import { PaginatedPostsInterface } from '../interfaces/paginatedPostsInterface';
import { AuthService } from '../service/authService/auth.service';
import { PostInterface } from '../interfaces/postInterface';
import { CategoryService } from '../service/categoryService/category.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  public posts$: PaginatedPostsInterface = {
    content: [],
    pageNo: 0,
    pageSize: 0,
    totalElements: 0,
    totalPages: 0,
    last: false,
  };
  showAdmin: boolean = false;
  roles: string[] = [];

  constructor(
    private postsService$: PostsService,
    private auth$: AuthService,
    private categories$: CategoryService
  ) {}

  ngOnInit(): void {
    this.postsService$.posts.subscribe((posts: PaginatedPostsInterface) => {
      this.posts$ = posts;
    });

    this.postsService$.getPosts();

    this.auth$.roles.subscribe((roles) => {
      this.roles = roles;

      console.log(this.roles);
    });

    this.categories$.getCategories();
  }

  showAdminPanel() {
    this.showAdmin = !this.showAdmin;
  }
}
