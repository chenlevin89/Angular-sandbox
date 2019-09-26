import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExampleTwoComponent} from './example-two.component';
import {Routes, RouterModule} from '@angular/router';
import {ComponentsModule} from '../../components/components.module';
import {ReactiveFormsModule} from '@angular/forms';
import {DisplayListModule} from 'src/app/components/display-list/display-list.module';
import {ExamppleTwoResolver} from './example-two-resolver';

const routes: Routes = [
  {
    path: '',
    component: ExampleTwoComponent,
    data: {customData: 'customData'},
    resolve: {resolverData: ExamppleTwoResolver}
  }
];

@NgModule({
  declarations: [ExampleTwoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    ReactiveFormsModule,
    DisplayListModule.forRoot({numberOfItemsToDisplay: 10, theme: {'primary-color': 'gray'}})
  ]
})
export class ExampleTwoModule {}
