import {Post} from "../../classes/Post";

export interface PaginatedPostsInterface {
  content: Post[],
  pageNo: number,
  pageSize: number,
  totalElements: number,
  totalPages: number,
  last: boolean
}
