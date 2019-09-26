import {Component, OnInit, Input, ElementRef, ContentChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-icon',
  template: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" [innerHTML]="loadSvg$ | async" ></svg>`
})
export class IconComponent implements OnInit {
  static cache = {};

  @Input() set name(str: string) {
    this.readFile(str);
  }
  loadSvg$: Observable<SafeHtml>;

  constructor(private http: HttpClient,
    private sanitizer: DomSanitizer) {}

  ngOnInit() {
  }

  private readFile(path) {
    const fullPath = `assets/icons/${path}.svg`;
    this.loadSvg$ =
      IconComponent.cache[path] ? of(IconComponent.cache[path]) :
        this.http.get(fullPath, {responseType: 'text'}).pipe(
          map(response => {
            const parser = new DOMParser();
            const svgElement = parser.parseFromString(response, 'image/svg+xml');
            IconComponent.cache[path] = this.sanitizer.bypassSecurityTrustHtml(svgElement.documentElement.innerHTML);
            return IconComponent.cache[path];
          })
        );
  }

}
