export enum ThingActionTypes {
  CREATE = "CREATE",
  DELETE = "DELETE",
  CREATE_CHILD = "CREATE_CHILD",
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

export interface IThingCreateChildAction {
  type: ThingActionTypes.CREATE_CHILD;
  parentId: string;
  id: string;
  name: string;
}

export type ThingActions =
  | IThingCreateAction
  | IThingDeleteAction
  | IThingCreateChildAction;

let nextThingId = 1;
let nextChildThingId = 1;

export function create(name: string): ThingActions {
  return {
    type: ThingActionTypes.CREATE,
    id: String(nextThingId++),
    name,
  };
}

export function remove(id: string): ThingActions {
  return {
    type: ThingActionTypes.DELETE,
    id,
  };
}

export function createChild(parentId: string, name: string): ThingActions {
  return {
    type: ThingActionTypes.CREATE_CHILD,
    parentId,
    id: String(nextChildThingId++),
    name,
  };
}
