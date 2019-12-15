import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccordionComponent} from './accordion/accordion.component';
import {UserDateComponent} from './user-date/user-date.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {InputTextComponent} from './input-text/input-text.component';
import {DisplayTextComponent} from './display-text/display-text.component';
import {PersonComponent} from './person/person.component';
import {ToggleComponent} from './toggle/toggle.component';
import {PaginationListComponent} from './pagination-list/pagination-list.component';
import {SearchComponent} from './search/search.component';
import {SearchListComponent} from './search-list/search-list.component';
import {ListComponent} from './list/list.component';
import {ButtonAComponent} from './button-a/button-a.component';
import {ButtonBComponent} from './button-b/button-b.component';
import {DisplayListModule} from './display-list/display-list.module';
import {FakeComponent} from './fake/fake.component';
import {DropdownIconItemComponent} from './dropdown-icon-item/dropdown-icon-item.component';
import {IconModule} from './icon/icon.module';
import {TestComponent} from './test/test.component';
import {LoaderComponent} from './loader/loader.component';


const components = [AccordionComponent, UserDateComponent,
  InputTextComponent, DisplayTextComponent, PersonComponent, ToggleComponent, PaginationListComponent,
  SearchComponent, SearchListComponent, ListComponent, ButtonAComponent,
  ButtonBComponent, FakeComponent, DropdownIconItemComponent, TestComponent, LoaderComponent];

@NgModule({
  declarations: components,
  exports: [...components, DisplayListModule],
  imports: [
    DisplayListModule.forRoot(),
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IconModule
  ],
  entryComponents: [DisplayTextComponent, DropdownIconItemComponent]
})
export class ComponentsModule {}
