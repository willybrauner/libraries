# 📦 Libraries

Libraries is a front-end javascript mono-repo of React and vanilla JS packages.

![GitHub contributors](https://img.shields.io/github/contributors/willybrauner/libraries)

## About

### Features

✅ Javascript modules written with [typescript](https://www.typescriptlang.org/)  
✅ Unit tests with [jest](https://jestjs.io/)  
✅ Libraries standalone package  
✅ [Storybook documentation](https://willybrauner.github.io/libraries/)

## Summary

Libraries is WIP, [You can check future plan](https://github.com/willybrauner/libraries/wiki).

**react-components**

- [react-grid-layout](packages/react-components/react-grid-layout)
- [react-responsive-image](packages/react-components/react-responsive-image)
- [react-video-player](packages/react-components/react-video-player)
- [react-metas](packages/react-components/react-metas)

**react-hooks**

- [use-async-effect](packages/react-hooks/use-async-effect)
- [use-bounding-client-rect](packages/react-hooks/use-bounding-client-rect)
- [use-did-update](packages/react-hooks/use-did-update)
- [use-document-scroll-top](packages/react-hooks/use-document-scroll-top)
- [use-is-in-viewport](packages/react-hooks/use-is-in-viewport)
- [use-responsive-image-data](packages/react-hooks/use-responsive-image-data)
- [use-window-size](packages/react-hooks/use-window-size)

**utils**

- [fake-data-utils](packages/utils/fake-data-utils)
- [metas-manager](packages/utils/metas-manager)

**libraries**

- [libraries](packages/libraries)

## How to use

### Install specific module

Each modules can be imported separately like this:

```shell script
$ npm install -s @wbe/react-responsive-image
```

```tsx
import ResponsiveImage from "@wbe/react-responsive-image";
```

### Install libraries standelone package

All modules are imported in a single one package [libraries](packages/libraries).

```shell script
$ npm install -s @wbe/libraries
```

```tsx
import { ResponsiveImage } from "@wbe/libraries";
```

## Documentation

All modules documentations are available on
[https://willybrauner.github.io/libraries](https://willybrauner.github.io/libraries)

## Contribute

For all those who wish to contribute, feel free to submit a pull request. You can
submit a new module with the scaffolder tool.

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
