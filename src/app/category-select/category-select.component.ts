import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-category-select',
  templateUrl: './category-select.component.html',
  styleUrls: ['./category-select.component.scss']
})
export class CategorySelectComponent {
  @Input() options: string[] = [];
  @Input() selectedOption: string = ""
  @Output() optionSelected = new EventEmitter<string>();

  onSelect(option: string) {
    this.selectedOption = option;
    this.optionSelected.emit(option);
  }

}
