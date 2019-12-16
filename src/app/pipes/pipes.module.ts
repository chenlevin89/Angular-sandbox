import { NgModule } from '@angular/core';
import {GenericPipe} from './generic.pipe';
import {DynamicPipe} from './dynamic.pipe';

const pipes = [GenericPipe, DynamicPipe];

@NgModule({
    imports: [
    ],
    declarations: pipes,
    exports: pipes
})
export class PipesModule { }
