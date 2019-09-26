import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import {Row} from '../list/list-entity';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-list-row]',
  templateUrl: './list-row.component.html',
  styleUrls: ['./list-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListRowComponent implements OnInit {

  @Input() row: Row;
  @Output() approveRow = new EventEmitter<Row>();

  constructor() { }

  ngOnInit() {
  }

  approveAction(): void {
    this.approveRow.emit(this.row);
  }

  isLoading(): boolean {
    console.log(this.row);
    return this.row.loading;
  }

}
