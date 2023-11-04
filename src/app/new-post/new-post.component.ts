import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CreatePostInterface } from '../interfaces/createPostInterface';
import { PostsService } from '../service/postService/posts.service';
import { CategoryService } from '../service/categoryService/category.service';
import { CategoryInterface } from '../interfaces/categoryInterface';
import { Post } from '../../classes/Post';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent implements OnInit, OnChanges {
  @Input('post') post: Post = new Post();

  newPost: CreatePostInterface = {
    title: '',
    content: '',
    description: '',
    categoryId: 0,
  };

  options: string[] = [];
  opzioneSelezionata: string = '';
  categoriesList: CategoryInterface[] = [];

  constructor(
    private post$: PostsService,
    private category$: CategoryService
  ) {}

  ngOnInit(): void {
    this.category$.categories.subscribe((categories) => {
      this.options = categories.map((category: CategoryInterface) => {
        return category.name;
      });

      this.categoriesList = categories;
    });

    this.ifPostChanged();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['post']) {
      this.ifPostChanged();
    }
  }

  ifPostChanged() {
    if (this.post.id !== 0) {
      this.newPost = {
        title: this.post.title,
        content: this.post.content,
        description: this.post.description,
        categoryId: this.post.categoryId,
      };

      this.category$.getCategory(this.post.categoryId.toString());
      console.log(this.categoriesList);

      this.handleOptionSelected(
        this.categoriesList.find((category: CategoryInterface) => {
          return category.id === this.post.categoryId;
        })?.name || ''
      );
    }
  }

  createPost() {
    this.post$
      .createPost(this.newPost)
      .subscribe((post: CreatePostInterface) => {
        console.log(post);
        this.newPost = {
          title: '',
          content: '',
          description: '',
          categoryId: 0,
        };

        this.opzioneSelezionata = '';

        this.post$.getPosts();
      });
  }

  modifyPost() {
    this.post$.updatePost({
      ...this.post,
      ...this.newPost,
    });
  }

  handleOptionSelected($event: string) {
    this.opzioneSelezionata = $event;

    this.newPost.categoryId =
      this.categoriesList.find((category: CategoryInterface) => {
        return category.name === $event;
      })?.id || 0;

    console.log(this.newPost.categoryId);
  }
}
