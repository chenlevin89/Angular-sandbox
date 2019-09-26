import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownOptionListComponent } from './dropdown-option-list.component';

describe('DropdownOptionListComponent', () => {
  let component: DropdownOptionListComponent;
  let fixture: ComponentFixture<DropdownOptionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownOptionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownOptionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
