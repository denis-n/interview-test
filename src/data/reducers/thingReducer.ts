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
        things: state.things.map((thing) => {
          if (thing.id === action.parentId) {
            return {
              ...thing,
              children: [newChildThing, ...thing.children],
            };
          }

          return thing;
        }),
        children: [newChildThing, ...state.children],
      };
    }

    case ThingActionTypes.GET_CHILDREN: {
      return {
        ...state,
        things: state.things.map((thing) => {
          if (thing.id === action.id) {
            return {
              ...thing,
              children: state.children.filter(
                (item) => item.parentId === thing.id,
              ),
            };
          }

          return thing;
        }),
      };
    }

    default:
      return state;
  }
};
