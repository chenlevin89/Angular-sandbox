import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDateComponent } from './user-date.component';

describe('UserDateComponent', () => {
  let component: UserDateComponent;
  let fixture: ComponentFixture<UserDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
