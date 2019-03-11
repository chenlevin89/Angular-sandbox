import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {

  trackByList: any[];
  trackByToggle = false;

  searchList: {id: number, name: string}[];

  constructor() {}

  ngOnInit() {
    this.trackByList = this.buildTrackByArray();
    this.searchList = this.buildSearchList();
  }

  /*
  Track by section
  */

  onClick(current: any, index: number) {
    const latter = current.name.split('_')[0];
    const newInstance = {...current, name: `${this.nextLetter(latter)}_${index}`};
    const indexObj = {};
    indexObj[index] = newInstance;
    this.trackByList = Object.assign([], this.buildTrackByArray(), indexObj);
  }

  trackByFunc() {
    return this.trackBy.bind(this);
  }

  private trackBy(index, item) {
    return this.trackByToggle ? item.id : item;
  }

  private buildTrackByArray(): any[] {
    const array = [];
    for (let index = 0; index < 3000; index++) {
      array.push({
        id: index,
        name: `A_${index}`,
        salary: (index * 10) % 14
      });
    }
    return array;
  }

  private nextLetter(s) {
    return s.replace(/([a-zA-Z])[^a-zA-Z]*$/, function (a) {
      let c = a.charCodeAt(0);
      switch (c) {
        case 90: return 'A';
        case 122: return 'a';
        default: return String.fromCharCode(++c);
      }
    });
  }

  /*
  Search list
  */

  private buildSearchList(): {id: number, name: string}[] {
    const names = ['dan', 'shai', 'gal', 'niv', 'tomer', 'bar', 'ori', 'chen', 'andy', 'yoval'];
    const array = [];
    for (let index = 0; index < 3000; index++) {
      const name = names[index % names.length];
      array.push({
        id: index,
        name: `${name}_${index}`
      });
    }
    return array;
  }

}
