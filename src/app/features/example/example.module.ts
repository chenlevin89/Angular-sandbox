import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExampleComponent } from './example.component';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
import {ReactiveFormsModule} from '@angular/forms';
import { DirectivesModule } from 'src/app/directives/directives.module';
import {PipesModule} from '../../pipes/pipes.module';
import { ExampleResolver } from './example.resolver';
import {DisplayListModule} from 'src/app/components/display-list/display-list.module';

export const routes: Routes = [
  {path: '', component: ExampleComponent, resolve: {stock: ExampleResolver} }
];

@NgModule({
  declarations: [ExampleComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    DirectivesModule,
    ReactiveFormsModule,
    PipesModule,
    RouterModule.forChild(routes),
    DisplayListModule.forRoot()
  ],
  providers: [
    ExampleResolver
  ]
})
export class ExampleModule { }
