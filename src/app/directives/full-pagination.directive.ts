import {Directive, TemplateRef, ViewContainerRef, OnInit, Input, OnDestroy} from '@angular/core';
import {Observable, BehaviorSubject, defer, fromEvent, combineLatest, Subject, merge} from 'rxjs';
import {switchMap, filter, startWith, map, tap, scan, takeUntil, finalize} from 'rxjs/operators';

@Directive({
  selector: '[appFullPagination]'
})
export class FullPaginationDirective implements OnInit, OnDestroy {

  @Input() appFullPagination: (pageIndex: number) => Observable<any[]>;
  @Input() appFullPaginationChunkSize = 20;
  @Input() appFullPaginationTakeUntil = new Subject();

  fetchAsyncData$ = new BehaviorSubject<boolean>(true);
  onDestroy$ = new Subject();

  constructor(private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef) {}


  ngOnInit() {
    this.viewContainerRef.createEmbeddedView(this.templateRef, {
      $implicit: this.buildImplicitObservable()
    });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  private buildImplicitObservable(): Observable<{value: any[], loading: boolean}> {
    let paginationIndex = 2;
    const loading$ = new BehaviorSubject(true);

    const scroll$ = this.buildScrollObservable()
      .pipe(
        filter(_ => !loading$.getValue()),
        map(_ => paginationIndex++),
        startWith(1)
      );

    const asyncData$ = this.buildAsyncPagination().pipe(tap(_ => loading$.next(false)));

    const paginationData$ = combineLatest(asyncData$, scroll$)
      .pipe(
        tap(([options, index]) => this.fetchAsyncData({options, index, loading$})),
        map(([options, index]) => options.slice(0, this.appFullPaginationChunkSize * index)),
        takeUntil(this.appFullPaginationTakeUntil)
      );

    const loadingObservable$ = merge(loading$.asObservable(), this.appFullPaginationTakeUntil.asObservable())
      .pipe(map(value => !!value));

    return combineLatest([paginationData$.pipe(startWith([])), loadingObservable$])
      .pipe(
        takeUntil(this.onDestroy$),
        map(([value, loading]) => ({value, loading}))
      );
  }

  private buildAsyncPagination(): Observable<any[]> {
    let index = 0;
    const paginationValue$ = this.fetchAsyncData$.asObservable()
      .pipe(
        map(_ => index++),
        switchMap(pageIndex => this.appFullPagination(pageIndex)),
        scan((acc, value) => [...acc, ...value], [])
      );
    return paginationValue$;
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

  private fetchAsyncData({options, index, loading$}:
    {options: any[], index: number, loading$: BehaviorSubject<boolean>}): void {
    const loading = loading$.getValue();
    if (!loading && (index - 1) * this.appFullPaginationChunkSize === options.length) {
      loading$.next(true);
      this.fetchAsyncData$.next(true);
    }
  }

}
