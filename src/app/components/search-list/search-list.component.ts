import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {

  @Input() set list(value: {id: number, name: string}[]) {
    this.sourceList = value;
    this.displayList = [...value];
  }

  private sourceList: {id: number, name: string}[];

  displayList: {id: number, name: string}[];

  constructor() {}

  ngOnInit() {
  }

  onSearchChanged(search: string) {
    if (!search || search === '') {
      this.displayList = this.sourceList;
      return;
    }
    this.displayList = this.sourceList.filter(item => item.name.indexOf(search) !== -1);
  }

}
