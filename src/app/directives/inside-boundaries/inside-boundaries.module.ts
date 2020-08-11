import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsideBoundariesDirective } from './inside-boundaries.directive';



@NgModule({
  declarations: [InsideBoundariesDirective],
  exports: [InsideBoundariesDirective],
  imports: [
    CommonModule
  ]
})
export class InsideBoundariesModule { }
