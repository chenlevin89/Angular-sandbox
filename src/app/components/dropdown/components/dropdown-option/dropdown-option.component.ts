import {
  Component, OnInit, ChangeDetectionStrategy,
  Input, HostBinding, Type, ViewChild, ViewContainerRef, ComponentFactoryResolver, AfterViewInit
} from '@angular/core';
import {Dropdown} from '../../dropdown-entities';


@Component({
  selector: 'app-dropdown-option',
  templateUrl: './dropdown-option.component.html',
  styleUrls: ['./dropdown-option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownOptionComponent implements OnInit, AfterViewInit {

  @Input() option: Dropdown;
  @Input() type: Type<any>;
  @HostBinding('class.selected') @Input() selected = false;
  @ViewChild('container', { read: ViewContainerRef, static: true }) container: ViewContainerRef;

  constructor(private cfr: ComponentFactoryResolver) {}

  get text(): string {
    return this.option.displayText;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.type) {
      const factory = this.cfr.resolveComponentFactory(this.type);
      const ref = this.container.createComponent(factory);
      Object.keys(this.option).forEach(prop => {
        ref.instance[prop] = this.option[prop];
      });
      ref.changeDetectorRef.detectChanges();
    }
  }


}
