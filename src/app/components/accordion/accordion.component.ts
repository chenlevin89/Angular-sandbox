import { Component, OnInit, Input, TemplateRef, ViewChild, ViewContainerRef, EmbeddedViewRef } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {

  @Input() header: string;
  @Input() tempRef: TemplateRef<any>;

  @ViewChild('container', {read: ViewContainerRef }) container: ViewContainerRef;

  _toggle = false;
  get toggle() {
    return this._toggle;
  }
  set toggle(value: boolean) {
    this._toggle = value;
    value ? this.addTemplateRef() : this.removeElementRef();
  }

  embededViewRef: EmbeddedViewRef<any>;

  constructor() { }

  ngOnInit() {
  }

  private addTemplateRef() {
    this.embededViewRef = this.container.createEmbeddedView(this.tempRef);
  }

  private removeElementRef() {
    this.container.clear();
  }

}
