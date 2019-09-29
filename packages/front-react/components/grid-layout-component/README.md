# React Grid Layout Component

![npm](https://img.shields.io/npm/v/react-grid-layout-component)

This component allow to display a simple fixed grid layout on front of your react app.

![screen](screen.png)

# Dependencies

- [React (>=16.8)](https://reactjs.org) 
- [@rooks/use-boundingclientrect](https://github.com/imbhargav5/rooks/tree/dev/packages/boundingclientrect) 

# How to use

- Install package:

```shell script
$ yarn add react-grid-layout-component
```
or 
```shell script
$ npm i react-grid-layout-component
```

- Import `<GridLayout />` component on the project root component:

```typescript jsx
import {GridLayout} from 'react-grid-layout-component/lib/GridLayout';

export const AppRoot = () => {
  return (
    <div>
      <GridLayout />
    </div>
  );
};
```

- [GridLayout tsx component](src/GridLayout.tsx) contains default props, you can overwrite as you need:

| props | type | description | default value |
| --- | --- | --- | --- |
| columnsNumber | number | Number of columns | 12 |
| gutterSize | number | size of gutter between columns (px) | 20 |
| showGridByDefault | boolean | Show grid when page is loaded | false |
| color | string | Set custom column Grid | rgba(255, 0, 0, 0.14) |
| maxWidth | number | Set a max width on the container | null |

example:

```typescript jsx
<GridLayout 
  columnsNumber={6} 
  gutterSize={10} 
  showGridByDefault={true}
 />
```
- Press "G key" of your keyboard to toggle Grid visibility.

**NOTE**: If you need to display a simple Grid Line Layout without gutter, set gutterSize props to 0.

# Example

- Clone the repository
- Install dependencies and start dev server with one single command line:

```shell script
$ yarn dev
```

# Credit

© Willy Brauner

# Licence

MIT
