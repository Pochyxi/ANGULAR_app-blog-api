import {Component, Input} from '@angular/core';
import {PostInterface} from "../interfaces/postInterface";
import {Post} from "../../classes/Post";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {

  @Input('post-data') post: PostInterface = new Post();


}
