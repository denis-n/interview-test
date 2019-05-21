import { applyMiddleware, combineReducers, createStore, Store } from "redux";

//Thing has name: string; id: string, children: ChildThing[]
//ChildThing has name: string, id: string

export interface IAppState {
  things: IThing[];
}

export default function configureStore(): Store<IAppState, any> {
  const reducers = {
    thingReducer: ThingReducer
  };

  const rootReducer = combineReducers<IAppState>({
    ...reducers
  });

  const store = createStore(rootReducer, undefined);

  return store;
}
