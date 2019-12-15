import {Component, OnInit, Input, TemplateRef} from '@angular/core';
import {
  ControlValueAccessor, NG_VALUE_ACCESSOR, FormArray, FormBuilder,
  FormGroup, FormControl, Validator, AbstractControl, ValidationErrors, Validators, NG_VALIDATORS
} from '@angular/forms';

@Component({
  selector: 'app-generic-list',
  templateUrl: './generic-list.component.html',
  styleUrls: ['./generic-list.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, multi: true, useExisting: GenericListComponent},
    {provide: NG_VALIDATORS, multi: true, useExisting: GenericListComponent}
  ]
})
export class GenericListComponent implements OnInit, ControlValueAccessor, Validator {

  @Input() templateRef: TemplateRef<any>;
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      list: this.fb.array([])
    });
  }

  writeValue(obj: any): void {
    this.buildForm(obj);
  }

  clear(control: FormControl) {
    control.reset();
  }

  registerOnChange(fn: any): void {
    this.form.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {

  }
  setDisabledState?(isDisabled: boolean): void {

  }

  validate(control: AbstractControl): ValidationErrors {
    return this.form.valid ? null : {genericList: true};
  }

  private buildForm(values: any) {
    const formArray = this.form.get('list') as FormArray;
    formArray.clear();
    if (values.list) {
      values.list.forEach(val => {
        const formsControl = Object.keys(val).reduce((acc, curr) => {
          acc[curr] = [val[curr], Validators.required];
          return acc;
        }, {});
        formArray.push(this.fb.group(formsControl));
      });
    }
  }

}
