import {Component, OnInit, Input, TemplateRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {identifierModuleUrl} from '@angular/compiler';

@Component({
  selector: 'app-generic-list',
  templateUrl: './generic-list.component.html',
  styleUrls: ['./generic-list.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, multi: true, useExisting: GenericListComponent}
  ]
})
export class GenericListComponent implements OnInit, ControlValueAccessor {

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

  clear(e) {
    console.log(e);
  }

  registerOnChange(fn: any): void {
    this.form.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {

  }
  setDisabledState?(isDisabled: boolean): void {

  }

  private buildForm(values: any) {
    const formArray = this.form.get('list') as FormArray;
    formArray.clear();
    if (values.list) {
      values.list.forEach(val => {
        formArray.push(this.fb.group(val));
      });
    }
  }

}
