import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExampleThreeComponent} from './example-three.component';
import {ComponentsModule} from '../../components/components.module';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {DisplayTextComponent} from '../../components/display-text/display-text.component';
import {DynamicLoadingService} from '../../services/dynamic-loading.service';
import { ListComponent } from './components/list/list.component';
import { ListRowComponent } from './components/list-row/list-row.component';
import { StamComponent } from './components/stam/stam.component';

const routes: Routes = [
  {path: '', component: ExampleThreeComponent}
];

@NgModule({
  declarations: [ExampleThreeComponent, ListComponent, ListRowComponent, StamComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [DynamicLoadingService],
  entryComponents: [DisplayTextComponent]
})
export class ExampleThreeModule {}
