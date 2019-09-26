import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownIconItemComponent } from './dropdown-icon-item.component';

describe('DropdownIconItemComponent', () => {
  let component: DropdownIconItemComponent;
  let fixture: ComponentFixture<DropdownIconItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownIconItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownIconItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
