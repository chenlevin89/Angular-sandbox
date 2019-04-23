import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExampleTwoComponent} from './example-two.component';
import {Routes, RouterModule} from '@angular/router';
import {ComponentsModule} from '../../components/components.module';
import {ReactiveFormsModule} from '@angular/forms';
import {DisplayListModule} from 'src/app/components/display-list/display-list.module';

const routes: Routes = [
  {path: '', component: ExampleTwoComponent}
];

@NgModule({
  declarations: [ExampleTwoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    ReactiveFormsModule,
    DisplayListModule.forRoot({numberOfItemsToDisplay: 4, theme: {'primary-color': 'gray'}})
  ]
})
export class ExampleTwoModule {}
