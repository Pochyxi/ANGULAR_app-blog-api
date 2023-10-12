import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {PaginatedPostsInterface} from "../../interfaces/paginatedPostsInterface";
import {CreatePostInterface} from "../../interfaces/createPostInterface";
import {PostInterface} from "../../interfaces/postInterface";
import {BehaviorSubject} from "rxjs";
import {Post} from "../../../classes/Post";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  rootapiurl = environment.ROOTAPIURL;
  postapiurl = environment.POSTSAPIURL;

  posts: BehaviorSubject<PaginatedPostsInterface> = new BehaviorSubject<PaginatedPostsInterface>({
    content: [],
    pageNo: 0,
    pageSize: 0,
    totalElements: 0,
    totalPages: 0,
    last: false
  });

  post: BehaviorSubject<PostInterface> = new BehaviorSubject<PostInterface>(new Post());

  constructor(private http: HttpClient) { }

  getPosts() {
    this.http.get<PaginatedPostsInterface>(this.rootapiurl + this.postapiurl).subscribe((posts: PaginatedPostsInterface) => {
      this.posts.next(posts);
    });
  }

  getPost(postId: string) {
    this.http.get<PostInterface>(this.rootapiurl + this.postapiurl + "/" + postId).subscribe((post: PostInterface) => {
      this.post.next(post);
    });
  }

  createPost(post: CreatePostInterface) {
    return this.http.post<PostInterface>(this.rootapiurl + this.postapiurl, post);
  }

  updatePost(post: PostInterface) {
    return this.http.put<PostInterface>(this.rootapiurl + this.postapiurl + "/" + post.id, post);
  }

  deletePost(postId: string) {
    return this.http.delete<PostInterface>(this.rootapiurl + this.postapiurl + "/" + postId);
  }


}
