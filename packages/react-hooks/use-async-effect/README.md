# @wbe/use-async-effect

Execute effect with promise in React functional component.
This hook is a simple wrapper of `useEffect`.

![](https://img.shields.io/npm/v/@wbe/use-async-effect/latest.svg)
![](https://img.shields.io/bundlephobia/minzip/@wbe/use-async-effect.svg)
![](https://img.shields.io/david/willybrauner/libraries.svg?path=packages%2Freact-hooks%2Fuse-async-effect)
![](https://img.shields.io/npm/dt/@wbe/use-async-effect.svg)
![](https://img.shields.io/npm/l/@wbe/use-async-effect.svg)

## Installation

```shell script
$ npm install -s @wbe/use-async-effect
```

## How to use

### `useAsyncEffect`

```tsx
import { useAsyncEffect } from "@wbe/use-async-effect";

function App() {
  useAsyncEffect(async () => {
    new Promise(resolve =>
        // do something...
        resolve();
    );
  });
}
```

Like `useEffect` from React, `useLayoutEffect` can take dependencies
array as second argument.

```tsx
const [isResolved, setIsResolved] = useState(false);

useAsyncEffect(async () => {
  new Promise(resolve =>
    // do something...
    resolve();
  );
}, [isResolved]);
```

### `useAsyncLayoutEffect`

This is exactly the same effect except `useAsyncLayoutEffect`
is a wrapper of `useLayoutEffect` React hook.

```tsx
import { useAsyncLayoutEffect } from "@wbe/use-async-effect";

function App() {
  useAsyncLayoutEffect(async () => {
    new Promise(resolve =>
        // do something...
        resolve();
    );
  });
}
```

## Parameters

| params  | type      | description                                                              | default value |
| ------- | --------- | ------------------------------------------------------------------------ | ------------- |
| pEffect | ()=> void | function returns effect to execute                                       | /             |
| pInputs | any[]     | dependencies array of argument(s) allowing to re-suscribre to the effect | /             |
