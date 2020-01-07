# @wbe/use-is-in-viewport

This React hook allow to check if a specific ref element is visible in viewport.

![](https://img.shields.io/npm/v/@wbe/use-is-in-viewport/latest.svg)
![](https://img.shields.io/bundlephobia/minzip/@wbe/use-is-in-viewport.svg)
![](https://img.shields.io/david/willybrauner/libraries.svg?path=packages%2Freact-hooks%2Fuse-is-in-viewport)
![](https://img.shields.io/npm/dt/@wbe/use-is-in-viewport.svg)
![](https://img.shields.io/npm/l/@wbe/use-is-in-viewport.svg)

## Installation

```shell script
$ npm install -S @wbe/use-is-in-viewport
```

## How to use

```jsx
// ...
import { useIsInViewport } from "@wbe/use-is-in-viewport;";

// Get element ref
const ref = useRef(null);
// Check if is in viewport (hook return boolean)
const isInViewport = useIsInViewport(ref);

useEffect(() => {
  console.log(isInViewport);
});

return <div ref={ref} />;
```

## Parameters

| params            | type                          | description                                                                          | default value |
| ----------------- | ----------------------------- | ------------------------------------------------------------------------------------ | ------------- |
| pRef              | MutableRefObject<HTMLElement> | element ref                                                                          | /             |
| pToogleVisibility | boolean                       | Repeat the check visibility even if ref element visibility is already passed to true | false         |
| pOffset           | number                        | Define a positive or negative offset to the ref element                              | 0             |

## Returned

Hook return a boolean.
