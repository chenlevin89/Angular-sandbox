import { Component, OnInit, HostBinding } from '@angular/core';
import {ButtonComponentInterface} from '../components.entities';

@Component({
  selector: 'app-button-a',
  templateUrl: './button-a.component.html',
  styleUrls: ['./button-a.component.scss']
})
export class ButtonAComponent  implements OnInit, ButtonComponentInterface {
  constructor() { }

  @HostBinding('class.flip') isFlip = false;

  ngOnInit() {
  }

  onSelect(): void {
    this.isFlip = true;
  }

}
