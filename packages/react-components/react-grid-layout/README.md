# @wbe/react-grid-layout

This component allow to display a simple fixed grid layout on front of your react app.

![](https://img.shields.io/npm/v/@wbe/react-grid-layout/latest.svg)
![](https://img.shields.io/bundlephobia/minzip/@wbe/react-grid-layout.svg)
![](https://img.shields.io/david/willybrauner/libraries.svg?path=packages%2Freact-components%2Freact-grid-layout)
![](https://img.shields.io/npm/dt/@wbe/react-grid-layout.svg)
![](https://img.shields.io/npm/l/@wbe/react-grid-layout.svg)

![screen](https://i.gyazo.com/c1c179ee4453e2a7d1d62f2a17837f70.png)

## Installation

```shell script
$ npm install -s @wbe/react-grid-layout
```

## How to use

```jsx
import GridLayout from "@wbe/react-grid-layout";

export const App = () => {
  return (
    <div>
      <GridLayout />
    </div>
  );
};
```

## Props

[GridLayout component](src/index.tsx) contains default props, you can overwrite as you need:

| props           | type                 | description                                             | default value           |
| --------------- | -------------------- | ------------------------------------------------------- | ----------------------- |
| `columnsNumber` | `number`             | Number of columns                                       | `12`                    |
| `gutterSize`    | `number/string`      | Size of gutter between columns (`px` as default unit)   | `20`                    |
| `maxSize`       | `number/string/null` | Set a max width on the container (`px` as default unit) | `null`                  |
| `center`        | `boolean`            | Center the grid in viewport                             | `true`                  |
| `orientation`   | `EOrientation`       | Choose grid orientation                                 | `EOrientation.VERTICAL` |
| `color`         | `string`             | Set custom column Grid                                  | `rgba(255, 0, 0, 0.14)` |

example:

```typescript jsx
<GridLayout columnsNumber={6} gutterSize={10} />
```

## Tips

If you need to display a simple Grid Line Layout without gutter, set `gutterSize` props to `0`.
