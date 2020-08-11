import { Component, OnInit, ContentChildren, QueryList, ElementRef, AfterViewInit, Injector } from '@angular/core';
import {TabDirective} from './tab.directive';
import {ThemeBase} from '../theme-base.class';
import {TabsThemeToken, tabsThemeDefaultValue} from './tabs-theme-token';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent extends ThemeBase implements AfterViewInit  {

  @ContentChildren(TabDirective, {read: TabDirective}) set tabDirectives(value: QueryList<TabDirective>) {
    this.tabs = value;
    this.selected = value.first;
  }

  tabs: QueryList<TabDirective>;
  selected: TabDirective;

  constructor(injector: Injector) {
    super(injector, TabsThemeToken, tabsThemeDefaultValue);
  }

  ngAfterViewInit(){
    super.ngAfterViewInit();
  }

}
