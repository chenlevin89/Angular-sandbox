import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MustIncludeDirective } from './must-include.validator';
import { CarouselDirective } from './carousel.directive';

const directives = [MustIncludeDirective, CarouselDirective];

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: directives,
    exports: directives
})
export class DirectivesModule { }
