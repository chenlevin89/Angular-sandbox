import {Component, OnInit, Input, Inject} from '@angular/core';
import {ListItem, ConfigToken, DisplayListConfig} from './display-list.entities';

const ITEM_HEIGHT = 20;

@Component({
  selector: 'app-display-list',
  templateUrl: './display-list.component.html',
  styleUrls: ['./display-list.component.scss']
})
export class DisplayListComponent implements OnInit {

  @Input() list: ListItem[];

  constructor(@Inject(ConfigToken) private config: DisplayListConfig) {}

  ngOnInit() {
  }

  get calcContainerHeight(): any {
    return {height: `${this.config.numberOfItemsToDisplay * ITEM_HEIGHT}px`};
  }

}
