import { Component, OnInit, ContentChildren, QueryList } from '@angular/core';
import {TabDirective} from './tab.directive';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent  {

  @ContentChildren(TabDirective, {read: TabDirective}) set tabDirectives(value: QueryList<TabDirective>) {
    this.tabs = value;
    this.selected = value.first;
  }

  tabs: QueryList<TabDirective>;
  selected: TabDirective;

  constructor() {}

}
