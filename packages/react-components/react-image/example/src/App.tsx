import React from "react";
import { Image, ImagePlaceholder } from "../../src";
import { FakeDataUtils } from "@wbe/fake-data-utils";

function App() {
  return (
    <div className="App">
      <ImagePlaceholder
        style={{
          wrapper: {
            backgroundColor: "pink",
          },
        }}
      >
        <Image
          alt={"image"}
          data={FakeDataUtils.getResponsiveImageData(4 / 3)}
          //src={`https://picsum.photos/id/1/360/600`}
          //width={"100%"}
        />
      </ImagePlaceholder>

      {/*<Image*/}
      {/*  data={FakeDataUtils.getResponsiveImageData(4 / 3)}*/}
      {/*  alt={""}*/}
      {/*  width={"100%"}*/}
      {/*/>*/}
    </div>
  );
}

export default App;
