import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {timer, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ExamppleTwoResolver implements Resolve<any> {

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return timer(200).pipe(
            switchMap(_ => of({resolverData: 'resolverData'})
        ));
    }

}
