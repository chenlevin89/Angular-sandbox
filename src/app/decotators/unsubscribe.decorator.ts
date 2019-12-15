import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

export function Unsubscribe<T extends {new(...args: any[]): any}>(constructor: T) {
  return class extends constructor {

    private onDestroy$ = new Subject();

    ngOnInit(): void {
      if (typeof super.ngOnInit === 'function') {
        super.ngOnInit();
      }
      Object.entries(this).forEach(([key, value]) => {
        if (value instanceof Observable && !(value instanceof Subject) ) {
          this[key] = value.pipe(takeUntil(this.onDestroy$));
        }
      });
    }

    ngOnDestroy(): void {
      if (typeof super.ngOnDestroy === 'function') {
        super.ngOnDestroy();
      }
      this.onDestroy$.next();
      this.onDestroy$.complete();
    }

  };
}
