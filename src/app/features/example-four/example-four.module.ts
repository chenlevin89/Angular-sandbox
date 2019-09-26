import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExampleFourComponent } from './example-four.component';
import {Routes, RouterModule} from '@angular/router';
import {ComponentsModule} from '../../components/components.module';
import {ReactiveFormsModule} from '@angular/forms';
import {DropdownModule} from 'src/app/components/dropdown/dropdown.module';
import {DirectivesModule} from 'src/app/directives/directives.module';
import {TreeModule} from 'src/app/components/tree/tree.module';
import {TabsModule} from 'src/app/components/tabs/tabs.module';

const routes: Routes = [
  {path: '', component: ExampleFourComponent}
];

@NgModule({
  declarations: [ExampleFourComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    DropdownModule,
    DirectivesModule,
    TreeModule,
    TabsModule,
    RouterModule.forChild(routes)
  ]
})
export class ExampleFourModule { }
