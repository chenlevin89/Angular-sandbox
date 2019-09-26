import {Directive, ElementRef, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {takeUntil, flatMap, map, tap} from 'rxjs/operators';

@Directive({
  selector: '[appIntersectionObserver]'
})
export class IntersectionObserverDirective implements OnInit, OnDestroy {

  @Output() appIntersectionObserver = new EventEmitter<any>();

  onDestroy$ = new Subject();
  private intersection: IntersectionObserver;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    const observeElementVisibility$ = Observable.create(observer => {
      this.intersection = new IntersectionObserver(value => {
        observer.next(value);
      });

      this.intersection.observe(this.elementRef.nativeElement);
    });

    observeElementVisibility$.pipe(
      takeUntil(this.onDestroy$),
      flatMap((value: any[]) => value),
      map((val: IntersectionObserverEntry) => val.isIntersecting)
    ).subscribe(val => {
      this.appIntersectionObserver.emit({element: this.elementRef.nativeElement, visibility: val});
    });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    this.intersection.disconnect();
  }

}
