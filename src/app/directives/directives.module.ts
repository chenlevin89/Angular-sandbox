import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MustIncludeDirective} from './must-include.validator';
import {CarouselDirective} from './carousel.directive';
import {IntersectionObserverDirective} from './intersection-observer.directive';
import {PaginationDirective} from './pagination.directive';
import {MutationObserverDirective} from './mutation-observer.directive';
import {AsyncPaginationDirective} from './async-pagination.directive';
import {FullPaginationDirective} from './full-pagination.directive';
import {HoverDirective} from './hover.directive';
import {LoadMoreDirective} from './load-more.directive';


const directives = [MustIncludeDirective, CarouselDirective, IntersectionObserverDirective,
    PaginationDirective, MutationObserverDirective, AsyncPaginationDirective, FullPaginationDirective, HoverDirective, LoadMoreDirective];

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: directives,
    exports: directives
})
export class DirectivesModule {}
