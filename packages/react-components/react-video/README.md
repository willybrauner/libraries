# @wbe/react-video

This component handles video playing in your react app.



## Installation TODO

```shell script
$ npm install -S @wbe/react-video
```

## How to use

Import `<ReactVideo />` component anywhere.

```jsx
// ...
import ReactVideo from "@wbe/react-video";

export const App = () => {
  return (
    <div>
      <ReactVideo
        type={ EVideoType.YOUTUBE }
      />
    </div>
  );
};
```

## Props

[ReactVideo component](src/index.tsx) contains default props, you can overwrite as you need:

| props         | type       | description                                  | default value         |
| ------------- | ---------- | -------------------------------------------- | --------------------- |
| type          | EVideoType | Origin of the video (Youtube, Vimeo, Native) |                       |


example:

```typescript jsx
<ReactVideo 
    type={EVideoType.YOUTUBE}
    url={"https://youtu.be/ZnuwB35GYMY"}
 />
```

## Tips

TODO
