import {Component, OnInit, ViewChild, ViewChildren, ContentChildren, QueryList} from '@angular/core';
import {logDecorator} from '../../decotators/logger.decorator';
import {memoDecorator} from '../../decotators/memo.decorator';
import {roundDecorator} from '../../decotators/round.decorator';
import {FormControl, FormBuilder} from '@angular/forms';
import {ListItem} from '../../components/display-list/display-list.entities';
import {ButtonComponentInterface} from '../../components/components.entities';
import {ActivatedRoute, Router, NavigationStart, NavigationEnd} from '@angular/router';
import {filter, tap, map} from 'rxjs/operators';
import {StockService} from 'src/app/services/stock.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-example-two',
  templateUrl: './example-two.component.html',
  styleUrls: ['./example-two.component.scss']
})
export class ExampleTwoComponent implements OnInit {

  formControl: FormControl = new FormControl();
  displayListExample: ListItem[];

  testSubject$ = new BehaviorSubject(true);


  @roundDecorator(2)
  number = 10.2331;

  constructor(
    private activatedRoute: ActivatedRoute,
    private stockService: StockService,
    private fb:  FormBuilder) {}

  ngOnInit() {
    console.log(this.number);
    console.log(this.activatedRoute.snapshot.data);

    this.displayListExample = this.buildListItems();
  }

  @logDecorator
  fibonacci(n: number) {
    return this.calcFibonacci(n);
  }

  public allowLogger() {
    return  true;
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
