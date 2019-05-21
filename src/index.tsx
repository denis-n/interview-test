import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import Things from "./components/Things";
import configureStore from "./store";
import "./styles.css";

const store = configureStore();

// Hello!

// Your job is to add Things.

// See Things component and store/index.ts

function App() {
  return (
    <Provider store={store}>
      <Things />
    </Provider>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
