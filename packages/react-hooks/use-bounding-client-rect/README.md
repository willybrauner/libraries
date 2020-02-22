# @wbe/use-bounding-client-rect

This React hook allow to get dynamically `getBoundClientRect` of any React Ref.

![](https://img.shields.io/npm/v/@wbe/use-bounding-client-rect/latest.svg)
![](https://img.shields.io/bundlephobia/minzip/@wbe/use-bounding-client-rect.svg)
![](https://img.shields.io/david/willybrauner/libraries.svg?path=packages%2Freact-hooks%2Fuse-bounding-client-rect)
![](https://img.shields.io/npm/dt/@wbe/use-bounding-client-rect.svg)
![](https://img.shields.io/npm/l/@wbe/use-bounding-client-rect.svg)

## Installation

```shell script
$ npm install -s @wbe/use-bounding-client-rect
```

## How to use

Basic usage:

```jsx
// ...
import useBoundingClientRect from "@wbe/use-window-size";

const App = () => {
  // get ref
  const rootRef = useRef();
  // get window size
  const refRect = useBoundingClientRect(rootRef);

  return (
    <div ref={rootRef}>
      {refRect.x}, {refRect.y} ...
    </div>
  );
};
```

## Parameters

| params    | type                          | description      | default value     |
| --------- | ----------------------------- | ---------------- | ----------------- |
| pRef      | MutableRefObject<HTMLElement> | element ref      | /                 |
| pListener | EListener                     | kind of listener | EListener.ON_INIT |

pListener options are:

- `ON_INIT`: listen rect only on init
- `ON_SCROLL`: listen rect on init + scroll
- `ON_RESIZE`: listen rect on init + resize
- `ON_SCROLL_AND_RESIZE`: listen rect on init + scroll + resize

## Returned

The hook return an object (ClientRect interface):

```
{
  "x": number,
  "y": number,
  "width": number,
  "height": number,
  "top": number,
  "right": number,
  "bottom": number,
  "left": number
}
```
