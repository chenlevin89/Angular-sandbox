import {ElementRef} from '@angular/core';

export function nativeDecorator(eventName: string) {
  return function <T extends {new(...args: any[]): {}}>(constructor: T) {
    return class extends constructor {

      constructor(...args) {
        super(...args);
        this.addLisners();
        const elementRef = Object.values(this).find(val => val instanceof ElementRef);
        elementRef.nativeElement.addEventListener('mouseover', this['mouseover']);
      }

      addLisners() {
        document.addEventListener(eventName, e => this['onGlobalClick'](e.target));
      }
    };
  };
}
