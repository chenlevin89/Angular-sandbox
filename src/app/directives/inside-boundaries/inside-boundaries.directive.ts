import {Directive, Input, OnInit, OnDestroy, ElementRef, AfterViewInit, Output, EventEmitter} from '@angular/core';
import {BehaviorSubject, Subject, Subscription, fromEvent, combineLatest} from 'rxjs';
import {takeUntil, filter, map, take} from 'rxjs/operators';

@Directive({
  selector: '[appInsideBoundaries]'
})
export class InsideBoundariesDirective implements OnInit, AfterViewInit, OnDestroy {

  @Input() set activated(value: boolean) {
    this.activated$.next(value);
  }

  @Output() appInsideBoundaries = new EventEmitter<void>();

  private activated$ = new BehaviorSubject<boolean>(true);
  private onDestroy$ = new Subject<void>();
  private elementBoundaries$ = new Subject<{left: number, right: number, top: number, bottom: number}>();
  private subscription: Subscription;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    combineLatest(this.activated$.asObservable(), this.elementBoundaries$.asObservable())
      .pipe(
        takeUntil(this.onDestroy$),
        map(([status, boundaries]) => ({status, ...boundaries}))
      )
      .subscribe(this.setMouseListener.bind(this))
  }

  ngAfterViewInit() {
    const {left, right, top, bottom} = this.elementRef.nativeElement.getBoundingClientRect();
    this.elementBoundaries$.next({left, right, top, bottom});
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  private setMouseListener({status, left, right, bottom, top}): void {
    if (status && !this.subscription) {
      this.subscription = fromEvent(document, 'mousemove')
        .pipe(
          filter((event: MouseEvent) => {
            return event.clientX >= left && event.clientX <= right &&
              event.clientY >= top && event.clientY <= bottom;
          }))
        .subscribe(_ => this.appInsideBoundaries.next());
    } else if (this.subscription && typeof this.subscription.unsubscribe === 'function') {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

}
