import { Injectable } from '@angular/core';
import { Observable, of, timer, throwError } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { Stock } from '../models/stock.interface';

@Injectable()
export class StockService {

    lastSavedMaxPrice = 0;

    getStockPrice(): Observable<Stock> {
        const rand = parseFloat(Math.random().toFixed(1));
        const price = 10 + rand;
        let isChanged = false;
        if (price > this.lastSavedMaxPrice) {
            this.lastSavedMaxPrice = price === 11 ? 10 : price;
            isChanged = true;
        }
        // return throwError(false); // simulate http error
        return timer(100).pipe(
            flatMap(_ => of({ name: 'stock A', price: this.lastSavedMaxPrice, isChanged }))
        );
    }
}
