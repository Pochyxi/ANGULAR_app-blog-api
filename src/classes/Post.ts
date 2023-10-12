import {PostInterface} from "../app/interfaces/postInterface";
import {CommentInterface} from "../app/interfaces/commentInterface";

export class Post implements PostInterface{
  comment: CommentInterface[];
  content: string;
  description: string;
  id: number;
  title: string;
  categoryId: number;

  constructor() {
    this.comment = [];
    this.content = '';
    this.description = '';
    this.id = 0;
    this.title = '';
    this.categoryId = 0;
  }

}
