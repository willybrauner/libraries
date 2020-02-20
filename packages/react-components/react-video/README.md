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

| props              | type             | description                                  | default value           |
| ------------------ | ---------------- | -------------------------------------------- | ----------------------- |
| type               | EVideoType       | Origin of the video (Youtube, Vimeo, Native) |                         |
| url                | string           | URL of the video                             | ""                      |
| showControls       | boolean          | Show controls of the video (vimeo needs pro) | true                    |
| poster             | IImage[] or null | Cover image of the video if needed           | null                    |
| playButtonSvg      | any              | SVG for the play button                      | null                    |
| autoplay           | boolean          | Auto start the video                         | true                    |
| playState          | EVideoPlayState  | Use this to manually set the video state     | EVideoPlayState.INITIAL |
| playOnlyInViewport | boolean          | Stop the video if it is out of viewport      | true                    |
| playIn             | () => void       | Callback to the animation code               | () => null              |
| playOut            | () => void       | Callback to the animation code               | () => null              |
| backgroundColor    | string           | Set a background color for the component     | "transparent"           |


example:

```typescript jsx
<ReactVideo 
    type={EVideoType.YOUTUBE}
    url={"https://youtu.be/ZnuwB35GYMY"}
 />
```

## Tips

TODO
