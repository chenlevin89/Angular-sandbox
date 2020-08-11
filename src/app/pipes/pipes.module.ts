import { NgModule } from '@angular/core';
import {GenericPipe} from './generic.pipe';
import {DynamicPipe} from './dynamic.pipe';
import {NotAvailablePipe} from './not-available.pipe';

const pipes = [GenericPipe, DynamicPipe, NotAvailablePipe];

@NgModule({
    imports: [
    ],
    declarations: pipes,
    exports: pipes
})
export class PipesModule { }
