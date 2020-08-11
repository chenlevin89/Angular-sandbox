import {ElementRef, AfterViewInit, InjectionToken, Injector, Renderer2} from '@angular/core';

export interface Theme {
  [key:string]: string;
}

export abstract class ThemeBase implements AfterViewInit {

  constructor(private injector: Injector,
    private themeToken: InjectionToken<any>,
    private themeDefaultValue: Theme) {}

  ngAfterViewInit() {
    const token: InjectionToken<any> = this.injector.get(this.themeToken, null);
    const isNative = true;
    const element = isNative ? document.body : this.injector.get(ElementRef).nativeElement;

    Object.entries(this.themeDefaultValue).forEach(([key, value]) => {
      element.style.setProperty(key, value);
    });

    if (token) {
      Object.entries(token).forEach(([key, value]) => {
        element.style.setProperty(key, value);
      });
    }
  }

}
