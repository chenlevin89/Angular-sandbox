import {
  Component, OnInit, ChangeDetectionStrategy, ViewChildren,
  ElementRef, QueryList, AfterViewInit
} from '@angular/core';
import {StateManagementService} from '../../services/state-management.service';
import {BehaviorSubject, Subject, ReplaySubject} from 'rxjs';
import {TreeNode} from 'src/app/components/tree/tree-entities';
import {FormControl} from '@angular/forms';
import {ExampleFiveService} from '../example-five/example-five.service';
import {NotificationsService} from 'src/app/services/notifications.service';


@Component({
  selector: 'app-example-four',
  templateUrl: './example-four.component.html',
  styleUrls: ['./example-four.component.scss'],
  providers: [StateManagementService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleFourComponent implements OnInit, AfterViewInit {

  @ViewChildren('children', {read: ElementRef}) children: QueryList<ElementRef>;

  list$ = new BehaviorSubject<any[]>([]);

  subject$ = new Subject<string>();
  behaviorSubject$ = new BehaviorSubject<string>('BehaviorSubject 1');
  replaySubject$ = new ReplaySubject<string>(2);

  dropdownForm = new FormControl();

  constructor(private notificationsService: NotificationsService) {}

  ngOnInit() {
    this.list$.next(this.buildList());
    this.invokeSubjects();
    this.listeners();

  }

  ngAfterViewInit() {
    this.children.changes.subscribe(this.onViewChildrenChanged.bind(this));
  }

  visibilityChanges(event) {
    if (event.visibility) {
      event.element.focus();
    }
  }

  click() {
    this.notificationsService.emitNotification({type: 0, value: {d: new Date()}});
  }

  clear() {
    this.notificationsService.clearAllStreams();
  }

  appMutationObserverFunc(event) {
    console.log(event);
  }

  private buildList(): any[] {
    const array = [];
    for (let i = 0; i < 50; i++) {
      array.push({id: i, name: `option_${i}`});
    }
    return array;
  }

  private onViewChildrenChanged(childList) {
    if (childList.last) {
      childList.last.nativeElement.scrollIntoView({behavior: 'smooth'});
    }
  }

  private invokeSubjects() {
    this.subject$.next('Subject 1');
    this.behaviorSubject$.next('BehaviorSubject 2');
    this.replaySubject$.next('ReplaySubject 1');
    this.replaySubject$.next('ReplaySubject 2');
    this.replaySubject$.next('ReplaySubject 3');
  }

  private listeners() {
    this.subject$.asObservable().subscribe(console.log);
    this.behaviorSubject$.asObservable().subscribe(console.log);
    this.replaySubject$.asObservable().subscribe(console.log);
  }

}
