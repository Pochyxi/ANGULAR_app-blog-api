import {Component, OnInit} from '@angular/core';
import {CreatePostInterface} from "../interfaces/createPostInterface";
import {PostsService} from "../service/postService/posts.service";
import {CategoryService} from "../service/categoryService/category.service";
import {CategoryInterface} from "../interfaces/categoryInterface";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  newPost: CreatePostInterface = {
    title: "",
    content: "",
    description: "",
    categoryId: 0
  }
  options: string[] = [];
  opzioneSelezionata: string = "";
  categoriesList: CategoryInterface[] = [];

  constructor(private post$: PostsService,
              private category$: CategoryService) {
  }

  ngOnInit(): void {
    this.category$.categories.subscribe((categories) => {
      this.options = categories.map((category: CategoryInterface) => {
        return category.name;
      } );

      this.categoriesList = categories;

    } );
  }


  createPost() {
    this.post$.createPost(this.newPost).subscribe((post: CreatePostInterface) => {
      console.log(post);
      this.newPost = {
        title: "",
        content: "",
        description: "",
        categoryId: 0
      }

      this.opzioneSelezionata = "";

      this.post$.getPosts()
    });
  }

  handleOptionSelected($event: string) {
    this.opzioneSelezionata = $event;

    this.newPost.categoryId = this.categoriesList.find((category: CategoryInterface) => {
      return category.name === $event;
    })?.id || 0;

    console.log(this.newPost.categoryId)
  }
}
