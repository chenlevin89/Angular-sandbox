import { Directive, TemplateRef, Input } from '@angular/core';

@Directive({
  selector: '[appTab]'
})
export class TabDirective {

  @Input() appTab: string;

  constructor(public templateRef: TemplateRef<any>) { }

}
