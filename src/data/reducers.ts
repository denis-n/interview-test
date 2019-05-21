import { ADD_TODO } from "./types";

const initialState = {};

export default (state = initialState, action: { type: any }) => {
  switch (action.type) {
    case ADD_TODO: {
    }
    default:
      return state;
  }
};
