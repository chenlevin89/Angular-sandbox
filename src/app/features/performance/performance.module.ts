import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {PerformanceComponent} from './performance.component';
import {ComponentsModule} from 'src/app/components/components.module';

export const routes: Routes = [
  {path: '', component: PerformanceComponent}
];


@NgModule({
  declarations: [PerformanceComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ]
})
export class PerformanceModule { }
