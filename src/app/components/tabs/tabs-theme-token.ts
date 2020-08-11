import {InjectionToken} from "@angular/core";
import {Theme} from "../theme-base.class";


export interface TabsTheme extends Theme {
  '--selected'?: string;
  '--default'?: string;
}

export const tabsThemeDefaultValue: TabsTheme = {
  '--default': 'bisque',
  '--selected': 'aliceblue'
};

export const TabsThemeToken = new InjectionToken<TabsTheme>('Tabs Theme Token');
