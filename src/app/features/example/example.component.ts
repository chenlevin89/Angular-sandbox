import {Component, OnInit, NgZone, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {mustIncludeValidator} from 'src/app/directives/must-include.validator';
import {Subject, BehaviorSubject, Observable} from 'rxjs';
import {Address} from '../../models/address.interface';
import {Repeated} from '../../models/repeated.interface';
import {Stock} from 'src/app/models/stock.interface';
import {StockService} from 'src/app/services/stock.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Person} from 'src/app/models/person.interface';
import {tap, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit, OnDestroy {

  viewProvidersExample: FormGroup;
  asSyntaxExample$: BehaviorSubject<Address>;
  asSyntaxObservableExaple$: Observable<Address>;
  genericPipeExample: Repeated;
  runOutsideAngularExample: Stock;
  manipulateInputExample: FormGroup;
  inputAsInterfaceExample: Person;
  structuralDirectiveExample: string[];
  onComponentDestroy$: Subject<any> = new Subject();


  constructor(private fb: FormBuilder,
    private stockService: StockService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.viewProvidersExample = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, [Validators.required, mustIncludeValidator('abc')]]
    });

    this.asSyntaxExample$ = new BehaviorSubject<Address>({city: 'Rishon Le Zion', country: 'Israel', zipCode: 711223});
    this.asSyntaxObservableExaple$ = this.asSyntaxExample$.asObservable().pipe(tap(val => console.log(val)));

    this.genericPipeExample = {str: 'generic pipe ', repeat: 3};

    this.pullStockData();

    this.activatedRoute.data.pipe(takeUntil(this.onComponentDestroy$))
      .subscribe(data => {
        this.runOutsideAngularExample = data.stock;
      });

    this.manipulateInputExample = this.fb.group({
      text: ['abc', Validators.required]
    });

    this.inputAsInterfaceExample = {firstName: 'Chen', lastName: 'Levin', age: 30};

    this.structuralDirectiveExample = ['img1', 'img2', 'im3'];
  }

  ngOnDestroy() {
    this.onComponentDestroy$.next();
    this.onComponentDestroy$.complete();
  }

  reapetString(repeted: Repeated) {
    return repeted.str.repeat(repeted.repeat);
  }

  pullStockData() {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        this.stockService.getStockPrice().subscribe(val => {
          if (val.isChanged) {
            this.runOutsideAngularExample = val;
            this.cdr.detectChanges();
          }
        });
      }, 2000);
    });

  }

  renamePerson(person: Person) {
    this.inputAsInterfaceExample = person;
  }

  redirect() {
    this.router.navigate(['example-two'], {state: {stateData: 'stateData'}});
  }


}
