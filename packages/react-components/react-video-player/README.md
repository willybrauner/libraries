# @wbe/react-video-player

React video player is a wrapper component for native, vimeo and youtube video.

![](https://img.shields.io/npm/v/@wbe/react-video-player/latest.svg)
![](https://img.shields.io/bundlephobia/minzip/@wbe/react-video-player.svg)
![](https://img.shields.io/david/willybrauner/libraries.svg?path=packages%2Freact-components%2Freact-video-player)
![](https://img.shields.io/npm/dt/@wbe/react-video-player.svg)
![](https://img.shields.io/npm/l/@wbe/react-video-player.svg)

## Installation

```shell script
$ npm install -s @wbe/react-video-player
```

## How to use

Import VideoPlayer:

```jsx
import VideoPlayer, { EVideoType } from "@wbe/react-video-player";
// ...
const App = () => {
  return (
    <VideoPlayer
      type={EVideoType.NATIVE}
      className={`native`}
      url={"https://video-url"}
      play={true}
      style={{ display: "block" }}
      controls={false}
      muted={true}
      autoPlay={true}
      onPause={e => console.log("pause callback", e)}
      onPlay={e => console.log("play callback", e)}
      onEnded={e => console.log("ended callback", e)}
      onReady={e => console.log("ready callback", e)}
    />
  );
};
```

Or import an available sub video component to access extra available props:

- [NativeVideo](./src/NativeVideo.tsx)
- [VimeoVideo](./src/VimeoVideo.tsx)
- [YoutubeVideo](./src/YoutubeVideo.tsx)

```jsx
import { YoutubeVideo } from "@wbe/react-video-player";
// ...
const App = () => {
  return (
    <YoutubeVideo
      id={"youtube-id"}
      play={true}
      // specific props available only for youtube video
      fs={false}
    />
  );
};
```

You can easily create your own VideoPlayer component and import sub video component as needed.

## Parameters / Props

| props (\* non optional) | type                | description                              | default value | @type           |
| ----------------------- | ------------------- | ---------------------------------------- | ------------- | --------------- |
| type\*                  | EVideoType          | Type of video                            | /             | /               |
| id                      | string              | Video ID (ID will overwrite URL)         | /             | VIMEO & YOUTUBE |
| url                     | string              | Video URL                                | /             | all             |
| play                    | boolean             | Play, pause, resume video                | /             | all             |
| style                   | CSSProperties       | Add root component style                 | /             | all             |
| autoPlay                | boolean             | Autoplay video on init                   | false         | all             |
| controls                | boolean             | Show controls on video                   | true          | all             |
| loop                    | boolean             | Loop video                               | false         | all             |
| playsInline             | boolean             | Plays inline video on mobile             | true          | all             |
| muted                   | boolean             | Mute video                               | false         | all             |
| onReady                 | (event:any) => void | Execute function when video is ready     | /             | all             |
| onPlay                  | (event:any) => void | Execute callback function on play state  | /             | all             |
| onPause                 | (event:any) => void | Execute callback function on pause state | /             | all             |
| onEnded                 | (event:any) => void | Execute callback function on ended state | /             | all             |
| className               | string              | class list                               | /             | all             |
