import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {ComponentB} from "../src"

declare var module: any;
// active HMR
if (module.hot) module.hot.accept();

export const App = () => {
  return (
    <div className="App">
      <ComponentB />
    </div>
  );
};

// Render our app into AppContainer tag
ReactDOM.render(<App />, document.getElementById('AppContainer'));
