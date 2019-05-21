import * as React from "react";
import { render } from "react-dom";

import "./styles.css";

// Hello!

// Your job is to add Things.

// See Things component and store/index.ts

function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
