import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CategoryInterface} from "../../interfaces/categoryInterface";
import {environment} from "../../../environments/environment";
import {CreateCategoryInterface} from "../../interfaces/createCategoryInterface";
import {Category} from "../../../classes/Category";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  rootapiurl = environment.ROOTAPIURL;
  categoryapiurl = environment.CATEGORYAPIURL;

  categories: BehaviorSubject<CategoryInterface[]> = new BehaviorSubject<CategoryInterface[]>([]);
  category: BehaviorSubject<CategoryInterface> = new BehaviorSubject<CategoryInterface>(new Category());

  constructor(private http: HttpClient) { }

  setCategories(categories: CategoryInterface[]) {
    this.categories.next(categories);
  }

  setCategory(category: CategoryInterface) {
    this.category.next(category);
  }


  getCategories() {
    this.http.get<CategoryInterface[]>(this.rootapiurl + this.categoryapiurl).subscribe((categories: CategoryInterface[]) => {
      this.categories.next(categories);
    });
  }

  getCategory(categoryId:string) {
    this.http.get<CategoryInterface>(this.rootapiurl + this.categoryapiurl + "/" + categoryId).subscribe((category: CategoryInterface) => {
      this.category.next(category);
    });
  }

  createCategory(category: CreateCategoryInterface) {
    return this.http.post<CategoryInterface>(this.rootapiurl + this.categoryapiurl, category);
  }

  updateCategory(category: CategoryInterface) {
    return this.http.put<CategoryInterface>(this.rootapiurl + this.categoryapiurl + "/" + category.id, category);
  }

  deleteCategory(categoryId: string) {
    return this.http.delete<CategoryInterface>(this.rootapiurl + this.categoryapiurl + "/" + categoryId);
  }



}
