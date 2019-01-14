import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-display-text',
  templateUrl: './display-text.component.html',
  styleUrls: ['./display-text.component.scss']
})
export class DisplayTextComponent implements OnInit {

  @Input() text: string;
  @Output() textChanged: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  delete(e) {
    this.text = null;
  }

  deleteFromParent() {
    this.textChanged.emit(null);
  }

}
