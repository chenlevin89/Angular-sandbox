import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Injectable()
export class StateManagementService {

  private state$ = new BehaviorSubject<{value: any, lastKeyChanged: string}>(null);
  private onDestroy$ = new Subject();
  private selectMapping: {[key: string]: BehaviorSubject<any>} = {};

  constructor() {}

  get state(): any {
    const state = this.state$.getValue();
    return state ? state.value : {};
  }

  initalizeState(value: any): void {
    this.state$.next({value, lastKeyChanged: null});
    this.observeStateUpdate();
  }

  updateState({key, value}: {key: string, value: any}): void {
    const stateValue = {...this.state};
    const newSubStateValue = {};
    if (stateValue.hasOwnProperty(key)) {
      newSubStateValue[key] = value;
    }
    this.state$.next({value: {...stateValue, ...newSubStateValue}, lastKeyChanged: key});
  }

  select(key: string): Observable<any> {
    if (!this.selectMapping[key]) {
      const stateValue = {...this.state};
      this.selectMapping[key] = new BehaviorSubject(stateValue[key]);
    }
    return this.selectMapping[key].asObservable();
  }

  clear(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    this.state$.next(null);
  }

  private observeStateUpdate(): void {
    this.onDestroy$.next();
    this.state$.asObservable()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(({value, lastKeyChanged}) => {
        if (lastKeyChanged && this.selectMapping[lastKeyChanged] && value) {
          this.selectMapping[lastKeyChanged].next(value[lastKeyChanged]);
        }
      });
  }

}
