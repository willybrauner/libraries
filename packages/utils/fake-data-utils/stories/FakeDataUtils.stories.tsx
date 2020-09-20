import { FakeDataUtils, EFakeVideoType } from "../src/FakeDataUtils";
import React from "react";
import "../../../../storybook/global-style.css";

const storyName = "fake-data-utils";

export const GetResponsiveImageData = () => (
  <pre>
    {JSON.stringify(FakeDataUtils.getResponsiveImageData(16 / 9), null, 2)}
  </pre>
);
GetResponsiveImageData.storyName = "getResponsiveImageData()";

export const GetVideoUrl = () => (
  <>
    <p>Random youtube url</p>
    <pre>
      {JSON.stringify(
        FakeDataUtils.getVideoUrl(EFakeVideoType.YOUTUBE),
        null,
        2
      )}
    </pre>
    <p>Random vimeo url</p>
    <pre>
      {JSON.stringify(FakeDataUtils.getVideoUrl(EFakeVideoType.VIMEO), null, 2)}
    </pre>
    <p>Random native video url</p>
    <pre>
      {JSON.stringify(
        FakeDataUtils.getVideoUrl(EFakeVideoType.NATIVE),
        null,
        2
      )}
    </pre>
  </>
);
GetVideoUrl.storyName = "getVideoUrl()";

export const GetVideoId = () => (
  <>
    <p>Random youtube ID</p>
    <pre>
      {JSON.stringify(
        FakeDataUtils.getVideoId(EFakeVideoType.YOUTUBE),
        null,
        2
      )}
    </pre>
    <p>Random vimeo ID</p>
    <pre>
      {JSON.stringify(FakeDataUtils.getVideoId(EFakeVideoType.VIMEO), null, 2)}
    </pre>
  </>
);
GetVideoId.storyName = "getVideoId()";

export const GetTitle = ({ pWords }: { pWords: number }) => (
  <>
    <p>Fake title</p>
    <code>{FakeDataUtils.getTitle(pWords)}</code>
  </>
);
GetTitle.storyName = "getTitle()";
GetTitle.args = {
  pWords: [3]
};

export const GetText = () => {
  return (
    <>
      <p>Fake text</p>
      <code>{FakeDataUtils.getText(2)}</code>
    </>
  );
};
GetText.storyName = "getText()";

export default {
  title: `utils/${storyName}`,
  component: GetResponsiveImageData
};
