import {Component, OnInit} from '@angular/core';
import {PaginationListService} from './pagination-list.service';
import {Observable, BehaviorSubject, merge} from 'rxjs';
import {skip, switchMap, map, tap, } from 'rxjs/operators';

@Component({
  selector: 'app-pagination-list',
  templateUrl: './pagination-list.component.html',
  styleUrls: ['./pagination-list.component.scss']
})
export class PaginationListComponent implements OnInit {

  pageIndex$ = new BehaviorSubject<number>(1);
  posts$: Observable<any[]>;
  posts: any[] = [];
  loader = true;

  constructor(private service: PaginationListService) {}

  ngOnInit() {
    const initalizeComments$ = this.service.getData();
    const paginationComments$ = this.buildPaginationObservable();
    this.posts$ = this.buildPostsObservable(initalizeComments$, paginationComments$);
  }

  loadNextPage() {
    this.loader = true;
    this.pageIndex$.next(this.pageIndex$.value + 1);
  }

  onScroll(event) {
    const element = event.currentTarget;
    if (element.scrollHeight - element.scrollTop <= element.clientHeight + 10) {
      this.loadNextPage();
    }
  }

  private buildPaginationObservable() {
    return this.pageIndex$.pipe(
      skip(1),
      switchMap(value => this.service.getData(value))
    );
  }

  private buildPostsObservable(first$, second$) {
    return merge(first$, second$)
      .pipe(
        tap((value: any[]) => {
          this.posts.push(...value),
          this.loader = false;
        }),
        map(_ => this.posts)
      );
  }

}
