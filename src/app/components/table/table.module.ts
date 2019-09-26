import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import {DirectivesModule} from 'src/app/directives/directives.module';



@NgModule({
  declarations: [TableComponent],
  exports: [TableComponent],
  imports: [
    CommonModule,
    DirectivesModule
  ]
})
export class TableModule { }
