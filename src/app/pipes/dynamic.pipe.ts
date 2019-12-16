import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dynamic'
})
export class DynamicPipe implements PipeTransform {

  transform(value: any, pipe: PipeTransform, ...args: any[]): any {
    if (pipe && typeof pipe.transform === 'function') {
      return pipe.transform(value, ...args);
    }
    return value;
  }

}
