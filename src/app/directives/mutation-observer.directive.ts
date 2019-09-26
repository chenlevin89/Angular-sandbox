import {Directive, ElementRef, OnInit, OnDestroy, Output, EventEmitter, Input} from '@angular/core';

export enum MutationObserverOption {
  CLASS = 'class',
  STYLE = 'style'
}

@Directive({
  selector: '[appMutationObserver]'
})
export class MutationObserverDirective implements OnInit, OnDestroy {

  @Input() eventType: MutationObserverOption = MutationObserverOption.STYLE;
  @Output() appMutationObserver = new EventEmitter<any>();

  mutationObserver: MutationObserver;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    const elem = this.elementRef.nativeElement;
    this.mutationObserver = new MutationObserver(this.handleMutationEvent.bind(this));
    this.mutationObserver.observe(elem, {attributes: true, attributeFilter: [this.eventType], childList: false, subtree: false});
  }

  ngOnDestroy() {
    this.mutationObserver.disconnect();
  }

  private handleMutationEvent() {
    this.appMutationObserver.emit(this.elementRef.nativeElement);
  }


}
