import {Directive, TemplateRef, Input, ViewContainerRef, OnInit, OnDestroy} from '@angular/core';
import {Observable, BehaviorSubject, combineLatest, fromEvent, defer, Subject} from 'rxjs';
import {filter, map, tap, switchMap, scan, startWith, takeUntil} from 'rxjs/operators';


@Directive({
  selector: '[appAsyncPagination]'
})
export class AsyncPaginationDirective implements OnInit, OnDestroy {

  @Input() appAsyncPagination: (pageIndex: number) => Observable<any[]>;

  onDestroy$ = new Subject();

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef) {}

  ngOnInit() {
    this.viewContainerRef.createEmbeddedView(this.templateRef, {
      $implicit: this.buildPaginationObservable()
    });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  private buildPaginationObservable(): Observable<{value: any[], loading: boolean}> {
    let index = 0;
    const loading$ = new BehaviorSubject(false);
    const paginationValue$ = this.buildScrollObservable()
      .pipe(
        filter(_ => !loading$.getValue()),
        map(_ => index++),
        tap(_ => loading$.next(true)),
        switchMap(pageIndex => this.appAsyncPagination(pageIndex)),
        scan((acc, value) => [...acc, ...value], []),
        tap(_ => loading$.next(false)),
        takeUntil(this.onDestroy$)
      );
    return combineLatest([paginationValue$.pipe(startWith(null)), loading$.asObservable()])
      .pipe(map(([value, loading]) => ({value, loading})));
  }

  private buildScrollObservable(): Observable<boolean> {
    return defer(() => {
      return fromEvent(this.viewContainerRef.element.nativeElement.nextElementSibling, 'scroll')
        .pipe(
          filter((event: any) => event.currentTarget.scrollHeight - event.currentTarget.scrollTop <= event.currentTarget.clientHeight + 10),
          startWith(true)
        );
    });
  }

}
