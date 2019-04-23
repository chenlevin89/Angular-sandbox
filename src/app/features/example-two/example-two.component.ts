import {Component, OnInit, ViewChild, ViewChildren, ContentChildren, QueryList} from '@angular/core';
import {logDecorator} from '../../decotators/logger.decorator';
import {memoDecorator} from '../../decotators/memo.decorator';
import {roundDecorator} from '../../decotators/round.decorator';
import {FormControl} from '@angular/forms';
import {ListItem} from '../../components/display-list/display-list.entities';
import {ButtonComponentInterface} from '../../components/components.entities';

@Component({
  selector: 'app-example-two',
  templateUrl: './example-two.component.html',
  styleUrls: ['./example-two.component.scss']
})
export class ExampleTwoComponent implements OnInit {

  @ContentChildren(ButtonComponentInterface, {read: ButtonComponentInterface}) childrens: QueryList<ButtonComponentInterface>;

  formControl: FormControl = new FormControl();
  displayListExample: ListItem[];

  @roundDecorator(2)
  number = 10.2331;

  constructor() {}

  ngOnInit() {
    console.log(this.number);
    this.displayListExample = this.buildListItems();
  }

  @logDecorator
  fibonacci(n: number) {
    return this.calcFibonacci(n);
  }

  onDBLClick() {
    this.childrens.forEach(child => child.onSelect());
  }

  @memoDecorator
  private calcFibonacci(n: number) {
    return n > 1 ? this.calcFibonacci(n - 1) + this.calcFibonacci(n - 2) : 1;
  }

  private buildListItems(): ListItem[] {
    const reuslt = [];
    for (let i = 1; i < 10; i++) {
      reuslt.push({
        id: i,
        name: `item_${i}`
      });
    }
    return reuslt;
  }

}
