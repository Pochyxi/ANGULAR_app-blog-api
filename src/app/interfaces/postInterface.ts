import {CommentInterface} from "./commentInterface";

export interface PostInterface {
  id: number,
  title: string,
  description: string,
  content: string,
  comment: CommentInterface[]
}
