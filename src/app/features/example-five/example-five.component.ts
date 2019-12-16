import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, of, timer, Subject} from 'rxjs';
import {Unsubscribe} from '../../decotators/unsubscribe.decorator';
import {ExampleFiveService} from './example-five.service';
import {FormControl} from '@angular/forms';
import {dynamicPipeData, DynamicData} from './example-five-config';

const CHUNK_SIZE = 40;

@Unsubscribe
@Component({
  selector: 'app-example-five',
  templateUrl: './example-five.component.html',
  styleUrls: ['./example-five.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleFiveComponent implements OnInit {

  timer$: Observable<number>;
  takeUntil$ = new Subject();
  genericListControl: FormControl;
  dynamicPipeData: DynamicData[] = dynamicPipeData;

  constructor(private router: Router, private service: ExampleFiveService) {}

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

  redirect() {
    this.router.navigate(['example-four']);
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
    this.genericListControl.valueChanges.subscribe(console.log);
  }

}
