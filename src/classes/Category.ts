import {CategoryInterface} from "../app/interfaces/categoryInterface";

export class Category implements CategoryInterface {
  description: string;
  id: number;
  name: string;

  constructor() {
    this.description = '';
    this.id = 0;
    this.name = '';
  }
}
