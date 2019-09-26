import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './icon.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [IconComponent],
  exports: [IconComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class IconModule { }
