import React, { useState } from "react";
import { render } from "@testing-library/react";
import { TPlay, Transition } from "../src";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

/**
 * Utils
 */
const wait = jest.fn(
  (time: number): Promise<void> =>
    new Promise((resolve) => {
      setTimeout(resolve, time);
    })
);

const TRANSITION_DURATION = 500;
const mockTransition = jest.fn((el, done) =>
  setTimeout(() => {
    done();
  }, TRANSITION_DURATION)
);

beforeEach(() => {
  mockTransition.mockClear();
});

/**
 * children
 */
describe("children render", () => {
  it("should render children element by default", () => {
    const { container } = render(
      <Transition>
        <div className={"app"}>app</div>
      </Transition>
    );
    const app = container.firstChild;
    expect(app.textContent).toBe("app");
  });

  it("should render 'null' as children element when 'if' props is false", () => {
    const { container } = render(
      <Transition if={false}>
        <div className={"app"}>app</div>
      </Transition>
    );
    const app = container.firstChild;
    expect(app).toBeNull();
  });

  it("should render children element after playOut, if 'unmountAfterPlayOut' props is false", () => {
    const { container } = render(
      <Transition if={false} unmountAfterPlayOut={false}>
        <div className={"app"}>app</div>
      </Transition>
    );
    const app = container.firstChild;
    expect(app.textContent).toBeDefined();
  });
  it("should waiting playOut is completed before return null", () => {
    const { container } = render(
      <Transition
        if={false}
        playOut={mockTransition}
        unmountAfterPlayOut={true}
      >
        <div className={"app"}>app</div>
      </Transition>
    );
    const app = container.firstChild;
    expect(app).toBeNull();
  });
});

/**
 * playState
 */
describe("'dispatchPlayState' props", () => {
  it("should return the current play state", async () => {
    // Create Transition App for toggle internal state
    const TransitionApp = () => {
      const [toggle, setToggle] = useState<boolean>(true);
      const [localPlayState, setLocalPlayState] = useState(null);
      return (
        <div className={"app"}>
          <button onClick={() => setToggle(!toggle)}>{localPlayState}</button>
          <Transition
            if={toggle}
            playIn={mockTransition}
            playOut={mockTransition}
            dispatchPlayState={(playState: TPlay) =>
              setLocalPlayState(playState)
            }
            appear={true}
            unmountAfterPlayOut={true}
          >
            <div className={"app"}>app</div>
          </Transition>
        </div>
      );
    };

    let wrapper;
    let button;
    act(() => {
      wrapper = render(<TransitionApp />);
      button = wrapper.getByRole("button");
    });
    expect(button.innerHTML).toBe<TPlay>("play-in");

    await act(async () => await wait(TRANSITION_DURATION + 100));
    expect(button.innerHTML).toBe<TPlay>("visible");

    act(() => userEvent.click(button));
    expect(button.innerHTML).toBe<TPlay>("play-out");

    await act(async () => await wait(TRANSITION_DURATION + 100));
    expect(button.innerHTML).toBe<TPlay>("hidden");
  });
});

/**
 * if
 */
describe("'if' props", () => {
  it("should call playIn if 'if' props is true and 'appear' is true", () => {
    render(
      <Transition
        if={true}
        playIn={mockTransition}
        playOut={mockTransition}
        appear={true}
      >
        <div className={"app"}>app</div>
      </Transition>
    );
    expect(mockTransition.mock.calls.length).toBe(1);
  });

  it("should call playOut if 'if' props is false", async () => {
    // Create Transition App for toggle internal state
    const TransitionApp = () => {
      const [toggle, setToggle] = useState<boolean>(true);
      return (
        <>
          <button onClick={() => setToggle(!toggle)} />
          <Transition if={toggle} playOut={mockTransition}>
            <div className={"app"}>app</div>
          </Transition>
        </>
      );
    };

    const wrapper = render(<TransitionApp />);
    const button = wrapper.getByRole("button");
    act(() => userEvent.click(button));
    expect(mockTransition.mock.calls.length).toBe(1);
  });

  it("should not call playOut if 'if' props is false on first mount", () => {
    render(
      <Transition if={false} playOut={mockTransition} appear={false}>
        <div className={"app"}>app</div>
      </Transition>
    );
    expect(mockTransition.mock.calls.length).toBe(0);
  });
});
