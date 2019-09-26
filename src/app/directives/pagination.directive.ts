import {Directive, Input, TemplateRef, ViewContainerRef, OnInit, AfterViewInit, Renderer2} from '@angular/core';
import {BehaviorSubject, Observable, combineLatest, fromEvent, defer} from 'rxjs';
import {filter, map, startWith} from 'rxjs/operators';


@Directive({
  selector: '[appPagination]'
})
export class PaginationDirective implements OnInit, AfterViewInit {

  @Input() appPaginationChunkSize = 20;
  @Input() appPaginationHeight: string;
  @Input()
  set appPaginationOf(value: any[]) {
    this.options$.next(value);
  }

  private options$ = new BehaviorSubject<any[]>([]);

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.viewContainerRef.createEmbeddedView(this.templateRef, {
      $implicit: this.buildImplicitObservable()
    });
  }

  ngAfterViewInit() {
    this.setElementStyle();
  }

  private buildImplicitObservable(): Observable<any[]> {
    const pagination$ = this.buildPaginationObservable();

    return combineLatest(this.options$.asObservable(), pagination$)
      .pipe(
        filter(([options, index]) => options && (index - 1) * this.appPaginationChunkSize < options.length),
        map(([options, index]) => options.slice(0, this.appPaginationChunkSize * index))
      );
  }

  private buildPaginationObservable(): Observable<number> {
    return defer(() => {
      let index = 2;
      return fromEvent(this.viewContainerRef.element.nativeElement.nextElementSibling, 'scroll')
        .pipe(
          filter((event: any) => event.currentTarget.scrollHeight - event.currentTarget.scrollTop <= event.currentTarget.clientHeight + 10),
          map(_ => index++),
          startWith(1)
        );
    });
  }

  private setElementStyle(): void {
    const elem = this.viewContainerRef.element.nativeElement.nextElementSibling;
    this.renderer.setStyle(elem, 'overflow-y', 'auto');
    if (this.appPaginationHeight) {
      this.renderer.setStyle(elem, 'height', this.appPaginationHeight);
    }
  }

}
