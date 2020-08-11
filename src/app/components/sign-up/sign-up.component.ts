import {Component, OnInit, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => SignUpComponent)}
  ]
})
export class SignUpComponent implements OnInit, ControlValueAccessor {

  signUp: FormGroup;
  registerOnTouchedFunc;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.signUp = this.formBuilder.group({
      userName: [null, Validators.required],
      userEmail: [null]
    });
  }

  writeValue(obj: any): void {
    if (obj) {
      this.signUp.patchValue(obj);
    }
  }

  registerOnChange(fn: any): void {
    this.signUp.valueChanges.subscribe(value => fn(value));
  }

  registerOnTouched(fn: any): void {
    this.registerOnTouchedFunc = fn;
  }

}
