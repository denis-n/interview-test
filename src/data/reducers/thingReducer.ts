import { Reducer } from "redux";

import { ThingActions, ThingActionTypes } from "../actions/ThingActions";
import { IThing } from "../types";

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
    case ThingActionTypes.CREATE: {
      const newThing = { id: action.id, name: action.name, children: [] };

      return {
        ...state,
        things: [newThing, ...state.things],
      };
    }

    case ThingActionTypes.DELETE: {
      return {
        ...state,
        things: state.things.filter((x) => x.id !== action.id),
      };
    }

    default:
      return state;
  }
};
