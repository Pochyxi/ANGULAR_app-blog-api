import {Component, OnInit} from '@angular/core';
import {PostsService} from "../service/postService/posts.service";
import {Observable} from "rxjs";
import {PaginatedPostsInterface} from "../interfaces/paginatedPostsInterface";
import {AuthService} from "../service/authService/auth.service";
import {PostInterface} from "../interfaces/postInterface";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit{
  public posts$: PaginatedPostsInterface = {
    content: [],
    pageNo: 0,
    pageSize: 0,
    totalElements: 0,
    totalPages: 0,
    last: false
  }

  constructor(private postsService$: PostsService, private auth$: AuthService) {}

  ngOnInit(): void {
    this.postsService$.posts.subscribe((posts: PaginatedPostsInterface) => {
      this.posts$ = posts;
    });

    this.postsService$.getPosts();
  }

}
