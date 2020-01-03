import React from 'react';
import {storiesOf} from '@storybook/react';
import README from 'use-bounding-client-rect/README.md';
import {merge} from "utils-array"
const storyName = "utils-array";
import '../style.css';


/**
 * Demo
 */
export const App = () => {
  const arr = merge([...["collection", "hello"], ["test","second-array"]]);
  console.log(arr);
  return <div>
    final string: {arr}
  </div>;
}

/**
 * Config
 */
storiesOf(storyName, module)
.addParameters({
  readme: {
    sidebar: README
  }
})
.add("basic example", () => <App />, {
  info: README
});

