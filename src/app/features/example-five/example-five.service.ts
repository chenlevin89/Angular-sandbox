import {Injectable} from '@angular/core';
import {of, timer} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExampleFiveService {

  constructor() {}

  getData({pageIndex, chunkSize = 20}: {pageIndex: number, chunkSize?: number} = {pageIndex: 0}) {
    console.log('get data', pageIndex);
    const result = [];
    for (let i = pageIndex * chunkSize; i < (pageIndex * chunkSize) + chunkSize; i++) {
      result.push({id: i, text: `option_${i}`});
    }
    return timer(1000).pipe(switchMap(_ => of(result)));
  }

}
