import { applyMiddleware, combineReducers, createStore, Store } from "redux";

import { IThingState, thingReducer } from "../data/reducers/thingReducer";

// Thing has name: string; id: string, children: ChildThing[]
// ChildThing has name: string, id: string

export interface IAppState {
  thingState: IThingState;
}

export default function configureStore(): Store<IAppState, any> {
  const rootReducer = combineReducers<IAppState>({
    thingState: thingReducer,
  });

  const store = createStore(rootReducer, undefined);

  return store;
}
