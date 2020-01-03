import React, {useRef} from 'react';
import {useBoundingClientRect, EListener} from "use-bounding-client-rect"
import {useWindowSize} from "use-window-size"

interface IProps {
  /**
   * How many columns to display
   */
  columnsNumber?: number;

  /**
   * Gutter size between Column (px value)
   * if 0 is return, a 1px "grid line" will be display
   */
  gutterSize?: number;

  /**
   * Set custom grid color
   */
  color?: string;

  /**
   *  Set a max-width to the all grid (px value)
   */
  maxWidth?: number | null;
}

GridLayout.defaultProps = {
  columnsNumber: 12,
  gutterSize: 20,
  showGridByDefault: false,
  color: 'rgba(255, 0, 0, 0.14)',
  maxWidth: null
} as IProps;

// component name
const component: string = 'GridLayout';

/**
 * @name GridLayout
 * @param props
 * @constructor
 */
export function GridLayout(props: IProps) {
  // --------------------------------------------------------------------------- WINDOW SIZE

  // Get root ref
  const rootRef = useRef<HTMLDivElement>(null);
  // get root dimentions and position properties
  const rootRect = useBoundingClientRect(
    rootRef,
    EListener.ON_SCROLL_AND_RESIZE
  );
  const windowSize = useWindowSize();

  // --------------------------------------------------------------------------- COLUMN STYLE

  /**
   * Set root DOM element style
   * @param pMaxWidth
   * @param pWindowWidth
   */
  const rootStyle = (pMaxWidth: number, pWindowWidth: number) => {
    // check
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
      marginLeft: 'auto',
      marginRight: 'auto',
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

  // --------------------------------------------------------------------------- RENDER

  // return Grid Layout DOM if state is set to true
  return (
    <div
      className={component}
      style={{
        ...css.root,
        ...rootStyle(props.maxWidth, windowSize?.width)
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
                windowSize?.width > props?.maxWidth
                  ? rootRect && rootRect.width
                  : windowSize?.width,
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
