# @wbe/react-responsive-image

react-responsive-image is a React component allowing to display a simple `<img />` tag or
a `<div />` background-image who will set the appropriate thumbnail in src or url attribute,
according to a defined width.

We should never choose how to show an image based on stylistic rendering.
This is why this component makes the same rendering options possible, regardless of the sementic choice;
Tag HTML image or background image.

This component is a wrapper DOM rendering of `@wbe/use-responsive-image-data`.

![](https://img.shields.io/npm/v/@wbe/react-responsive-image/latest.svg)
![](https://img.shields.io/bundlephobia/minzip/@wbe/react-responsive-image.svg)
![](https://img.shields.io/david/willybrauner/libraries.svg?path=packages%2Freact-components%2Freact-responsive-image)
![](https://img.shields.io/npm/dt/@wbe/react-responsive-image.svg)
![](https://img.shields.io/npm/l/@wbe/react-responsive-image.svg)

## Installation

```shell script
$ npm install -s @wbe/react-responsive-image
```

## How to use

Basic usage return a responsive image with `<img />` tag:

```tsx
import ResponsiveImage from "@wbe/react-responsive-image";

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
  return <ResponsiveImage type={EImageType.TAG_IMAGE} data={thumbs} />;
};
```

Will returned this HTML DOM structure:

```html
<img
  class="ResponsiveImage ResponsiveImage-tagImage"
  src="my/image/1.jpg"
  role="img"
/>
```

## Options

### Placeholder

A placeholder can be set behind the image via `placeholder` props. Placeholder
ratio size is calc via image dimensions and allow to define an image wrapper
who take image dimension.

```tsx
<ResponsiveImage type={EImageType.TAG_IMAGE} data={thumbs} placeholder={true} />
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

To set a placeholder, DOM structure need to returned image with additional wrapper.

```html
<div class="ResponsiveImage ResponsiveImage-tagImage ...">
  <!-- wrapper used to set a padding bottom ratio -->
  <div class="ResponsiveImage_wrapper" style="...">
    <img class="ResponsiveImage_image" role="img" src="..." style="..." />
  </div>
</div>
```

Note: if `lazy` props is set, placeholder is automaticaly enable with default transparent
placeholder color.

WARNING: `object-fit: cover` is used to get the same effect than `background-size: cover` for background-image.
Check [can i use](https://caniuse.com/#search=object-fit) compatibility.

### Lazyload

`ResponsiveImage` as lazyload option. A small transparent base64 image will set in `src` util
the image is visible in window.

```tsx
<ResponsiveImage type={EImageType.TAG_IMAGE} data={thumbs} lazy={true} />
```

You can prevent image loading with `lazyOffset` props.
example: -40 allow to preload image when it's top or bottom is to 40 pixels before
or after border window.

```tsx
<ResponsiveImage
  type={EImageType.TAG_IMAGE}
  data={thumbs}
  lazy={true}
  lazyOffset={-40}
/>
```

Before the element is visible in viewport, `ResponsiveImage` will returned:

```html
<div class="ResponsiveImage ResponsiveImage-tagImage ResponsiveImage-lazyload">
  <div class="ResponsiveImage_wrapper">
    <img
      class="ResponsiveImage_image"
      src="data:image/png;base64..."
      role="img"
    />
  </div>
</div>
```

### Ratio

Image ratio is automatically calc via image dimension, but it's possible to force
a custom vertical ratio via `forceVerticalRatio` props.

```tsx
<ResponsiveImage
  type={EImageType.TAG_IMAGE}
  data={thumbs}
  placeholder={true}
  placeholderColor={"#EEE"}
  forceVerticalRatio={1.4}
/>
```

### Tab props

| props (\* non optional) | type          | description                                                                     | default value |
| ----------------------- | ------------- | ------------------------------------------------------------------------------- | ------------- |
| classNames              | string[]      | class list                                                                      | /             |
| **type** \*             | EImageType    | TAG_IMAGE / BACKGROUND_IMAGE                                                    | /             |
| **data** \*             | IImage[]      | image object array                                                              | /             |
| alt                     | string        | image alt attribute                                                             | /             |
| children                | ReactNode     | add children only if type is EImageType.BACKGROUND_IMAGE                        | /             |
| lazy                    | boolean       | active lazyloading                                                              | false         |
| lazyOffset              | number        | load image at X pixel(s) of top/bottom window                                   | 0             |
| lazyCallBack            | boolean       | execute function when image is loaded                                           | /             |
| forceImageWidth         | number        | force to display the image whose size is closest to the value provided in pixel | /             |
| forceVerticalRatio      | number        | force a custom vertical ratio to the image                                      | /             |
| placeholder             | boolean       | show a placeholder behind the image calc with image dimension                   | false         |
| placeholderColor        | string        | set a background color to the placeholder                                       | transparent   |
| rootStyle               | CSSProperties | style first child dom node                                                      | /             |
| imageStyle              | CSSProperties | style image dom node                                                            | /             |
| ariaLabel               | string / null | aria description of element                                                     | /             |
| role                    | string        | role of element                                                                 | img           |
