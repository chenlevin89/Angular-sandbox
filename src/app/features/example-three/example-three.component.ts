import {Component, OnInit, Renderer2, NgZone} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {tap, buffer, debounceTime, takeUntil, switchMap} from 'rxjs/operators';
import {ExampleThreeService} from './example-three.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Row} from './components/list/list-entity';
import {StateManagementService} from '../../services/state-management.service';

@Component({
  selector: 'app-example-three',
  templateUrl: './example-three.component.html',
  styleUrls: ['./example-three.component.scss']
})
export class ExampleThreeComponent implements OnInit {

  asSyntax$: Observable<boolean>;

  displayItems$: Observable<{id: number, text: string}[]>;
  bufferAll$: Observable<{$event: MouseEvent, id: number}[]>;
  selection$ = new Subject<{$event: MouseEvent, id: number}>();

  form: FormGroup;
  submitForm$ = new Subject<any>();
  loading$: Observable<boolean>;

  rows: Row[];
  color = 'blue';
  listPerformanceToggle = false;

  expressionText = 'Expression changed';

  onDestroy$ = new Subject<void>();

  constructor(
    private service: ExampleThreeService,
    private renderer: Renderer2,
    private ngZone: NgZone,
    private fb: FormBuilder) {}


  ngOnInit() {
    this.displayItems$ = this.service.getItems();

    this.asSyntax$ = of(true)
      .pipe(tap(console.log));

    this.bufferAll$ = this.selection$.asObservable()
      .pipe(
        buffer(this.selection$.pipe(debounceTime(800)))
      );

    this.bufferAll$.subscribe(this.handleBuffer.bind(this));

    this.initalizeForm();
    this.setSaveAllObservable();
    this.rows = this.initalizeRows();
  }

  approveRow(row: Row): void {
    this.toggleLoading({row, value: true});
    this.service.approveRow(row)
      .subscribe(
        _ => this.toggleLoading({row, value: false})
      );
  }

  private handleBuffer(selections: {$event: MouseEvent, id: number}[]) {
    this.ngZone.runOutsideAngular(_ => {
      for (let index = 0; index < selections.length; index++) {
        setTimeout(() => {
          this.addNRemoveClass(selections[index].$event);
        }, index * 800);
      }
    });
  }

  private addNRemoveClass(curr: MouseEvent) {
    this.renderer.addClass(curr.target, 'active');
    setTimeout(_ => {
      this.renderer.removeClass(curr.target, 'active');
    }, 400);
  }

  private initalizeForm(): void {
    this.form = this.fb.group({
      name: [null, Validators.required],
      value: [null, Validators.required]
    });
  }

  private setSaveAllObservable(): void {
    const {observable$, loading$} =
      this.wrapObservable({callback: this.saveAll.bind(this), subject$: this.submitForm$, takeUntil$: this.onDestroy$});
    this.loading$ = loading$;
    observable$.subscribe(value => {
      console.log(`handle success value - ${JSON.stringify(value)}`);
    });
  }

  private saveAll(formValue: any): Observable<any> {
    return this.service.saveChanges({userId: 1, data: formValue});
  }

  private wrapObservable({subject$, callback, takeUntil$}:
    {
      subject$: Subject<any>,
      callback: (params) => Observable<any>,
      takeUntil$: Subject<any>
    }): {
      observable$: Observable<any>,
      loading$: Observable<boolean>
    } {
    const loading$ = new Subject<boolean>();
    const observable$ = subject$.asObservable().pipe(
      takeUntil(takeUntil$),
      tap(_ => loading$.next(true)),
      switchMap(value => callback(value)),
      tap(_ => loading$.next(false))
    );
    return {observable$, loading$: loading$.asObservable()};
  }

  private initalizeRows(): Row[] {
    const array = [];
    for (let i = 1; i < 500; i++) {
      array.push({id: i, action: `action_${i}`});
    }
    return array;
  }

  private toggleLoading({row, value}: {row: Row, value: boolean}) {
    const index = this.rows.findIndex(curr => curr.id === row.id);
    this.rows = [
      ...this.rows.slice(0, index),
      {...row, loading: value},
      ...this.rows.slice(index + 1)
    ];
  }

}
