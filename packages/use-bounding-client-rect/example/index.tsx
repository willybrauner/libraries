import './index.less';
import * as React from 'react';
import {useEffect, useRef} from 'react';
import * as ReactDOM from 'react-dom';
import {EListener} from "../dist/useBoundingclientRect"
import useBoundingclientRect from "../dist/"


declare var module: any;
// active HMR
if (module.hot) module.hot.accept();

const clientRect = [
  'top',
  'right',
  'bottom',
  'left',
  'height',
  'width',
  'x',
  'y'
];

/**
 * Main App
 */
export const App = () => {
  // get ref
  const spanRef = useRef([]) as any;
  // get ref rect
  const spanRect = useBoundingclientRect(
    spanRef,
    EListener.ON_SCROLL_AND_RESIZE
  ) as any;

  // log span rect
  useEffect(() => {
    console.log('spanRect > ', spanRect);
  }, [spanRect]);

  return (
    <div className="App">
      <h1>Use Get Bounding Client Rect</h1>
      <p> Resize your browser and check pink element properties change.</p>
      <span ref={spanRef}>
        {spanRect && (
          <div>
            <ul>
              {clientRect.map((el, i) => (
                <li key={i}>
                  {el}: <strong>{spanRect[el]}</strong>
                </li>
              ))}
            </ul>
          </div>
        )}
      </span>
    </div>
  );
};

// Render our app into AppContainer tag
ReactDOM.render(<App />, document.getElementById('AppContainer'));
