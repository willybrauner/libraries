# @wbe/use-window-size

This React hook allow to get dynamically window dimensions.

![](https://img.shields.io/npm/v/@wbe/use-window-size/latest.svg)
![](https://img.shields.io/bundlephobia/minzip/@wbe/use-window-size.svg)
![](https://img.shields.io/david/willybrauner/libraries.svg?path=packages%2Freact-hooks%2Fuse-window-size)
![](https://img.shields.io/npm/dt/@wbe/use-window-size.svg)
![](https://img.shields.io/npm/l/@wbe/use-window-size.svg)

## Installation

```shell script
$ npm install -S @wbe/use-window-size
```

## How to use

```jsx
// ...
import useWindowSize from "@wbe/use-window-size";

const App = () => {
  // get window size
  const { width, height } = useWindowSize();

  // Resize your browser and check width & height change.
  return (
    <ul>
      <li>window width: {width}</li>
      <li>window height: {height}</li>
    </ul>
  );
};
```

## Returned

The hook return object who contains window dimensions:

```
{
  "width": number,
  "height": number
}
```
