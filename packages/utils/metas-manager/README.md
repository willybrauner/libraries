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
MetasManager need a document title tag to create others.

```js
import { MetasManager } from "@wbe/metas-manager";

const values = {
 title: "Hello world!",
 description: "Custom description",
 imageUrl: "Custom preview image URL",
 siteName: "Custom site name",
 pageUrl: "Custom page URL",
 author: "Custom site Author",
 keywords: "Custom, key, words",
}

MetasManager.inject({ values });
```

This will inject new metas data in theses meta tags:

```html
<head>
  <title>Hello world!</title>
  ...
  <meta property="og:title" content="Hello world!" auto-generated />
  <meta name="twitter:title" content="Hello world!" auto-generated />
  <meta name="description" content="Custom description" auto-generated />
  <meta property="og:description" content="Custom description" auto-generated />
  <meta name="twitter:description" content="Custom description" auto-generated />
  <meta property="og:image" content="Custom preview image URL" auto-generated />
  <meta name="twitter:image" content="Custom preview image URL" auto-generated />
  <meta rel="image_src" href="Custom preview image URL" auto-generated />
  <meta property="og:site_name" content="Custom site name" auto-generated />
  <meta name="twitter:site" content="Custom site name" auto-generated />
  <meta property="og:url" content="Custom page URL" auto-generated />
  <meta name="twitter:url" content="Custom page URL" auto-generated />
  <meta name="author" content="Custom site Author" auto-generated />
  <meta name="keywords" content="Custom, key, words" auto-generated />
</head>
```

This meta markup can be extend by adding new properties to default meta tags:

ex:

```ts
import MetasManager, { TMetaTags, TTag } from "@wbe/metas-manager";

const robotsTag: TMetaTags<TTag[]> = [
  // allow to create <meta name="robots" content="" auto-generated />
  { selectorAttr: "name", selectorValue: "robots", attr: "content" },
];

const tags = {
  ...MetasManager.DEFAULT_META_TAGS,
  robotsTag,
};

const values = {
 robots: "index,follow",
}

// will inject value in content attr: <meta name="robots" content="index,follow" auto-generated />
MetasManager.inject({ values, tags });

```
## API

### `inject` (static)

```ts
MetasManager.inject({ values, tags, autoCreateMetaTag, autoRemoveMetaTag });
```

#### Parameters

Object: 
- `values (TMetaTags)`: object of values to inject - default: `null`
- `tags (TMetaTags)`: object of meta tags struct - default: `MetasManager.DEFAULT_META_TAGS`
- `autoCreateMetaTag (boolean)`: auto create meta tag in document head if doesn't exist - default: `true`
- `autoRemoveMetaTag (boolean)`: auto remove meta tag in document head if value is "" - default: `true`

#### Returns

`(Void)`
