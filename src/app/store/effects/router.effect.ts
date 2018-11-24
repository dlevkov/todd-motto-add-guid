import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Effect, Actions } from '@ngrx/effects';
import * as RouterActions from '../actions/router.action';

import { tap, map, filter } from 'rxjs/operators';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { GuidService } from '../../guid.service';

@Injectable()
export class RouterEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private guid: GuidService
  ) {}

  @Effect({ dispatch: false })
  navigate$ = this.actions$.ofType(RouterActions.GO).pipe(
    map((action: RouterActions.Go) => action.payload),
    tap(({ path, query: queryParams, extras }) => {
      this.router.navigate(path, { queryParams, ...extras });
    })
  );

  @Effect({ dispatch: false })
  navigateBack$ = this.actions$
    .ofType(RouterActions.BACK)
    .pipe(tap(() => this.location.back()));

  @Effect({ dispatch: false })
  navigateForward$ = this.actions$
    .ofType(RouterActions.FORWARD)
    .pipe(tap(() => this.location.forward()));

  @Effect()
  addGuid$ = this.actions$.ofType(ROUTER_NAVIGATION).pipe(
    filter((x: any) => x.payload),
    filter(x => x.payload.routerState),
    filter(x => x.payload.routerState.queryParams),
    filter(x => x.payload.routerState.queryParams.guid),
    map(x => new RouterActions.Guid(x.payload.routerState.queryParams.guid))
  );

  @Effect()
  resolveGuid$ = this.actions$.ofType(RouterActions.GUID).pipe(
    tap((x: RouterActions.Guid) =>
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { gu: x.payload },
      })
    ),
    map((x: RouterActions.Guid) => {
      return new RouterActions.GuidWithState(
        this.guid.loadStateByGuid(x.payload)
      );
    })
  );
  @Effect({ dispatch: false })
  saveState$ = this.actions$.ofType(RouterActions.STATE).pipe(
    map((x: RouterActions.GuidHasState) => {
      return this.guid.saveState(x.payload);
    }),
    tap((x: string) => {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { gu: x },
      });
    })
  );
}
