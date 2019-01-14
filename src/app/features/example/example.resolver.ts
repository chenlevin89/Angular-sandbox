import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Stock } from '../../models/stock.interface';
import { Observable, EMPTY } from 'rxjs';
import { StockService } from '../../services/stock.service';
import { catchError } from 'rxjs/operators';


@Injectable()
export class ExampleResolver implements Resolve<Stock> {

    constructor(private stockService: StockService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Stock> {
        return this.stockService.getStockPrice().pipe(
            catchError(err => {
                this.router.navigate(['pageNotFound']);
                return EMPTY;
            })
        );
    }
}
