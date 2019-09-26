import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown-icon-item',
  templateUrl: './dropdown-icon-item.component.html',
  styleUrls: ['./dropdown-icon-item.component.scss']
})
export class DropdownIconItemComponent implements OnInit {

  @Input() text: string;

  constructor() { }

  ngOnInit() {
  }

}
