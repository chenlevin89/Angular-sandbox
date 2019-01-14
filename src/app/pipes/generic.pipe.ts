import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'genericPipe'
})
export class GenericPipe implements PipeTransform {

    transform(fn: Function, ...args: any[]) {
        return fn(...args);
    }

}
