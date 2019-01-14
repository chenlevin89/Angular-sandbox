import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => InputTextComponent) }
  ]
})
export class InputTextComponent implements OnInit, ControlValueAccessor {

  text: string;

  onChanged: (e: any) => void;
  onTouched: (e: any) => void;

  constructor() { }

  ngOnInit() {
  }

  writeValue(obj: any): void {
    this.text = obj;
  }
  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }


}
