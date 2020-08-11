import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvnetsService {

  constructor() { }

  public event$ = new BehaviorSubject<any>(null);
}
