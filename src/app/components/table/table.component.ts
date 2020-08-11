import {Component, OnInit, Input, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: '[app-table]',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {

  @Input() list: {name: string}[];

  constructor() {}

  trackByFn(index, item) {
    return item.name;
  }

  getItem(index){
    return this.list[index];
  }

  getA(index){
    return new Date();
  }

}
