import React from 'react';
import {storiesOf} from '@storybook/react';
import README from 'use-bounding-client-rect/README.md';
import {merge} from "utils-array"
const storyName = "utils-array";
import '../style.css';


/**
 * Demo
 */
export const MergeDemo = () => {
  const arr = merge([...["collection", "hello"], ...["","2de array"]]);
  console.log(arr);
  return <div>
    <h1>array-merge</h1>
    {arr}
  </div>;
}

/**
 * Config
 */
storiesOf(storyName, module)
.addParameters({
  readme: {
    sidebar: README,
    codeTheme: 'GHColors',
  }
})
.add("basic example", () => <MergeDemo />, {
  info: README
});

