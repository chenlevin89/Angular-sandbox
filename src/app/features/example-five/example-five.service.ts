import {Injectable} from '@angular/core';
import {of, timer, BehaviorSubject, Subject, ReplaySubject, Observable} from 'rxjs';
import {switchMap, buffer, filter, tap, takeUntil} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExampleFiveService {

  public notificationsEmitter$ = new Subject();
  public notificationsNotifier$ = new Subject();
  public notificationObservable$: Observable<any>;

  private notificationsInvoke$ = new Subject();
  private notificationsClear$ = new Subject();

  constructor() {
    this.notificationsEmitter$.asObservable()
      .pipe(
        buffer(this.notificationsNotifier$)
      )
      .subscribe(val => this.notificationsInvoke$.next(val));

    this.notificationObservable$ = this.notificationsInvoke$.asObservable().pipe(takeUntil(this.notificationsClear$));
  }


  getData({pageIndex, chunkSize}: {pageIndex: number, chunkSize?: number} = {pageIndex: 0, chunkSize: 20}) {
    console.log('get data', pageIndex);
    const result = [];
    for (let i = pageIndex * chunkSize; i < (pageIndex * chunkSize) + chunkSize; i++) {
      result.push({id: i, text: `option_${i}`});
    }
    return timer(1000).pipe(switchMap(_ => of(result)));
  }

}
