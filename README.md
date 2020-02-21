# Libraries

Libraries is a mono-repos of front-end javascript modules.

![Travis (.org)](https://img.shields.io/travis/willybrauner/libraries)
![GitHub contributors](https://img.shields.io/github/contributors/willybrauner/libraries)

## Features

✅ javascript modules write with typescript  
✅ libraries standalone module  
✅ storybook documentation

## Summary

Libraries is WIP! [You can check futur plan](https://github.com/willybrauner/libraries/wiki).

**react-components**

- [react-grid-layout](packages/react-components/react-grid-layout)
- [react-responsive-image](packages/react-components/react-responsive-image)

**react-hooks**

- [use-bounding-client-rect](packages/react-hooks/use-bounding-client-rect)
- [use-is-in-viewport](packages/react-hooks/use-is-in-viewport)
- [use-responsive-image-data](packages/react-hooks/use-responsive-image-data)
- [use-window-size](packages/react-hooks/use-window-size)

**utils**

- [fake-data-utils](packages/utils/fake-data-utils)

**libraries**

- [libraries](packages/libraries)

**style**

- WIP

## How to use

### Install specific module

Each modules can be imported separately like this:

```shell script
$ npm install -s @wbe/react-responsive-image
```

### Install libraries standelone package

All modules are imported in a single one package [libraries](packages/libraries).

```shell script
$ npm install -s @wbe/libraries
```

## Documentation

All modules documentations are available on
[libraries.willybrauner.com](http://libraries.willybrauner.com)

## Contribute

For all those who wish to contribute, feel free to submit a pull request. but please,
do not submit a new module without using the scaffolder tool.

Install lerna:

```shell script
npx lerna init
```

Install all dependencies:

```shell script
$ lerna bootstrap
```

Scaffold a new module:

```shell script
$ npm run scaffold
```

Each module has got his own module folder and his dedicated `module.stories.tsx`
in [storybook package](packages/storybook/stories).

### About

#### For who

This project is addressed to developers, independants, agencies who like worked
with React and Typescript.

## Credits

This project is developed and maintained by [Willy Brauner](http://willybrauner.com),
front-end developer at [Cher Ami](https://cher-ami.tv) and as freelance.

## Licence

MIT
