import React, { ReactNode, useLayoutEffect, useRef, useState } from "react";

/**
 * TPlay type is used in order to get/set current transtion step
 * hidden: Transition playOut is completed
 * play-out: Transition playOut is in perfoming
 * play-in: Transition playIn is in perfoming
 * visible: Transition playIn is completed
 */
export type TPlay = "hidden" | "play-out" | "play-in" | "visible";

type TProps = {
  /**
   * If
   * toggle start play-in / play-out children with transition
   * @default true
   */
  if?: boolean;

  /**
   * React children to transit
   */
  children?: ReactNode;

  /**
   * playIn transition
   * @param {HTMLElement} el DOM element to animate
   * @param {()=> void} done Execute function on transition end
   */
  playIn?: (el: HTMLElement, done: () => any) => void;

  /**
   * When playIn transition complete, execute callback
   */
  onPlayInComplete?: () => void;

  /**
   * playOut transition
   * @param {HTMLElement} el DOM element to animate
   * @param {()=> void} done Execute function on transition end
   */
  playOut?: (el: HTMLElement, done: () => any) => void;

  /**
   * When playOut transition complete, execute callback
   */
  onPlayOutComplete?: () => void;

  /**
   * Start transition on first mount
   * if false, children is visible but transition start only when "if" props change
   * @default false
   */
  appear?: boolean;

  /**
   * Unmount children React element after playOut transition
   * @default true
   */
  unmountAfterPlayOut?: boolean;

  /**
   * Dispatch current TPlay string type
   * @param play
   */
  dispatchPlayState?: (play: TPlay) => void;
};

Transition.defaultProps = {
  if: true,
  children: null,
  appear: false,
  unmountAfterPlayOut: true,
} as TProps;

/**
 * @name Transition
 */
// prettier-ignore
export function Transition (props: TProps) {

  const rootRef = useRef<HTMLElement>(null)
  // curent play state
  const [playState, setPlayState] = useState<TPlay>(()=> {
    if (!props.appear) return props.if ? "visible" : "hidden"
    else return null
  })
  // allow to know if is first render
  const initialMountRef = useRef<boolean>(true)

  /**
   * 1. Listen toggle "if" props and mute playState
   */
  useLayoutEffect(() =>
  {
    if (!props.appear && initialMountRef.current)
    {
      initialMountRef.current = false
      return
    }
    setPlayState(props.if ? "play-in" : "play-out")

  }, [props.if, props.appear])



  /**
   * 2. Play transition depend of current playState
   */
  const rejectRef = useRef<Function>(null);

  useLayoutEffect(() =>
  {
    const ref = rootRef.current
    if (!ref) return

    // reject current pending promise
    if (playState === "play-in" || playState === "play-out")
    {
      rejectRef.current?.();
    }

    const asyncProcess = async ():Promise<void> =>
    {
      if (playState === "play-in")
      {
        await new Promise((resolve: any, reject) => {
          props.playIn?.(ref, resolve)
          rejectRef.current = reject
        })
        props.onPlayInComplete?.();
        setPlayState("visible")
      }

      if (playState === "play-out")
      {
        await new Promise((resolve: any, reject) => {
          props.playOut?.(ref, resolve)
          rejectRef.current = reject
        })
        props.onPlayOutComplete?.();
        // need to manually dispatch this state
        props.dispatchPlayState?.("hidden")
        setPlayState("hidden")
      }

    }

    asyncProcess();
    props.dispatchPlayState?.(playState)

  }, [playState])

  /**
   * 3. Render
   */
  // Destroy children when transition state is hidden
  if (playState === "hidden" && props.unmountAfterPlayOut) return null

  // Return clone of props.children element with attached local ref
  return React.cloneElement(props.children, {
    className: [props.children.props.className || null, `transition-${playState}`].filter( e => e).join(" "),
    ref: (r) => (rootRef.current = r),
  })

}
