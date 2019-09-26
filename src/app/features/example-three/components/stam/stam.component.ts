import {Component, OnInit, Output, EventEmitter, AfterViewInit} from '@angular/core';


@Component({
  selector: 'app-stam',
  templateUrl: './stam.component.html',
  styleUrls: ['./stam.component.scss']
})
export class StamComponent implements OnInit, AfterViewInit {


  @Output() changedParentColor = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.changedParentColor.emit('red');
  }

}
