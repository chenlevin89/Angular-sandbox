import {Directive, HostListener, ElementRef, OnInit, Output, EventEmitter} from '@angular/core';
import {nativeDecorator} from '../decotators/native.decorator';

@nativeDecorator('click')
@Directive({
  selector: '[appHover]'
})
export class HoverDirective {

  @Output() fusionClickOutside = new EventEmitter();

  constructor(private elementRef: ElementRef) {
  }

  @HostListener('mouseover', ['$event'])
  mouseover(e) {
    console.log('hover');
  }

  @HostListener('document:click', ['$event.target'])
  public onGlobalClick(targetElement) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.fusionClickOutside.emit(targetElement);
    }
  }

}
