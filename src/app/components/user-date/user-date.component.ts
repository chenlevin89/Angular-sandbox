import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormGroupDirective, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-date',
  templateUrl: './user-date.component.html',
  styleUrls: ['./user-date.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ]
})
export class UserDateComponent implements OnInit {


  userForm: FormGroup;

  constructor(private _parentFormContainer: FormGroupDirective) {}

  ngOnInit() {
    this.userForm = this._parentFormContainer.form;
  }

  isFormControlHasError(formName, errorName) {
    return this.userForm.get(formName).touched &&
      this.userForm.get(formName).errors &&
      this.userForm.get(formName).errors[errorName];
  }

}
