import {Action} from "@ngrx/store";

export const SET_ACCESS_TOKEN = '[AUTHENTICATION] SET_ACCESS_TOKEN';
export const REMOVE_ACCESS_TOKEN = '[AUTHENTICATION] REMOVE_ACCESS_TOKEN';

export class SetAccessToken implements Action {
  readonly type = SET_ACCESS_TOKEN;

  constructor(public payload: string) {}
}

// Not passing any data so no need constructor
export class RemoveAccessToken implements Action {
  readonly type = REMOVE_ACCESS_TOKEN;

}

export type Actions = SetAccessToken | RemoveAccessToken

