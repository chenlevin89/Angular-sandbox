import {Injectable, NgZone} from '@angular/core';
import {timer, Observable, Subject} from 'rxjs';
import {take, filter, concatMap, takeUntil} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PollingService {

  constructor(private ngZone: NgZone) {}

  polling({maxNumberOfIntervals, delayTime, mapToFunction, stopCondition, takUntil$}: {
    maxNumberOfIntervals: number,
    delayTime: number,
    mapToFunction: () => Observable<any>,
    stopCondition: (value: any) => boolean,
    takUntil$: Subject<void>
  }) {
    return timer(0, delayTime)
      .pipe(
        take(maxNumberOfIntervals),
        concatMap(mapToFunction),
        filter(stopCondition),
        takeUntil(takUntil$),
        take(1)
      );
  }

  poolingOutsideZone({maxNumberOfIntervals, delayTime, mapToFunction, stopCondition, takUntil$, callback}: {
    maxNumberOfIntervals: number,
    delayTime: number,
    mapToFunction: () => Observable<any>,
    stopCondition: (value: any) => boolean,
    takUntil$: Subject<void>,
    callback: (value: any) => void
  }): void {
    this.ngZone.runOutsideAngular(() => {
      this.polling({maxNumberOfIntervals, delayTime, mapToFunction, stopCondition, takUntil$})
        .subscribe(callback);
    });
  }

}
