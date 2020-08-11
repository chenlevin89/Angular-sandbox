import {Component, OnInit, ChangeDetectionStrategy, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, of, timer, Subject, BehaviorSubject, from, Scheduler, asyncScheduler} from 'rxjs';
import {Unsubscribe} from '../../decotators/unsubscribe.decorator';
import {ExampleFiveService} from './example-five.service';
import {FormControl} from '@angular/forms';
import {dynamicPipeData, DynamicData} from './example-five-config';
import {takeUntil} from 'rxjs/operators';
import {NotificationsService} from 'src/app/services/notifications.service';
import {isNull} from 'util';

const CHUNK_SIZE = 40;

@Unsubscribe
@Component({
  selector: 'app-example-five',
  templateUrl: './example-five.component.html',
  styleUrls: ['./example-five.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleFiveComponent implements OnInit, OnDestroy {

  timer$: Observable<number>;
  takeUntil$ = new Subject();
  genericListControl: FormControl;
  dynamicPipeData: DynamicData[] = dynamicPipeData;
  isNull: (object: any)=> boolean = isNull;

  private onDestroy$ = new Subject();

  constructor(private router: Router, private service: ExampleFiveService, private notificationsService: NotificationsService) {}

  ngOnInit() {
    this.timer$ = timer(0, 1000);
    this.genericListControl = new FormControl({
      list: [
        {id: 1, name: 'title'},
        {id: 2, name: 'title_2'}
      ]
    });
    this.initializeListeners();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  redirect() {
    this.router.navigate(['example-four']);
  }

  redirect2() {
    this.router.navigate(['example-three']);
  }

  notify() {
    this.notificationsService.notifyNotification(0);
    this.notificationsService.notifyNotification(1);
  }

  start() {
    this.timer$.subscribe(console.log);
  }

  asyncCallback(pageIndex: number): Observable<any[]> {
    if (pageIndex * CHUNK_SIZE < 150) {
      return this.service.getData({pageIndex, chunkSize: CHUNK_SIZE});
    }
    this.takeUntil$.next();
    return of([]);
  }

  private initializeListeners(): void {
    this.notificationsService.getNotificationStream(0).pipe(takeUntil(this.onDestroy$)).subscribe(val => console.log(`stream 0`, val));
    this.notificationsService.getNotificationStream(1).pipe(takeUntil(this.onDestroy$)).subscribe(val => console.log(`stream 1`, val));
    this.genericListControl.valueChanges.subscribe(console.log);
  }

}
