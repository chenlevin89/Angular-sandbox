import {Component, Input, OnInit, OnChanges, AfterViewInit, OnDestroy, SimpleChanges} from '@angular/core';
import {UserDetails} from './user-details';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {

  @Input() userDetails: UserDetails;

  ngOnChanges(changes: SimpleChanges): void {
    console.log('One or more input params has changed', changes);
  }

  ngOnInit(): void {
    console.log('Component initialize, Template still not available');
  }

  ngAfterViewInit(): void {
    console.log('After template initialize');
  }

  ngOnDestroy(): void {
    console.log('Component destroyed');
  }

}
