import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionComponent } from './accordion/accordion.component';
import { UserDateComponent } from './user-date/user-date.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InputTextComponent } from './input-text/input-text.component';
import { DisplayTextComponent } from './display-text/display-text.component';
import { PersonComponent } from './person/person.component';

const components = [AccordionComponent, UserDateComponent, InputTextComponent, DisplayTextComponent, PersonComponent];

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ComponentsModule { }
