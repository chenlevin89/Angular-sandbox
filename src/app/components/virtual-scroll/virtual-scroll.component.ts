import {Component, OnInit, Input, ContentChild, TemplateRef, Output, EventEmitter} from '@angular/core';
import {VirtualScroll, VirtualScrollConfig} from './virtual-scroll';
import {BehaviorSubject, Subject, Observable, merge} from 'rxjs';
import {takeUntil, mapTo, tap} from 'rxjs/operators';

@Component({
  selector: 'app-virtual-scroll',
  templateUrl: './virtual-scroll.component.html',
  styleUrls: ['./virtual-scroll.component.scss']
})
export class VirtualScrollComponent implements OnInit {

  @ContentChild(TemplateRef, {static: false}) templateRef: TemplateRef<any>;

  @Input() config: VirtualScrollConfig;
  @Input('takeUntil') takeUntil$ = new Subject();
  @Input() set data(value: any[]) {this.onDataChanged(value);}
  @Output() scrollReachEnd = new EventEmitter<number>();

  loading$ = new BehaviorSubject(true);
  displayLoading$: Observable<boolean>;
  scrollResult: any;
  rowsData: any[];
  numberOfRows: number;
  index = 0;

  constructor() {}

  ngOnInit() {
    this.displayLoading$ = merge(this.loading$.asObservable(), this.takeUntil$.asObservable().pipe(mapTo(false)));
  }

  onScroll(event) {
    const scrollTop = event.target.scrollTop;
    this.scrollResult = this.renderListElements({...this.config, numberOfRows: this.numberOfRows, scrollTop});
  }

  private onDataChanged(value: any[]): void {
    if (value) {
      const rows = this.rowsData ? this.rowsData.length : 0;
      this.rowsData = value;
      this.numberOfRows = this.rowsData.length;
      this.scrollResult = this.renderListElements({
        ...this.config,
        numberOfRows: this.numberOfRows,
        scrollTop: Math.max(rows * this.config.rowHeight - this.config.containerHight, 0)
      });
      this.loading$.next(false);
    }
  }

  private renderListElements({
    containerHight,
    numberOfRows,
    rowHeight,
    nodePadding,
    scrollTop,
    generateItem
  }: VirtualScroll): any {
    const contentHeight = numberOfRows * rowHeight;

    let startNode = Math.floor(scrollTop / rowHeight) - nodePadding;
    startNode = Math.max(0, startNode);

    let visibleNodesCount = Math.ceil(containerHight / rowHeight) + 2 * nodePadding;
    visibleNodesCount = Math.min(numberOfRows - startNode, visibleNodesCount);

    const offsetY = startNode * rowHeight;

    const visibleChildren = new Array(visibleNodesCount)
      .fill(null)
      .map((_, i) => this.rowsData[i + startNode]);

    if ((scrollTop >= contentHeight - containerHight) && !this.loading$.getValue() ) {
      this.index++;
      this.loading$.next(true);
      this.scrollReachEnd.emit(this.index);
    }

    return {
      contentHeight,
      offsetY,
      visibleChildren
    };
  }

}
