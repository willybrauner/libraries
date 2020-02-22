# @wbe/use-responsive-image-data

This hook allow to get image object whose width is closest to the value provided in px.

![](https://img.shields.io/npm/v/@wbe/use-responsive-image-data/latest.svg)
![](https://img.shields.io/bundlephobia/minzip/@wbe/use-responsive-image-data.svg)
![](https://img.shields.io/david/willybrauner/libraries.svg?path=packages%2Freact-hooks%2Fuse-responsive-image-data)
![](https://img.shields.io/npm/dt/@wbe/use-responsive-image-data.svg)
![](https://img.shields.io/npm/l/@wbe/use-responsive-image-data.svg)

## Installation

```shell script
$ npm install -s @wbe/use-responsive-image-data
```

## How to use

Basic usage:

```jsx
import useResponsiveImageData, { IImage } from "@wbe/use-responsive-image-data";

const thumbs: IImage[] = [
  {
    url: "my/image/1.jpg",
    width: 640,
    height: 480
  },
  {
    url: "my/image/2.jpg",
    width: 1024,
    height: 800
  }
];

const App = () => {
  // will return the first object of thumbs array
  // (640 is the up closest to 500)
  const responsiveImageData: IImage = useResponsiveImageData(thumbs, 500);

  // ...
};
```

## Parameters

pImages: IImage[], pWidth?: number

| params  | type     | description                        | default value |
| ------- | -------- | ---------------------------------- | ------------- |
| pImages | IImage[] | array of image object              | /             |
| pWidth  | number   | with limit of image object we need | null          |

- pWidth: if value is not set, dynamic window width will be set as width reference.

## Returned

The hook return an IImage object:

```
{
  "url": number,
  "width": number,
  "height": number
}
```
