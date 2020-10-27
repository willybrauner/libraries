# @wbe/preloads

Preloads assets utilities:

- [preloadImage](#preloadImage)
- [preloadImages](#preloadImages)

![](https://img.shields.io/npm/v/@wbe/preloads/latest.svg)
![](https://img.shields.io/bundlephobia/minzip/@wbe/preloads.svg)
![](https://img.shields.io/npm/dt/@wbe/preloads.svg)
![](https://img.shields.io/npm/l/@wbe/preloads.svg)

## Installation

```shell script
$ npm install -s @wbe/preloads
```

## <a name="preloadImage"></a>preloadImage

#### Parameters

- `url (string)`: image URL

#### Returns

`(Promise<HTMLImageElement>)`: Promise who return image element

#### Example

```ts
import { preloadImage } from "@wbe/preloads";

preloadImage("https://picsum.photos/200/300").then((response) => {
  // image is loaded, do something...
});
```

## <a name="preloadImages"></a>preloadImages

#### Parameters

- `urls (string[])`: image URLs array

#### Returns

`(Promise<HTMLImageElement[]>)`: Promise who return image elements array

#### Example

```ts
import { preloadImages } from "@wbe/preloads";

preloadImages([
  "https://picsum.photos/200/300",
  "https://picsum.photos/200/300",
]).then((response) => {
  // images are loaded, do something...
});
```
