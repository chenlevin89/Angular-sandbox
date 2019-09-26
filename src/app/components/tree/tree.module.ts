import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeComponent } from './tree.component';
import { NodeComponent } from './node/node.component';
import {IconModule} from '../icon/icon.module';
import { TreeSearchComponent } from './tree-search/tree-search.component';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [TreeComponent, NodeComponent, TreeSearchComponent],
  exports: [TreeComponent],
  imports: [
    CommonModule,
    IconModule,
    ReactiveFormsModule
  ]
})
export class TreeModule { }
