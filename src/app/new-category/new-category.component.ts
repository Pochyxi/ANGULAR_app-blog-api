import { Component } from '@angular/core';
import {CreateCategoryInterface} from "../interfaces/createCategoryInterface";
import {CategoryService} from "../service/categoryService/category.service";

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss']
})
export class NewCategoryComponent {
  newCategory: CreateCategoryInterface = {
    name: '',
    description: ''
  }

  constructor(private category$: CategoryService) {}

  createCategory() {
    this.category$.createCategory(this.newCategory).subscribe((category) => {
      this.newCategory = {
        name: '',
        description: ''
      }

      this.category$.getCategories();
    })
  }
}
