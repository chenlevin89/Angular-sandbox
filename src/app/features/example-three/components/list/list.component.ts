import {Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';
import {Row} from './list-entity';

@Component({
  selector: 'app-list-display',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {

  @Input() rows: Row[];
  @Input() enablePerformance: boolean;
  @Output() approveRow = new EventEmitter<Row>();

  constructor() {}

  ngOnInit() {
  }

  approveAction(row: Row): void {
    this.approveRow.emit(row);
  }

  isLoading(row: Row): boolean {
    console.log(row.id);
    return row.loading;
  }

}
