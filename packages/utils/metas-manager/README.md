# @wbe/metas-manager

Metas manager allow to inject new metas value in HTML metas tags on demand"

![](https://img.shields.io/npm/v/@wbe/metas-manager/latest.svg)
![](https://img.shields.io/bundlephobia/minzip/@wbe/metas-manager.svg)
![](https://img.shields.io/npm/dt/@wbe/metas-manager.svg)
![](https://img.shields.io/npm/l/@wbe/metas-manager.svg)

## Installation

```shell script
$ npm install -s @wbe/metas-manager
```

## How to use

First, if your html page don't have a `<title></title>` meta tag, you need to set it.
MetasManager need a title meta tag to create others.

```js
import MetasManager from "@wbe/metas-manager";

// use as new instance:
const metasManager = new MetasManager();
metasManager.inject({
  title: "Hello world!",
  description: "Custom description",
  imageUrl: "Custom preview image URL",
  siteName: "Custom site name",
  pageUrl: "Custom page URL",
  author: "Custom site Author",
  keywords: "Custom, key, words",
});
```

This will inject new metas data in theses meta tags:

```html
<head>
  <title>Hello world!</title>
  ...
  <meta property="og:title" content="Hello world!" auto-generated="true" />
  <meta name="twitter:title" content="Hello world!" auto-generated="true" />
  <meta name="description" content="Custom description" auto-generated="true" />
  <meta property="og:description" content="Custom description" auto-generated="true" />
  <meta name="twitter:description" content="Custom description" auto-generated="true" />
  <meta property="og:image" content="Custom preview image URL" auto-generated="true" />
  <meta name="twitter:image" content="Custom preview image URL" auto-generated="true" />
  <meta rel="image_src" href="Custom preview image URL" auto-generated="true" />
  <meta property="og:site_name" content="Custom site name" auto-generated="true" />
  <meta name="twitter:site" content="Custom site name" auto-generated="true" />
  <meta property="og:url" content="Custom page URL" auto-generated="true" />
  <meta name="twitter:url" content="Custom page URL" auto-generated="true" />
  <meta name="author" content="Custom site Author" auto-generated="true" />
  <meta name="keywords" content="Custom, key, words" auto-generated="true" />
</head>
```

This meta markup can be extend by adding new properties to default meta tags:

ex:

```ts
import MetasManager, { TMetaType, DEFAULT_META_TAGS } from "@wbe/metas-manager";

const robots = [
  // allow to create <meta name="robots" content="" auto-generated="true" />
  { selectorAttr: "name", selectorValue: "robots", attr: "content" },
] as TMetaType;

const customMetaTags = {
  ...DEFAULT_META_TAGS,
  robots,
};

// use as new instance:
const metasManager = new MetasManager();
metasManager.inject({
  robots: "index,follow",
});

// will inject value in content attr: <meta name="robots" content="index,follow" auto-generated="true" />
```

MetaManager can be use as singleton too:

```ts
import MetasManager, { TMetaType, DEFAULT_META_TAGS } from "@wbe/metas-manager";

MetasManager.instance.inject({
  title: "yolo",
});

// will inject value in content attr: <meta name="robots" content="index,follow" auto-generated="true" />
```

## API

### instance `new MetasManager`

```tsx
constructor(defaultMetasTags);
```

#### Parameters

- `defaultMetasTags (TMetaTags)`: object of meta tags struct - default: `DEFAULT_META_TAGS`

### `inject`

```tsx
inject(customMetaValues, autoCreateMetaTag, autoRemoveMetaTag, metaTags);
```

#### Parameters

- `customMetaValues (TMetaTags)`: object of values to inject - default: `null`
- `autoCreateMetaTag (boolean)`: auto-generate meta tag in head if doesn't exist - default: `true`
- `autoRemoveMetaTag (boolean)`: auto-remove meta tag in head if value is "" - default: `true`
- `metaTags (TMetaTags)`: object of meta tags struct - default: `DEFAULT_META_TAGS`

#### Returns

`(Void)`
