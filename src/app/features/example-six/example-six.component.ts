import {Component, OnInit, ChangeDetectionStrategy, NgZone, OnDestroy} from '@angular/core';
import {Subject, BehaviorSubject, of, Observable} from 'rxjs';
import {PollingService} from '../../services/polling.service';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';


@Component({
  selector: 'app-example-six',
  templateUrl: './example-six.component.html',
  styleUrls: ['./example-six.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleSixComponent implements OnInit, OnDestroy {

  name$ = new BehaviorSubject<string>('chen');
  curr = 8;
  display = false;

  form: FormGroup;

  private onDestroy$ = new Subject<void>();


  constructor(
    private pollingService: PollingService,
    private httpClient: HttpClient,
    private router: Router,
    private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      type: [],
      iosType: []
    });


    this.form.get('type').valueChanges.subscribe(value => {
      value === 1 ? this.form.get('iosType').setValidators([]) : this.form.get('iosType').setValidators([Validators.required]);
      this.form.get('iosType').updateValueAndValidity({emitEvent:false});
    })

    this.form.valueChanges.subscribe(console.log);

    this.form.patchValue({
      type:2,
      iosType: 'asd'
    });



  }

  ngOnDestroy(){
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  onClick() {
    this.pollingService.poolingOutsideZone({
      maxNumberOfIntervals: 5,
      delayTime: 1000,
      mapToFunction: this.getItem(1),
      stopCondition: this.stopCondition.bind(this),
      takUntil$: this.onDestroy$,
      callback: this.callBack.bind(this)
    });
  }

  navigate(){
    this.router.navigate(['example-five']);
  }

  private getItem(id): () => Observable<any> {
    return () => this.httpClient.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
  }

  private stopCondition(value): boolean {
    this.curr--;
    return value.id === this.curr;
  }

  private callBack(value){
    console.log(value);
  }

}
