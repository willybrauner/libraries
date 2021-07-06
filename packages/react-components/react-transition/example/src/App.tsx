import React, { useState } from "react";
import { TPlay, Transition } from "../../src";
import { gsap } from "gsap";

const App = () => {
  /**
   * Default button transition in main header
   */
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
};

export default App;
