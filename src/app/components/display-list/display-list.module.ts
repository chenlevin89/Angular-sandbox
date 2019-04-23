import {NgModule, ModuleWithProviders, Renderer2} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DisplayListComponent} from './display-list.component';
import {DisplayListConfig, ConfigToken, defaultTheme} from './display-list.entities';
import {ThemeService} from './theme.service';

const components = [DisplayListComponent];

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    CommonModule
  ]
})
export class DisplayListModule {

  constructor(private themeService: ThemeService) {}

  static forRoot(config?: DisplayListConfig): ModuleWithProviders {
    return {
      ngModule: DisplayListModule,
      providers: [
        ThemeService,
        {
          provide: ConfigToken,
          useValue: config || {numberOfItemsToDisplay: 5, theme: defaultTheme}
        }
      ]
    };
  }

}
