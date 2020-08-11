import { Pipe, PipeTransform } from '@angular/core';
import {isNullOrUndefined, isNull} from 'util';

@Pipe({
  name: 'notAvailable'
})
export class NotAvailablePipe implements PipeTransform {

  transform(value: any, expectedValue: string): any {
    if(isNull(value)){
      return expectedValue || 'N/A';
    }
    return value;
  }

}
