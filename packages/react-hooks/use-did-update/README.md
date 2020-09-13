# @wbe/use-did-update

Execute effect only when state or props is updated.

![](https://img.shields.io/npm/v/@wbe/use-did-update/latest.svg)
![](https://img.shields.io/bundlephobia/minzip/@wbe/use-did-update.svg)
![](https://img.shields.io/npm/dt/@wbe/use-did-update.svg)
![](https://img.shields.io/npm/l/@wbe/use-did-update.svg)

## Installation

```shell script
$ npm install -s @wbe/use-did-update
```

## How to use

```js
import UseDidUpdate from "@wbe/use-did-update";
```

## example

```jsx
const App = ({ count }) => {
  useDidUpdate(() => {
    console.log("Will be called only if count props change");
  }, [count]);
};
```

## Parameters / Props

| params       | type      | description                                                              | default value |
| ------------ | --------- | ------------------------------------------------------------------------ | ------------- |
| effect       | ()=> void | effect to execute                                                        | /             |
| dependencies | any[]     | dependencies array of argument(s) allowing to re-suscribre to the effect | /             |

## Returns

void
