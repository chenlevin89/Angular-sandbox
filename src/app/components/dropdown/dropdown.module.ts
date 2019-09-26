import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DropdownComponent} from './dropdown.component';
import {DropdownOptionComponent} from './components/dropdown-option/dropdown-option.component';
import {DropdownSearchComponent} from './components/dropdown-search/dropdown-search.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {IconModule} from '../icon/icon.module';
import { DropdownOptionListComponent } from './components/dropdown-option-list/dropdown-option-list.component';

const components = [DropdownComponent, DropdownOptionComponent, DropdownSearchComponent, DropdownOptionListComponent];

@NgModule({
  declarations: [...components],
  exports: [...components],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    IconModule
  ]
})
export class DropdownModule { }
