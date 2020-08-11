import {Component, OnInit, Input, ChangeDetectionStrategy, HostListener, SimpleChanges, HostBinding} from '@angular/core';
import {EvnetsService} from '../../../services/evnets.service';
import {Observable} from 'rxjs';

@Component({
  selector: '[app-table-item]',
  templateUrl: './table-item.component.html',
  styleUrls: ['./table-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableItemComponent implements OnInit {

  @Input() item;

  observable$: Observable<any>;


  constructor(private eventService: EvnetsService) {}

  ngOnInit() {
    this.observable$ = this.eventService.event$.asObservable();
  }

  get name() {
    console.log(this.item);
    return this.item.name;
  }

}
