import {Component, Input} from '@angular/core';
import {CategoryInterface} from "../interfaces/categoryInterface";
import {Category} from "../../classes/Category";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  @Input('category-data') category: CategoryInterface = new Category();

}
