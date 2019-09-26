import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExampleFiveComponent} from './example-five.component';
import {ComponentsModule} from '../../components/components.module';
import {ReactiveFormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {DirectivesModule} from 'src/app/directives/directives.module';
import {TableModule} from 'src/app/components/table/table.module';

const routes: Routes = [
  {
    path: '',
    component: ExampleFiveComponent
  }
];

@NgModule({
  declarations: [ExampleFiveComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    DirectivesModule,
    TableModule,
    RouterModule.forChild(routes),
  ]
})
export class ExampleFiveModule {}
