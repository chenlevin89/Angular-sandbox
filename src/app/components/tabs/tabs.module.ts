import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs.component';
import { TabDirective } from './tab.directive';


@NgModule({
  declarations: [TabsComponent, TabDirective],
  exports: [TabsComponent, TabDirective],
  imports: [
    CommonModule
  ]
})
export class TabsModule { }
