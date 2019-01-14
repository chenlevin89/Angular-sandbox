import { Directive, Input, OnInit, EmbeddedViewRef, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appCarousel]'
})
export class CarouselDirective implements OnInit {

  @Input() appCarouselOf: any[];

  embededVireRef: EmbeddedViewRef<any>;
  currentIndex = 0;

  constructor(private templateRef: TemplateRef<any>,
    private containerRef: ViewContainerRef) { }


  ngOnInit(): void {
    if (!this.appCarouselOf || this.appCarouselOf.length === 0) {
      return;
    }
    this.embededVireRef = this.containerRef.createEmbeddedView(this.templateRef, {
      $implicit: this.appCarouselOf[this.currentIndex],
      controller: {
        next: () => this.next(),
        previous: () => this.previous()
      }
    });
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.appCarouselOf.length;
    this.setEmbededView();
  }

  previous() {
    const index = this.currentIndex - 1;
    this.currentIndex = index === -1 ? this.appCarouselOf.length - 1 : index;
    this.setEmbededView();
  }

  private setEmbededView() {
    this.embededVireRef.context.$implicit = this.appCarouselOf[this.currentIndex];
  }

}
