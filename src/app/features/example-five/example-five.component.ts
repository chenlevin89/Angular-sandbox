import {Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef} from '@angular/core';
import {ExampleFiveService} from './example-five.service';
import {Observable, Subject, of, fromEvent} from 'rxjs';

const CHUNK_SIZE = 100;


@Component({
  selector: 'app-example-five',
  templateUrl: './example-five.component.html',
  styleUrls: ['./example-five.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleFiveComponent implements OnInit, AfterViewInit {

  @ViewChild('mybutton', {read: ElementRef, static: false}) mybutton: ElementRef;

  x = of('chen');

  takeUntil$ = new Subject();

  constructor(
    private exampleFiveService: ExampleFiveService,
    private cdr: ChangeDetectorRef) {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    fromEvent(this.mybutton.nativeElement, 'click')
      .subscribe(
        _ => {
          this.change();
          this.cdr.detectChanges();
        }
      );
  }

  asyncCallback(pageIndex: number): Observable<any[]> {
    if (pageIndex * CHUNK_SIZE < 150) {
      return this.exampleFiveService.getData({pageIndex, chunkSize: CHUNK_SIZE});
    }
    this.takeUntil$.next();
    return of([]);
  }

  change() {
    this.x = of('andy');
  }


}
