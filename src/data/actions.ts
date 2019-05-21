import { ADD_TODO } from "./types";

export function addTodo(text) {
  return { type: ADD_TODO, text };
}
