import { Reducer } from "redux";

import { ThingActions, ThingActionTypes } from "../actions/ThingActions";
import { IChildThing, IThing } from "../types";

export interface IThingState {
  readonly things: IThing[];
  readonly children: IChildThing[];
}

const initialState: IThingState = {
  things: [],
  children: [],
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
        children: state.children.filter((x) => x.parentId !== action.id),
      };
    }

    case ThingActionTypes.CREATE_CHILD: {
      const newChildThing = {
        id: action.id,
        name: action.name,
        parentId: action.parentId,
      };

      return {
        ...state,
        children: [newChildThing, ...state.children],
      };
    }

    case ThingActionTypes.GET_CHILDREN: {
      return {
        ...state,
        things: state.things.map((x) => {
          if (x.id === action.id) {
            x.children = state.children.filter((item) => item.parentId === x.id);
          }

          return x;
        }),
      };
    }

    default:
      return state;
  }
};
