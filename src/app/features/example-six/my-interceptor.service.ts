import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class MyInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    console.log('Http interceptor');
    return next.handle(req);
  }
}
