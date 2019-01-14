import { NgModule } from '@angular/core';
import {GenericPipe} from './generic.pipe';

const pipes = [GenericPipe];

@NgModule({
    imports: [
    ],
    declarations: pipes,
    exports: pipes
})
export class PipesModule { }
