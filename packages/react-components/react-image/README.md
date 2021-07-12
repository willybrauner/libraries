# @wbe/react-image

React image component with lazyloading management.

![](https://img.shields.io/npm/v/@wbe/react-image/latest.svg)
![](https://img.shields.io/bundlephobia/minzip/@wbe/react-image.svg)
![](https://img.shields.io/npm/dt/@wbe/react-image.svg)
![](https://img.shields.io/npm/l/@wbe/react-image.svg)

## Installation

```shell script
$ npm install -s @wbe/react-image
```

## `<Image />` component

```js
import { Image } from "@wbe/react-image";
```

### `src` props

Be sure you set appropriated css image width and height.

```js
<Image src={`https://image-url`} alt={"src image"} />
```

Will return this HTML before lazyload:

```html
<img
  class="Image lazyload"
  alt="src image"
  src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
  data-src="https://image-url"
/>
```

and after lazyload:

```html
<img
  class="Image lazyloaded"
  alt="src image"
  src="https://image-url"
  data-src="https://image-url"
/>
```

### `srcset` props

```js
<Image
  srcset={`https://image-url 360w, https://image-url-2 768w`}
  alt={"srcset image"}
/>
```

### `data` props

Will generate an appropriated srcset string.

```js
const data = [
  {
    url: "https://url",
    width: 600,
    height: 400,
  },
  {
    url: "https://url-2",
    width: 1000,
    height: 800,
  },
];

<Image data={data} alt={"srcset image"} />;
```

### `srcPlaceholder` props

Allow to display specific low quality image before lazyloading src image.

```js
<Image
  srcPlaceholder={`https://low-quality-image-url`}
  src={`https://image-url`}
  alt={""}
/>
```

### Props list

```ts
interface IProps {
  // image to display before lazyload
  // default is lightest base64 transparent image
  srcPlaceholder?: string;

  // src URL to lazyload
  src?: string;

  // srcset URL to lazyload
  srcset?: string;

  // list of images with dimension used to build srcset attr
  data?: TImageData[];

  // callback when lazyload state change (lazyload | lazyloading | lazyloaded)
  lazyCallback?: (lazyState: TLazy) => void;

  // intersection observer options
  observerOptions?: IntersectionObserverInit;

  // alt attr and aria html
  alt: string;
  ariaLabel?: string;

  // class name added on root element
  className?: string;

  // style attrs
  style?: CSSProperties;
  width?: number | string;
  height?: number | string;
}
```

## `<BackgroundImage />`

Works this the same API than `<Image />` component.

Before lazyload:

```html
<div
  class="BackgroundImage lazyload"
  style="background-image: url('data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==')"
  data-background-srcset="img-1.jpg 360w, img-2.jpg 768w"
/>
```

After lazyload:

```html
<div
  class="BackgroundImage lazyloaded"
  style="background-image: url('img-1.jpg')"
  data-background-srcset="img-1.jpg 360w, img-2.jpg 768w"
/>
```

## `<Placeholder />` wrapper component

Image component comes with `<Placeholder />` parent component
used to display a placeholder behind Image. This process is particulary useful
when image is lazyloading. It allows to not preload all 1px height images in pages
on page load but really waiting the image was shown in viewport to lazyload it.

Example with `<Image />`:

```js
<Placeholder>
    <Image
      src={`https://image-url`}
      width={600}
      height={400}
      alt={"with placeholder"}
    />
<Placeholder/>
```

Example with `<BackgroundImage />`:

```js
<Placeholder>
    <BackgroundImage
      src={`https://image-url`}
      // or srcset={`https://image-url 360w, https://image-url 768w`}
      width={600}
      height={400}
      alt={"with placeholder"}
    />
<Placeholder/>
```

`<Placeholder />` get children Image ratio to calculate its placeholder height.
It's possible to specify an arbitrary ratio who will override image dimension

```js
<Placeholder ratio={3/4}>
    <Image
      src={`https://image-url`}
      alt={"with placeholder"}
    />
<Placeholder />
```

## Props list

```ts
interface IProps {
  // Image component
  children: ReactNode;

  // by default, ratio is calc from children image data dimension.
  // set ratio override native image ratio
  ratio?: number;

  // shortcut to style wrapper background color
  backgroundColor?: string;

  // add style to each dom element
  style?: {
    root?: CSSProperties;
    wrapper?: CSSProperties;
    img?: CSSProperties;
  };

  // class name added on root element
  className?: string;
}
```

## Returns
