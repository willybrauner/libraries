import React from 'react'
import ReactDOM from 'react-dom'
import { Image, ImagePlaceholder as Placeholder } from "../src";
import { FakeDataUtils } from "@wbe/fake-data-utils";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

function App() {
  // prettier-ignore
  const buildSrcset = (id: number, ratio = 4 / 3) => [
    `https://picsum.photos/id/${id + 1}/360/${Math.round(360 * ratio)} 360w`,
    `https://picsum.photos/id/${id + 1}/1024/${Math.round(1024 * ratio)} 1024w`,
    `https://picsum.photos/id/${id + 1}/1440/${Math.round(1440 * ratio)} 1440w`,
  ].join(", ");

  return (
    <div className="App" style={{ width: "50%", margin: "0 auto" }}>

      <Image
        src={`https://picsum.photos/id/3/600/300`}
        alt={"image"}
      />

      <Placeholder backgroundColor={"pink"}>
        <Image
          data={FakeDataUtils.getResponsiveImageData(4 / 3)}
          alt={"image"}
        />
      </Placeholder>
      <br />
      <br />
      {new Array(5).fill(null).map((el, i) => (
        <Image
          key={i}
          alt={"simple src image"}
          srcPlaceholder={`https://picsum.photos/id/${i + 1}/10/10`}
          src={`https://picsum.photos/id/${i + 1}/360/600`}
          width={"100%"}
          height={600}
          observerOptions={{ rootMargin: "-30%" }}
        />
      ))}
      <br />
      <br />
      {new Array(5).fill(null).map((el, i) => (
        <Image
          key={i}
          alt={"simple srcset image"}
          srcset={buildSrcset(i)}
          width={"100%"}
        />
      ))}
    </div>
  );
}
