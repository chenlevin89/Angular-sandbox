import {Component, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';
import {FormControl} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  @Output() searchChanged: EventEmitter<string> = new EventEmitter<string>();
  formControl: FormControl = new FormControl();
  onDestroy$: Subject<any> = new Subject();

  constructor() {}

  ngOnInit() {
    this.formControl.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(val => this.searchChanged.emit(val));
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
