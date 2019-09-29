import './Main.less';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {EListener, useBoundingClientRect} from '../src/useBoundingClientRect';
import {useRef} from 'react';

declare var module: any;
// active HMR
if (module.hot) module.hot.accept();

/**
 * Main App
 */
export const App = () => {
  // get ref
  const spanRef = useRef(null);
  // get ref rect
  const spanRect = useBoundingClientRect(
    spanRef,
    EListener.ON_SCROLL_AND_RESIZE
  );

  return (
    <div className="App">
      <h1>Use Get Bounding Client Rect</h1>
      <p> Resize your browser and check pink element properties change.</p>
      <span ref={spanRef}>
        {spanRect && (
          <aside>
            <ul>
              {[
                'top',
                'right',
                'bottom',
                'left',
                'height',
                'width',
                'x',
                'y'
              ].map((el, i) => (
                <li key={i}>
                  {el}: <strong>{spanRect[el]}</strong>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </span>
    </div>
  );
};

// Render our app into AppContainer tag
ReactDOM.render(<App />, document.getElementById('AppContainer'));
