import {
  Component, ChangeDetectionStrategy,
  Output, EventEmitter, Input, Type} from '@angular/core';
import {Dropdown} from '../../dropdown-entities';

@Component({
  selector: 'app-dropdown-option-list',
  templateUrl: './dropdown-option-list.component.html',
  styleUrls: ['./dropdown-option-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownOptionListComponent {

  @Input() options: Dropdown[];
  @Input() componentType: Type<any>;
  @Input() selectedMapping: {[key: number]: boolean};

  @Output() optionSelected = new EventEmitter<Dropdown>();

  onOptionSelected(option: Dropdown) {
    this.optionSelected.emit(option);
  }

}
