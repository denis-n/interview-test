import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import "./styles.css";
import configureStore from "./store";

const store = configureStore();

// Hello!

// Your job is to add Things.

// See Things component and store/index.ts

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
      </div>
    </Provider>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
