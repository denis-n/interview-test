import { Reducer } from "redux";

import { ThingActions } from "../actions/ThingActions";
import { IThing } from "../models";

export interface IThingState {
  readonly things: IThing[];
}

const initialState: IThingState = {
  things: [],
};

export const thingReducer: Reducer<IThingState, ThingActions> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    default:
      return state;
  }
};
