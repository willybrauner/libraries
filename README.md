# 📦 Libraries

Libraries is a mono-repos of front-end javascript modules for React and vanilla js.

![GitHub contributors](https://img.shields.io/github/contributors/willybrauner/libraries)

## About

### Features

✅ Javascript modules written with typescript  
✅ Libraries standalone module  
✅ [Storybook documentation](https://willybrauner.github.io/libraries/)

## Summary

Libraries is WIP! [You can check future plan](https://github.com/willybrauner/libraries/wiki).

**react-components**

- [react-grid-layout](packages/react-components/react-grid-layout)
- [react-responsive-image](packages/react-components/react-responsive-image)
- [react-video-player](packages/react-components/react-video-player)

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

**style**

WIP

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

For all those who wish to contribute, feel free to submit a pull request. but please,
do not submit a new module without using the scaffolder tool.

Clone the repos and move to repos folder:

```shell script
$ git clone git@github.com:willybrauner/libraries.git libraries && cd libraries
```

Install all dependencies:

```shell script
$ npm i && lerna bootstrap
```

Scaffold a new module:

```shell script
$ npm run scaffold
```

Module scaffolder will prepare a module file struture ready to use + a dedicated `module.stories.tsx`
in [storybook package](storybook/stories).

## Credits

Libraries is developed and maintained by [Willy Brauner](https://willybrauner.com),
front-end developer at [Cher Ami](https://cher-ami.tv) and as freelance.

## Licence

MIT
