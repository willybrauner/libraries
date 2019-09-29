import './Main.less';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {GridLayout} from '../src/GridLayout';

declare var module: any;
// active HMR
if (module.hot) module.hot.accept();

export const App = () => {

  return (
    <div className="App">
      <div className="App_wrapper">
        <h1 className="App_title">React Grid Layout Component</h1>
        <p>Just press "G Key" on your keyboard to toggle the grid. 💪</p>
      </div>

      {/*Instance of Grid Layout here*/}
      <GridLayout
        showGridByDefault={true}
        gutterSize={20}
        //maxWidth={1024}
      />
    </div>
  );
};

// Render our app into AppContainer tag
ReactDOM.render(<App />, document.getElementById('AppContainer'));
