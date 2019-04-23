import {InjectionToken} from '@angular/core';

export interface ListItem {
    id: number;
    name: string;
}

export interface DisplayListConfig {
    numberOfItemsToDisplay: number;
    theme: ThemeConfig;
}

export interface ThemeConfig {
    'primary-color': string;
}

export const ConfigToken = new InjectionToken<DisplayListConfig>('displayListConfig');


export const defaultTheme: ThemeConfig = {
    'primary-color': 'red'
};
