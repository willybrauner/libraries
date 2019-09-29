import React, {useEffect, useRef, useState} from 'react';
import {
  EListener,
  useBoundingClientRect
} from "../../../hooks/use-bounding-client-rect/src/useBoundingClientRect"


interface IProps {
  // pass class to block component
  classNames?: string[];
  // how many columns to show
  columnsNumber?: number;
  // Gutter size between Column (px value)
  // if 0 is return, a "grid line" is display on front
  gutterSize?: number;
  // Need to show grid on init or note
  showGridByDefault?: boolean;
  // Set custom column color
  color?: string;
  //  Set a max-width to the all grid (px value)
  maxWidth?: number;
}

/**
 * default properties
 */
GridLayout.defaultProps = {
  columnsNumber: 12,
  gutterSize: 20,
  showGridByDefault: false,
  color: 'rgba(255, 0, 0, 0.14)',
  maxWidth: null
};

// component name
const component: string = 'GridLayout';

/**
 * Grid Layout Component
 * @param props
 */
export function GridLayout(props: IProps) {

  // Get root ref
  const rootRef = useRef<HTMLDivElement>(null);

  // get root dimentions and position properties
  const rootRect = useBoundingClientRect(
    rootRef,
    EListener.ON_SCROLL_AND_RESIZE
  );

  // --------------------------------------------------------------------------- WINDOW SIZE

  // TODO utiliser useWindowSize
  // Get current window width
  const [windowWidth, setWindowWidth] = useState<number>(
    window.innerWidth
  );

  /**
   * Listen window width value on resize
   */
  useEffect(() => {
    // set new value
    const resizeHandler = () => {
      // if window object is not define, do not continue
      if (typeof window === undefined) return;
      // set new value
      setWindowWidth(window.innerWidth);
    };
    // start check viewport width on init component
    resizeHandler();
    // listen resize
    window.addEventListener('resize', resizeHandler);

    return () => {
      // remove resize listener
      window.removeEventListener('resize', resizeHandler);
    };
  }, [windowWidth]);

  // --------------------------------------------------------------------------- KEY

  // show grid state
  const [showGrid, setShowGrid] = useState<boolean>(props.showGridByDefault);

  /**
   * On key up listener
   * Allow to toggle grid visibility
   */
  useEffect(() => {
    // on each key press on document body
    document.body.onkeyup = (pEvent: KeyboardEvent) => {
      // if code key is G Key
      if (pEvent.code === 'KeyG') {
        // toggle visibility state
        setShowGrid(!showGrid);
      }
    };
  });

  // --------------------------------------------------------------------------- COLUMN STYLE

  /**
   * Set root DOM element style
   * @param pMaxWidth
   * @param pWindowWidth
   */
  const rootStyle = (pMaxWidth: number, pWindowWidth: number) => {
    if (
      // if max width is null
      pMaxWidth == null ||
      // or if max-width is bigger than window width
      pMaxWidth > pWindowWidth
    ) {
      // do not continue
      return;
    }
    // return style for root element
    return {
      marginLeft: (pWindowWidth - pMaxWidth) / 2,
      maxWidth: pMaxWidth
    };
  };

  /**
   * Set column style, depend of props
   * @param pWidth
   * @param pColumnNumber
   * @param pGutter
   * @param pColor
   * @param pIndex
   */
  const columnStyle = (
    pWidth: number,
    pColumnNumber: number,
    pGutter: number,
    pColor: string,
    pIndex: number
  ) => {
    // if there is no gutter, we apply pColor on border right
    if (pGutter === 0) {
      return {
        width: pWidth / pColumnNumber,
        borderRight:
          pIndex + 1 === pColumnNumber
            ? // return no border
              null
            : `${pColor} 1px solid`
      };

      // if a gutter size is set, we use this gutter and apply color on gutter background
    } else {
      return {
        width: pWidth / pColumnNumber - pGutter + pGutter / pColumnNumber,
        backgroundColor: pColor
      };
    }
  };

  // --------------------------------------------------------------------------- PREPARE RENDER

  // prepare class block string
  const classBlock = [component, props.classNames].filter(v => v).join(' ');

  // --------------------------------------------------------------------------- RENDER

  // return Grid Layout DOM if state is set to true
  if (showGrid) {
    return (
      <div
        className={classBlock}
        style={{
          ...css.root,
          ...rootStyle(props.maxWidth, windowWidth)
        }}
        ref={rootRef}
      >
        <div className={`${component}_columns`} style={css.columns}>
          {new Array(props.columnsNumber).fill(null).map((e, i) => (
            <span
              className={`${component}_column`}
              key={i}
              style={{
                ...css.column,
                ...columnStyle(
                  props.maxWidth != null && windowWidth > props.maxWidth
                    ? rootRect && rootRect.width
                    : windowWidth,
                  props.columnsNumber,
                  props.gutterSize,
                  props.color,
                  i
                )
              }}
            />
          ))}
        </div>
      </div>
    );
    // return nothing
  } else return null;
}

// ----------------------------------------------------------------------------- CSS

/**
 * Define DOM elements style
 */
const css: any = {
  root: {
    position: 'fixed',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0'
  },
  columns: {
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    width: '100%'
  },
  column: {
    height: '100vh'
  }
};
