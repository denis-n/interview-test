import { IThing } from "../models";

export enum ThingActionTypes {
  GET_ALL = "GET_ALL",
}

export interface IThingGetAllAction {
  type: ThingActionTypes.GET_ALL;
  payload: IThing[];
}

export type ThingActions = IThingGetAllAction;
