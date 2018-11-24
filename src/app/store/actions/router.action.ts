import { Action } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export const GO = '[Router] Go';
export const BACK = '[Router] Back';
export const FORWARD = '[Router] Forward';
export const GUID = '[Router] Guid';
export const GUID_WITH_STATE = '[Router] Guid with state';
export const STATE = '[GUID] Add State';

export class Go implements Action {
  readonly type = GO;
  constructor(
    public payload: {
      path: any[];
      query?: object;
      extras?: NavigationExtras;
    }
  ) {}
}

export class Back implements Action {
  readonly type = BACK;
}

export class Forward implements Action {
  readonly type = FORWARD;
}
export class Guid implements Action {
  readonly type = GUID;
  constructor(public payload: string) {}
}
export class GuidWithState implements Action {
  readonly type = GUID_WITH_STATE;
  constructor(public payload: any) {}
}
export class GuidHasState implements Action {
  readonly type = STATE;
  constructor(public payload: any) {}
}

export type Actions = Go | Back | Forward | Guid | GuidWithState | GuidHasState;
