import {Component, OnInit, ChangeDetectionStrategy, Input, Type, HostListener, ElementRef, AfterViewInit, ViewChild} from '@angular/core';
import {Subject, BehaviorSubject, fromEvent} from 'rxjs';
import {FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {takeUntil, filter} from 'rxjs/operators';
import {Dropdown} from './dropdown-entities';

const CHANK_SIZE = 20;

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DropdownComponent}
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownComponent implements OnInit, ControlValueAccessor, AfterViewInit {

  @ViewChild('dropdownOptions', { read: ElementRef, static: true }) dropdownOptions: ElementRef;

  @Input() set options(value: Dropdown[]) {
    this.allOptions = value;
    this.index = 1;
    this.generateDisplayedOptions();
  }
  @Input() componentType: Type<any>;

  displayedOptions$ = new BehaviorSubject<Dropdown[]>(null);
  onDestroy$ = new Subject();
  placeholder$ = new BehaviorSubject<string>('Select...');
  isOpen$ = new BehaviorSubject<boolean>(false);
  selected = new FormControl();
  disabled = false;
  index = 1;
  selectedMapping = {};
  haveSearch = false;

  private allOptions: Dropdown[];
  private onChange: Function;
  private onTouch: Function;

  @HostListener('document:click', ['$event']) clickOutside(event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen$.next(false);
    }
  }

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.initalizeLinsters();
  }

  ngAfterViewInit() {
    fromEvent(this.dropdownOptions.nativeElement, 'scroll')
      .pipe(
        takeUntil(this.onDestroy$),
        filter(_ => !this.haveSearch)
      )
      .subscribe(event => {
        this.onScroll(event);
      });
  }

  onOptionSelected(option: Dropdown) {
    this.selected.setValue(option);
    this.isOpen$.next(false);
  }

  onTextChanged(value): void {
    if (this.allOptions) {
      if (value) {
        const filtered = this.allOptions.filter(item => item.displayText.toLowerCase().indexOf(value.toLowerCase()) !== -1);
        this.displayedOptions$.next(filtered);
      } else {
        this.generateDisplayedOptions();
      }
      this.haveSearch = !!value;
    }
  }

  onScroll(event): void {
    const element = event.currentTarget;
    if ((element.scrollHeight - element.scrollTop <= element.clientHeight + 10) &&
      this.index * CHANK_SIZE < this.allOptions.length) {
      this.index++;
      this.generateDisplayedOptions(this.index);
    }
  }

  writeValue(obj: Dropdown): void {
    this.selected.setValue(obj, {emitEvent: false});
    if (obj) {
      this.afterOptionSelected(obj);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private initalizeLinsters(): void {
    this.selected.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(value => {
        this.onChange(value);
        this.afterOptionSelected(value);
      });
  }

  private generateDisplayedOptions(index = 1): void {
    const displayedValues = this.allOptions ? this.allOptions.slice(0, CHANK_SIZE * index) : [];
    this.displayedOptions$.next(displayedValues);
  }

  private afterOptionSelected(value: Dropdown): void {
    this.placeholder$.next(value.displayText);
    this.selectedMapping = {};
    this.selectedMapping[value.id] = true;
  }

}
