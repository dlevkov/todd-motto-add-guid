import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, catchError, switchMap, tap } from 'rxjs/operators';

import * as toppingsActions from '../actions/toppings.action';
import * as fromServices from '../../services/toppings.service';
import * as RouterActions from '../../../app/store/actions/router.action';
@Injectable()
export class ToppingsEffects {
  constructor(
    private actions$: Actions,
    private toppingsService: fromServices.ToppingsService
  ) {}

  @Effect()
  loadToppings$ = this.actions$.ofType(toppingsActions.LOAD_TOPPINGS).pipe(
    switchMap(() => {
      return this.toppingsService.getToppings().pipe(
        map(toppings => new toppingsActions.LoadToppingsSuccess(toppings)),
        catchError(error => of(new toppingsActions.LoadToppingsFail(error)))
      );
    })
  );
  @Effect()
  saveState$ = this.actions$
    .ofType(toppingsActions.VISUALISE_TOPPINGS)
    .pipe(map(x => new RouterActions.GuidHasState(x)));
}
