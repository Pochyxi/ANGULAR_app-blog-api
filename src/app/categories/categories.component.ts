import {Component, OnInit} from '@angular/core';
import {CategoryInterface} from "../interfaces/categoryInterface";
import {CategoryService} from "../service/categoryService/category.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit{
  categories: CategoryInterface[] = [];
  constructor(private category$:CategoryService) {}

  ngOnInit(): void {

    this.category$.categories.subscribe((categories: CategoryInterface[]) => {
      this.categories = categories;
    });
    this.category$.getCategories();
  }
}
