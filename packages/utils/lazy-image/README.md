# @wbe/lazy-image

A zero dependency lazy and responsive image management for image and background-image.

![](https://img.shields.io/npm/v/@wbe/lazy-image/latest.svg)
![](https://img.shields.io/bundlephobia/minzip/@wbe/lazy-image.svg)
![](https://img.shields.io/npm/dt/@wbe/lazy-image.svg)
![](https://img.shields.io/npm/l/@wbe/lazy-image.svg)

## Installation

```shell script
$ npm install -s @wbe/lazy-image
```

## lazyImage()

### Lazyload a group of images

Lazy image is build to manage lazyloading and responsive via native srcset.

HTML template:

```html
<img alt="image" data-srcset="img-1.jpg 360w, img-2.jpg 768w" />
<img alt="image-2" data-srcset="img-1-2.jpg 360w, img-2-2.jpg 768w" />
```

```js
import { lazyImage } from "@wbe/lazy-image";

const image = lazyImage();
// start to listen
image.start();
// stop to listen
image.stop();
// update listeners
image.update();
```

When image is appear in viewport, data-srcset value is injected in srcset attribute.

```html
<img
  alt="image"
  class="lazyloaded"
  srcset="img-1.jpg 360w, img-2.jpg 768w"
  data-srcset="img-1.jpg 360w, img-2.jpg 768w"
/>
<!-- ... -->
```

### Lazyload a specific image

`lazyImage()` can lazyload specific image only.

```html
<img alt="image" id="singleImage" srcset="img-360.jpg 360w, img-768.jpg 768w" />
```

```js
const singleImage = lazyImage({
  $element: document.getElementById("singleImage"),
});
```

Or don't specify image srcset in DOM but, directly as function param.

```html
<img alt="image" id="singleImage" />
```

```js
import { lazyImage } from "@wbe/lazy-image";

const singleImage = lazyImage({
  $element: document.getElementById("singleImage"),
  srcset: "img-360.jpg 360w, img-768.jpg 768w",
  // or src: "img-360.jpg",
});
```

### Parameters

All parameters are optional.

| param             | type                       | description                                                                         | default value   |
| ----------------- | -------------------------- | ----------------------------------------------------------------------------------- | --------------- |
| `$root`           | `string`                   | parent DOM element who contains images to lazyload                                  | `document.body` |
| `$element`        | `HTMLElement`              | lazyLoad a specific DOM image element                                               | /               |
| `src`             | `string`                   | if $element is set, define an image src to lazyload                                 | /               |
| `srcset`          | `string`                   | if $element is set, define an image srcset to lazyload                              | /               |
| `lazyCallback`    | `(state)=> void`           | callback executed when lazy state change (`lazyload`, `lazyloading` , `lazyloaded`) | `() => {}`      |
| `observerOptions` | `IntersectionObserverInit` | mutation observer options                                                           | `{}`            |

## lazyBackgroundImage()

`lazyBackgroundImage()` set the appropriate image URL from srcset, in CSS background-image url of specific div.
This appropriate image URL depends of element width.

### Lazyload a group of background-images

```html
<div data-background-srcset="img-1.jpg 360w, img-2.jpg 768w" />
```

```js
import { lazyBackgroundImage } from "@wbe/lazy-image";

const backgroundImage = lazyBackgroundImage();
backgroundImage.start();
```

When DOM element appear in viewport, and element width is less than 360px:

```html
<div
  class="lazyloaded"
  data-background-srcset="img-1.jpg 360w, img-2.jpg 768w"
  style="background-image: url('img-1.jpg')"
/>
```

### Lazyload a specific background-image

`lazyBackgroundImage()` can lazyload specific css image only.

```html
<div id="single" data-background-srcset="img-1.jpg 360w, img-2.jpg 768w" />
```

```js
import { lazyBackgroundImage } from "@wbe/lazy-image";

const singleBackgroundImage = lazyBackgroundImage({
  $element: document.getElementById("single"),
});
// start to listen
singleBackgroundImage.start();
// stop to listen
singleBackgroundImage.stop();
// update listeners
singleBackgroundImage.update();
```

Or don't specify image srcset in DOM but, directly as function param.

```html
<div id="single" />
```

```js
import { lazyBackgroundImage } from "@wbe/lazy-image";

const singleBackgroundImage = lazyBackgroundImage({
  $element: document.getElementById("single"),
  srcset: "img-1.jpg 360w, img-2.jpg 768w",
});
singleBackgroundImage.start();
```

## Parameters

All parameters are optional.

| param             | type                       | description                                                                                                                                                            | default value   |
| ----------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `$root`           | `string`                   | parent DOM element who contains images to lazyload                                                                                                                     | `document.body` |
| `$element`        | `HTMLElement`              | lazyLoad a specific DOM image element                                                                                                                                  | /               |
| `srcset`          | `string`                   | if $element is set, define an image srcset to lazyload                                                                                                                 | /               |
| `additonalUrl`    | `string`                   | add a second css URL behind the first one                                                                                                                              | /               |
| `lazyCallback`    | `(state)=> void`           | callback executed when lazy state change (`lazyload`, `lazyloading` , `lazyloaded`)                                                                                    | `() => {}`      |
| `observerOptions` | `IntersectionObserverInit` | mutation observer options                                                                                                                                              | /               |
| `bigQuality`      | `boolean`                  | will returns 2 steps bigger image (ex: if 360, 768, 1024 img are available, and DOM element width is less than 360, the function will return 768 img instead the 360 ) | `false`         |
