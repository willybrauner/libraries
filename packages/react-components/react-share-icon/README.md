# @wbe/react-share-icon

This component is a single share icon. Handles Facebook and Twitter share.

## Installation

```shell script
$ npm install -S @wbe/react-share-icon
```

## How to use

Import `<ReactShareIcon />` component anywhere.

```jsx
// ...
import ReactShareIcon from "@wbe/react-share-icon";

export const App = () => {
  return (
    <div>
      <ReactShareIcon
        target={ESocialMediaName.FACEBOOK}
      />
    </div>
  );
};
```

## Props

[ReactShareIcon component](src/index.tsx) contains default props, you can overwrite as you need:

| props              | type             | description                                  | default value             |
| ------------------ | ---------------- | -------------------------------------------- | ------------------------- |
| target             | ESocialMediaName | Platform on which to share the content       | ESocialMediaName.FACEBOOK |
| customIcon         | any or null      | Custom SVG icon                              | null                      |
| targetLink         | string           | Link to be shared                            | ""                        |
| twitterShareText   | string           | For Twitter, default text in the tweet       | ""                        |


example:

```typescript jsx
const overrideSVG = (<svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>);

<ReactShareIcon
  target={ESocialMediaName.TWITTER}
  targetLink={"https://cher-ami.tv"}
  twitterShareText={"Check out this amazing studio"}
  customIcon={overrideSVG}
/>
```
