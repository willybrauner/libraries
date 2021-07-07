import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { gsap } from "gsap";
import { TPlay, Transition } from "../src";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

/**
 * App
 */
function App() {
  const elTransition = (
    el: HTMLElement,
    done: () => void,
    show: boolean
  ): void => {
    const offset = 120;
    gsap.fromTo(
      el,
      {
        autoAlpha: show ? 0 : 1,
        x: show ? -offset : 0,
      },
      {
        duration: 0.6,
        autoAlpha: show ? 1 : 0,
        x: show ? 0 : offset / 2,
        ease: "power3.inOut",
        onComplete: done,
      }
    );
  };

  const [toggle, setToggle] = useState<boolean>(true);
  const [localPlayState, setLocalPlayState] = useState<TPlay>();

  return (
    <div className={"App"}>
      <div className={"App_container"}>
        <div className={"App_buttons"}>
          <button onClick={() => setToggle(!toggle)}>TOGGLE</button>
          <button onClick={() => setToggle(true)}>PLAY_IN</button>
          <button onClick={() => setToggle(false)}>PLAY_OUT</button>
        </div>
        <Transition
          if={toggle}
          playIn={(el, done) => elTransition(el, done, true)}
          playOut={(el, done) => elTransition(el, done, false)}
          dispatchPlayState={(playState: TPlay) => setLocalPlayState(playState)}
          appear={true}
          unmountAfterPlayOut={true}
        >
          <div className={"App_element"} />
        </Transition>
      </div>
    </div>
  );
}
