import { ThingActions, ThingActionTypes } from "../actions/ThingActions";
import { IChildThing, IThing } from "../types";

export interface NormalizedObjects<T> {
  byId: { [id: string]: T };
  allIds: string[];
}

export interface IThingState {
  readonly things: NormalizedObjects<IThing>;
  readonly children: NormalizedObjects<IChildThing>;
}

const initialState: IThingState = {
  things: { byId: {}, allIds: [] },
  children: { byId: {}, allIds: [] },
};

export const thingReducer = (
  state: IThingState = initialState,
  action: ThingActions,
) => {
  switch (action.type) {
    case ThingActionTypes.CREATE: {
      const newThing: IThing = {
        id: action.id,
        name: action.name,
        children: [],
      };

      return {
        ...state,
        things: {
          byId: {
            ...state.things.byId,
            [newThing.id]: newThing,
          },
          allIds: [newThing.id, ...state.things.allIds],
        },
      };
    }

    case ThingActionTypes.DELETE: {
      const {
        [action.id]: thingToDelete,
        ...thingsWithoutDeleted
      } = state.things.byId;

      return {
        ...state,
        things: {
          byId: thingsWithoutDeleted,
          allIds: state.things.allIds.filter((x) => x !== action.id),
        },

        children: {
          ...state.children,
          allIds: state.children.allIds.filter(
            (x) => thingToDelete.children.includes(x) === false,
          ),
        },
      };
    }

    case ThingActionTypes.CREATE_CHILD: {
      const newChildThing: IChildThing = {
        id: action.id,
        name: action.name,
      };

      return {
        ...state,

        things: {
          ...state.things,
          byId: {
            ...state.things.byId,
            [action.parentId]: {
              ...state.things.byId[action.parentId],
              children: [
                newChildThing.id,
                ...state.things.byId[action.parentId].children,
              ],
            },
          },
        },

        children: {
          byId: {
            ...state.children.byId,
            [newChildThing.id]: newChildThing,
          },
          allIds: [newChildThing.id, ...state.children.allIds],
        },
      };
    }

    default:
      return state;
  }
};
