import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'generic'
})
export class GenericPipe implements PipeTransform {

    transform(fn: Function, ...args: any[]) {
        return fn(...args);
    }

}
