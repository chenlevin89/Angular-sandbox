import {Component, OnInit} from '@angular/core';
import {
  ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup, FormBuilder,
  ControlContainer, FormGroupDirective, Validators, FormControl
} from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  viewProviders: [
    {provide: ControlContainer, useExisting: FormGroupDirective}
  ]
})
export class TestComponent implements OnInit {

  form: FormGroup;

  constructor(
    private controlContainer: FormGroupDirective) {}

  ngOnInit() {
    this.form = this.controlContainer.form;
    this.form.addControl('status', new FormControl(null));
    this.form.updateValueAndValidity();
    this.initalizeLinsters();
  }

  private initalizeLinsters() {
    this.form.get('status').valueChanges.subscribe(val => {
      if (val) {
        this.form.addControl('reason', new FormControl(null, Validators.required));
      } else {
        this.form.removeControl('reason');
      }
      this.form.updateValueAndValidity();
    });
  }

}
