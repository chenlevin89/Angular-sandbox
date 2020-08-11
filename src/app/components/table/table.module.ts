import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import {DirectivesModule} from 'src/app/directives/directives.module';
import {TableItemComponent} from './table-item/table-item.component';



@NgModule({
  declarations: [TableComponent, TableItemComponent],
  exports: [TableComponent],
  imports: [
    CommonModule,
    DirectivesModule
  ]
})
export class TableModule { }
