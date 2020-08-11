import {Injectable, OnDestroy} from '@angular/core';
import {Subject, Observable, of} from 'rxjs';
import {buffer, takeUntil, filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService implements OnDestroy {

  private emitterNotificationMapping: {[key: number]: Subject<any>} = {};
  private notifyNotificationMapping: {[key: number]: Subject<any>} = {};
  private invokeNotificationMapping: {[key: number]: Subject<any>} = {};
  private notificationObservableMapping: {[key: number]: Observable<any>} = {};

  private onDestroy$ = new Subject();

  constructor() {}

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  emitNotification({type, value}: {type: number, value: any}): void {
    if (!this.emitterNotificationMapping[type]) {
      this.emitterNotificationMapping[type] = new Subject();
      this.bufferEmitterNotifications(type);
    }
    this.emitterNotificationMapping[type].next(value);
  }

  notifyNotification(type: number): void {
    if (!this.notifyNotificationMapping[type]) {
      this.notifyNotificationMapping[type] = new Subject();
    }
    this.notifyNotificationMapping[type].next();
  }

  getNotificationStream(type: number): Observable<any> {
    return (this.notificationObservableMapping[type] || of([])).pipe(filter(value => value.length));
  }

  clearAllStreams(): void {
    Object.keys(this.notifyNotificationMapping).forEach(key => this.clearStream(Number(key)));
  }

  clearStream(type: number): void {
    if (this.notifyNotificationMapping[type]) {
      this.notifyNotificationMapping[type].next();
    }
  }

  private bufferEmitterNotifications(type: number): void {
    this.invokeNotificationMapping[type] = new Subject();
    if (!this.notifyNotificationMapping[type]) {
      this.notifyNotificationMapping[type] = new Subject();
    }
    this.emitterNotificationMapping[type].asObservable()
      .pipe(
        takeUntil(this.onDestroy$),
        buffer(this.notifyNotificationMapping[type])
      )
      .subscribe(val => this.invokeNotificationMapping[type].next(val));

    this.notificationObservableMapping[type] = this.invokeNotificationMapping[type].asObservable();
  }

}
