import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySelectComponent } from './category-select.component';

describe('CategorySelectComponent', () => {
  let component: CategorySelectComponent;
  let fixture: ComponentFixture<CategorySelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategorySelectComponent]
    });
    fixture = TestBed.createComponent(CategorySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
