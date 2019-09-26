import {Injectable} from '@angular/core';
import {Observable, of, timer} from 'rxjs';
import {switchMap, mapTo} from 'rxjs/operators';
import {Row} from './components/list/list-entity';

const mockData: {id: number, text: string}[] = [
  {
    id: 1,
    text: 'First'
  },
  {
    id: 2,
    text: 'Second'
  },
  {
    id: 3,
    text: 'Third'
  },
  {
    id: 4,
    text: 'Fourth'
  }
];

@Injectable({
  providedIn: 'root'
})
export class ExampleThreeService {

  constructor() {}

  getItems(): Observable<{id: number, text: string}[]> {
    return of(mockData);
  }

  saveChanges({userId, data}: {userId: number, data: any}): Observable<any> {
    return timer(1500)
      .pipe(switchMap(_ => of({success: true})));
  }

  approveRow(row: Row): Observable<any> {
    return timer(500).pipe(mapTo(true));
  }
}
