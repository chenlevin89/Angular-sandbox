import {
  Component, OnInit, Output, EventEmitter,
  OnDestroy, ElementRef, ViewChild, ChangeDetectionStrategy, TemplateRef
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {distinctUntilChanged, debounceTime, takeUntil, flatMap, map, tap} from 'rxjs/operators';
import {Subject, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-dropdown-search',
  templateUrl: './dropdown-search.component.html',
  styleUrls: ['./dropdown-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownSearchComponent implements OnInit, OnDestroy {

  @Output() textChanged = new EventEmitter<string>();
  @ViewChild('searchText', { read: ElementRef, static: true }) searchText: ElementRef;


  formControl = new FormControl();
  private onDestroy$ = new Subject();

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.initalizeLinsters();
    const observeElementVisibilty$ = Observable.create(observer => {
      const intersection = new IntersectionObserver(value => {
        observer.next(value);
      });

      intersection.observe(this.elementRef.nativeElement);

      return () => {intersection.disconnect(); };
    });

    observeElementVisibilty$.pipe(
      takeUntil(this.onDestroy$),
      flatMap((value: any[]) => value),
      map((val: IntersectionObserverEntry) => val.isIntersecting)
    ).subscribe(val => {
      if (val) {
        this.searchText.nativeElement.focus();
      } else {
        this.formControl.setValue(null);
      }
    });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  private initalizeLinsters(): void {
    this.formControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.onDestroy$)
      )
      .subscribe(val => {
        this.textChanged.emit(val);
      });
  }

}
