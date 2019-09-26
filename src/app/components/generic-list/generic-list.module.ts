import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericListComponent } from './generic-list.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [GenericListComponent],
  exports: [GenericListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class GenericListModule { }
