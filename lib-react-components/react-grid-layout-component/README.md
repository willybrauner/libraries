# @wb/react-grid-layout-component

This component allow to display a simple fixed grid layout on front of your react app.

![screen](./screen.png)

## Installation

- Install package:

```shell script
$ npm install -S @wb/react-grid-layout-component
```

- Import `<GridLayout />` component on the project root component:

```typescript jsx
import { GridLayout } from "@wb/react-grid-layout-component";

export const App = () => {
  return (
    <div>
      <GridLayout />
    </div>
  );
};
```

- [GridLayout tsx component](src/index.tsx) contains default props, you can overwrite as you need:

| props         | type   | description                         | default value         |
| ------------- | ------ | ----------------------------------- | --------------------- |
| columnsNumber | number | Number of columns                   | 12                    |
| gutterSize    | number | Size of gutter between columns (px) | 20                    |
| color         | string | Set custom column Grid              | rgba(255, 0, 0, 0.14) |
| maxWidth      | number | Set a max width on the container    | null                  |

example:

```typescript jsx
<GridLayout columnsNumber={6} gutterSize={10} />
```

**NOTE**: If you need to display a simple Grid Line Layout without gutter, set gutterSize props to 0.

## Credits

© Willy Brauner

## Licence

MIT
