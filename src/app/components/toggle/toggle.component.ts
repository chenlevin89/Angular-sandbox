import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';


@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent implements OnInit {

  @Input() toggle = false;
  @Output() toggleChange = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {
  }

  onClick(e: MouseEvent) {
    this.toggleChange.emit(!this.toggle);
    e.stopPropagation();
  }

}
