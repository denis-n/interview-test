export enum ThingActionTypes {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

export interface IThingCreateAction {
  type: ThingActionTypes.CREATE;
  id: string;
  name: string;
}

export interface IThingDeleteAction {
  type: ThingActionTypes.DELETE;
  id: string;
}

export type ThingActions = IThingCreateAction | IThingDeleteAction;

let nextId = 1;

export function create(name: string): ThingActions {
  return {
    type: ThingActionTypes.CREATE,
    id: String(nextId++),
    name,
  };
}

export function remove(id: string): ThingActions {
  return {
    type: ThingActionTypes.DELETE,
    id,
  };
}
