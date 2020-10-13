# @wbe/react-metas

React component middleware of MetasManager.

![](https://img.shields.io/npm/v/@wbe/react-metas/latest.svg)
![](https://img.shields.io/bundlephobia/minzip/@wbe/react-metas.svg)
![](https://img.shields.io/npm/dt/@wbe/react-metas.svg)
![](https://img.shields.io/npm/l/@wbe/react-metas.svg)

## Installation

```shell script
$ npm install -s @wbe/react-metas
```

## How to use

This component is instanciated in render but don't returns DOM (on the same model as React Helmet).

```js
import Metas from "@wbe/react-metas";

const App = () => {
    return <Metas
      title={"Hello World!"}
      description={"Page description"}
    >
}
```

## Parameters / Props

Parameters are the same than `MetasManager.inject()` method.

| props               | type                | description                                             | default value |
| ------------------- | ------------------- | ------------------------------------------------------- | ------------- |
| `values`            | `TMetaTags<string>` | metas values objects (check MetasManager documentation) | /             |
| `tags`              | `TMetaTags<TTag[]>` | metas tags objects (check MetasManager documentation)   | /             |
| `autoCreateMetaTag` | `boolean`           | auto create meta tag                                    | /             |
| `autoRemoveMetaTag` | `boolean`           | auto remove meta tag                                    | /             |

## Returns

null
