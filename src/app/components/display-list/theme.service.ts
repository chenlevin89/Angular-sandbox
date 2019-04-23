import { Injectable, Inject } from '@angular/core';
import {ThemeConfig, ConfigToken, DisplayListConfig} from './display-list.entities';

@Injectable()
export class ThemeService {

  constructor(@Inject(ConfigToken) config: DisplayListConfig) {
    this.setTheme(config.theme);
   }

  private setTheme(theme: ThemeConfig) {
    // can not use renderer2
    Object.keys(theme).forEach(key => {
      document.documentElement.style.setProperty(`--${key}`, theme[key]);
    });
  }
}
