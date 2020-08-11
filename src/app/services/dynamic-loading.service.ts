import { Injectable, Component, Type, ViewContainerRef, ComponentFactoryResolver, ComponentRef, EventEmitter, Output, Directive } from '@angular/core';
import {observable, Subscription} from 'rxjs';


@Injectable()
export class DynamicLoadingService {

  private subscription: Subscription[] = [];
  @Output() generalOutput = new EventEmitter<any>();

  constructor(private cfr: ComponentFactoryResolver) {}

  generateComponent({componentType, vcr, inputs}:
    {componentType: Type<any>, vcr: ViewContainerRef, inputs: any}): ComponentRef<Component> {
    const factory = this.cfr.resolveComponentFactory(componentType);
    const componentRef: ComponentRef<Component> = vcr.createComponent(factory);
    Object.keys(inputs).forEach(key => {
      componentRef.instance[key] = inputs[key];
    });

    const outputs = Object.keys(componentRef.instance)
      .filter(key => componentRef.instance[key] instanceof EventEmitter)
      .map(key => ({key, emitter: componentRef.instance[key]}));

    outputs.forEach((emitter => {
      this.subscription.push(emitter.emitter.subscribe(value => {
        this.generalOutput.emit({key: emitter.key, value});
      }));
    }));

    return componentRef;
  }
}
