import {Injectable} from '@angular/core';
import {Subject, Observable, timer} from 'rxjs';
import {UserDetails} from '../components/user-details/user-details';
import {mapTo} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommunicateService {

  private stream = new Subject<UserDetails>();
  public stream$ = this.stream.asObservable();

  constructor(private httpService: HttpClient) {}

  setUserDetails(user: UserDetails) {
    this.stream.next(user);
  }

  getData(): Observable<any> {
   return this.httpService.get('https://jsonplaceholder.typicode.com/todos/1');
  }

}
