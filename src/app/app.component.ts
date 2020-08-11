import {Component, OnInit, NgZone, ChangeDetectionStrategy} from '@angular/core';
import {UserDetails} from './components/user-details/user-details';
import {CommunicateService} from './services/communicate.service';
import {BehaviorSubject, Subject} from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  myFunc(){
    console.log('trigger');
  }
}
