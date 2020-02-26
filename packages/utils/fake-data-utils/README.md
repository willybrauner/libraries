# @wbe/fake-data-utils

Generate fake data image/text/video allowing to test UI components

![](https://img.shields.io/npm/v/@wbe/fake-data-utils/latest.svg)
![](https://img.shields.io/bundlephobia/minzip/@wbe/fake-data-utils.svg)
![](https://img.shields.io/david/willybrauner/libraries.svg?path=packages%2Futils%2Ffake-data-utils)
![](https://img.shields.io/npm/dt/@wbe/fake-data-utils.svg)
![](https://img.shields.io/npm/l/@wbe/fake-data-utils.svg)

## Installation

```shell script
$ npm install -s @wbe/fake-data-utils
```

## How to use

Import `fakeDataUtils`:

```tsx
import fakeDataUtils from "@wbe/fake-data-utils";
```

## API

- [getResponsiveImageData](#getResponsiveImageData)
- [getVideoUrl](#getVideoUrl)
- [getVideoId](#getVideoId)
- [getTitle](#getTitle)
- [getText](#getText)

### <a name="getResponsiveImageData"></a>getResponsiveImageData

Get an array of random IImage objects.

```tsx
getResponsiveImageData(pRatio, pBreakpoints);
```

#### Parameters

- `pRatio (number)`: Image ratio - default: `4 / 3`
- `pBreakpoints (number[])`: Breakpoints list - default: `[640, 1024, 1440, 1920]`

#### Returns

`(Array) IImage[]`: Array of IImage data object

#### Example

```tsx
// will returned an array of IImage object with 16/9 ratio
const responsiveImageData = FakeDataUtils.getResponsiveImageData(16 / 9);
```

### <a name="getVideoUrl"></a>getVideoUrl

Get a random video URL.

```tsx
getVideoUrl(pVideoType, pYoutubeId, pVimeoId);
```

#### Parameters

- `pVideoType (EVideoType<YOUTUBE|VIMEO|NATIVE>)`: Type of video
- `pYoutubeId (string)`: Specify youtube ID to use - default: random ID
- `pVimeoId (string)`: Specify vimeo ID to use - default: random ID

#### Returns

`(string)`: video URL

#### Example

```tsx
// will returned a random youtube url
const youtubeUrl = FakeDataUtils.getVideoUrl(EVideoType.YOUTUBE);
```

### <a name="getVideoId"></a>getVideoId

Get a random video ID.

```tsx
getVideoId(pVideoType);
```

#### Parameters

- `pVideoType (EVideoType<YOUTUBE|VIMEO>)`: Type of video

#### Returns

`(string)`: video ID

#### Example

```tsx
// will returned a random vimeo id
const vimeoUrl = FakeDataUtils.getVideoId(EVideoType.VIMEO);
```

### <a name="getTitle"></a>getTitle

Get a random title.

```tsx
getTitle(pWords);
```

#### Parameters

- `pWords (number)`: Number of words - default: `1`

#### Returns

`(string)`: title

#### Example

```tsx
// will returned two random words
const title = FakeDataUtils.getTitle(2);
```

### <a name="getText"></a>getText

Get random text.

```tsx
getText(pSentencies);
```

#### Parameters

- `pSentencies (number)`: Number of sentencies - default: `1`

#### Returns

`(string)`: text

#### Example

```tsx
// will returned four random sentencies
const text = FakeDataUtils.getText(4);
```
