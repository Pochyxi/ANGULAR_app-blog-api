import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { PostInterface } from '../interfaces/postInterface';
import { Post } from '../../classes/Post';
import { PostsService } from '../service/postService/posts.service';
import { CategoryService } from '../service/categoryService/category.service';
import { CategoryInterface } from '../interfaces/categoryInterface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit, OnChanges {
  isEditing: boolean = false;
  @Input('post-data') post: PostInterface = new Post();
  postCopy = new Post();
  categoryName: string | undefined = 'category name';
  categoryList: CategoryInterface[] = [];

  constructor(
    private posts$: PostsService,
    private category$: CategoryService
  ) {}

  ngOnInit(): void {
    this.category$.categories.subscribe((categories) => {
      this.categoryList = categories;
      this.categoryName = this.categoryList.find(
        (category: CategoryInterface) => {
          return category.id === this.post.categoryId;
        }
      )?.name;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['post']) {
      this.categoryName = this.categoryList.find(
        (category: CategoryInterface) => {
          return category.id === this.post.categoryId;
        }
      )?.name;
    }
  }

  deletePost() {
    this.posts$.deletePost(this.post.id.toString());
  }

  modifyPost() {
    this.isEditing = !this.isEditing;
  }
}
