import {Component, OnInit, Self, Optional, Injector, DoCheck, ChangeDetectionStrategy, AfterViewChecked} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl, FormGroupDirective, FormControl, FormControlDirective, Validators, AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, multi: true, useExisting: InputTextComponent}
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputTextComponent implements ControlValueAccessor, AfterViewChecked, OnInit {

  text = new FormControl();

  onChanged: (e: any) => void;
  onTouched: (e: any) => void;

  constructor(private injector: Injector) {}

  ngOnInit() {
    this.text.valueChanges.subscribe(val => {
      if (this.onChanged) {
        this.onChanged(val);
      }
    });
    const c = this.injector.get(NgControl);
  }

  ngAfterViewChecked() {
    console.log('change detection');
  }


  writeValue(obj: any): void {
    this.text.setValue(obj);
  }
  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }


}
