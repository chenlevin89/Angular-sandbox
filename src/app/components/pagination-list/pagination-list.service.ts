import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {delay} from 'rxjs/operators';


const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

@Injectable({
    providedIn: 'root'
})
export class PaginationListService {

    constructor(private http: HttpClient) {}

    getData(pageIndex = 1) {
        return this.http.get<any[]>(BASE_URL).pipe(
            delay(2000)
        );
    }

}
