# 📦 Libraries

Libraries is a front-end javascript mono-repo of React and vanilla JS packages.

![](https://img.shields.io/npm/v/@wbe/libraries/latest.svg)
![GitHub contributors](https://img.shields.io/github/contributors/willybrauner/libraries)

## About

### Features

✅ Javascript modules written with [typescript](https://www.typescriptlang.org/)  
✅ Unit tests with [jest](https://jestjs.io/)  
✅ Libraries standalone package

## Summary

Libraries is WIP, [You can check future plan](https://github.com/willybrauner/libraries/wiki).

**react-components**

- [react-grid-layout](packages/react-components/react-grid-layout)
- [react-image](packages/react-components/react-image)
- [react-metas](packages/react-components/react-metas)
- [react-video-player](packages/react-components/react-video-player)
- [react-transition](packages/react-components/react-transition)

**react-hooks**

- [use-async-effect](packages/react-hooks/use-async-effect)
- [use-bounding-client-rect](packages/react-hooks/use-bounding-client-rect)
- [use-did-update](packages/react-hooks/use-did-update)
- [use-document-scroll-top](packages/react-hooks/use-document-scroll-top)
- [use-is-in-viewport](packages/react-hooks/use-is-in-viewport)
- [use-window-size](packages/react-hooks/use-window-size)

**utils**

- [deferred-promise](packages/utils/deferred-promise)
- [fake-data-utils](packages/utils/fake-data-utils)
- [lazy-image](packages/utils/lazy-image)
- [metas-manager](packages/utils/metas-manager)
- [preloads](packages/utils/preloads)

**libraries**

- [libraries](packages/libraries)

## How to use

### Install specific module

Each modules can be imported separately like this:

```shell script
$ npm install -s @wbe/react-image
```

```tsx
import { Image } from "@wbe/react-image";
```

### Install libraries standelone package

All modules are imported in a single one package [libraries](packages/libraries).

```shell script
$ npm install -s @wbe/libraries
```

```tsx
import { Image } from "@wbe/libraries";
```

## Contribute

For all those who wish to contribute, feel free to submit a pull request. You can submit a new module with the scaffolder tool.

Clone the repos and move to repos folder:

```shell script
$ git clone git@github.com:willybrauner/libraries.git libraries && cd libraries
```

Install all dependencies:

```shell script
$ npm i && lerna bootstrap
```

Scaffold a new module (will prepare a ready-made module file structure):

```shell script
$ npm run scaffold
```

## Credits

Libraries is developed and maintained by [Willy Brauner](https://willybrauner.com),
front-end developer at [Cher Ami](https://cher-ami.tv) and as freelance.

## Licence

MIT
