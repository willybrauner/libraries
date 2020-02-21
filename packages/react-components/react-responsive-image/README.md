# @wbe/react-responsive-image

react-responsive-image is a React component allowing to display a simple `<img />` tag or
a `<div>` background-image who gonna use the appropriate thumb in src or url.
This component is a wrapper of `@wbe/use-responsive-image-data`.

![](https://img.shields.io/npm/v/@wbe/react-responsive-image/latest.svg)
![](https://img.shields.io/bundlephobia/minzip/@wbe/react-responsive-image.svg)
![](https://img.shields.io/david/willybrauner/libraries.svg?path=packages%2Freact-components%2Freact-responsive-image)
![](https://img.shields.io/npm/dt/@wbe/react-responsive-image.svg)
![](https://img.shields.io/npm/l/@wbe/react-responsive-image.svg)

## Installation

```shell script
$ npm install @wbe/react-responsive-image
```

## How to use

Basic usage return a responsive image with `<img />` tag:

```tsx
import { reactResponsiveImage } from "@wbe/react-responsive-image";

const thumbs = [
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
  return <ResponsiveImage type={EImageType.IMAGE_TAG} data={thumbs} />;
};
```

## Props

### Lazyload

Active lazyload option:

```tsx
<ResponsiveImage type={EImageType.IMAGE_TAG} data={thumbs} lazy={true} />
```

Set a `lazyOffset` props.
example: -40 allow to preload image when it's top or bottom is to 40px before
or after border window.

```tsx
<ResponsiveImage
  type={EImageType.IMAGE_TAG}
  data={thumbs}
  lazy={true}
  lazyOffset={-40}
/>
```

### Placeholder

A placeholder can be set behind the image via `placeholder` props. Placeholder
ratio size is calc via image dimensions and allow to define an image wrapper
who take image dimension.

```tsx
<ResponsiveImage type={EImageType.IMAGE_TAG} data={thumbs} placeholder={true} />
```

A background-color can be set to this placeholder via `placeholderColor` props.

```tsx
<ResponsiveImage
  type={EImageType.IMAGE_TAG}
  data={thumbs}
  placeholder={true}
  placeholderColor={"#EEE"}
/>
```

Note: if `lazy` props is set, placeholder is automaticaly enable with default transparent
placeholderColor.

### Ratio

Image ratio is automatically calc via image dimension ; But it's possible to force
a custom vertical ratio via `forceVerticalRatio` props.

```tsx
<ResponsiveImage
  type={EImageType.IMAGE_TAG}
  data={thumbs}
  placeholder={true}
  placeholderColor={"#EEE"}
  forceVerticalRatio={1.4}
/>
```

### Tab props

| props              | type          | description                                                                  | default value |
| ------------------ | ------------- | ---------------------------------------------------------------------------- | ------------- |
| classNames         | string[]      | class list                                                                   | /             |
| type               | EImageType    | IMAGE_TAG or BACKGROUND_IMAGE                                                | /             |
| data               | IImage[]      | array of image object                                                        | /             |
| alt                | string        | image alt                                                                    | /             |
| children           | ReactNode     | add children only if type is EImageType.BACKGROUND_IMAGE                     | /             |
| lazy               | boolean       | active lazyloading                                                           | false         |
| lazyOffset         | number        | load image at X px of top/bottom window                                      | 0             |
| forceImageWidth    | number        | Force to display the image whose size is closest to the value provided in px | /             |
| forceVerticalRatio | number        | force a custom vertical ratio to the image                                   | /             |
| placeholder        | boolean       | show a placeholder behind the image calc with image dimension                | false         |
| placeholderColor   | string        | set a background color to the placeholder                                    | transparent   |
| backgroundPosition | number[]      | set a background position `[x, y]`                                           | /             |
| rootStyle          | CSSProperties | style first child                                                            | /             |
| imageStyle         | CSSProperties | style image node                                                             | /             |

## returned
