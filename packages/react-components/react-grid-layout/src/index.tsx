import React, { CSSProperties, useRef } from "react";
import useBoundingClientRect, {
  EListener
} from "@wbe/use-bounding-client-rect";
import useWindowSize from "@wbe/use-window-size";

// component name
const component: string = "GridLayout";
const debug = require("debug")(`lib:GridLayout`);

export enum EGridOrientation {
  VERTIVAL,
  HORIZONTAL
}

interface IProps {
  /**
   * How many columns to display
   */
  columnsNumber?: number;

  /**
   * Gutter size between Column (px value)
   * if 0 is return, a 1px "grid line" will be display
   */
  gutterSize?: number | string;

  /**
   * Set custom grid color
   */
  color?: string;

  /**
   * Set a max-width to the all grid (px value by default)
   * Can accept string like '90vw'
   */
  maxWidth?: number | string | null;

  /**
   * Center the grid in viewport
   */
  center?: boolean;
  //
  // /**
  //  * Orientation
  //  */
  // orientation?: EGridOrientation;
}

GridLayout.defaultProps = {
  columnsNumber: 12,
  gutterSize: 20,
  showGridByDefault: false,
  color: "rgba(255, 0, 0, 0.14)",
  maxWidth: null,
  center: true
  // orientation: EGridOrientation.VERTIVAL
} as IProps;

/**
 * @name GridLayout
 * @param props
 * @constructor
 */
function GridLayout(props: IProps) {
  // --------------------------------------------------------------------------- INIT

  // Get root ref
  const rootRef = useRef<HTMLDivElement>(null);
  // get root dimentions and position properties
  const rootRect = useBoundingClientRect(
    rootRef,
    EListener.ON_SCROLL_AND_RESIZE
  );
  // get dynamic window size
  const windowSize = useWindowSize();

  // --------------------------------------------------------------------------- TEST TYPE

  /**
   * Test if is there only number in string
   * ex "20" return true
   * ex "20px" return false
   * @param pValue
   * @return {boolean}
   */
  const isThereOnlyNumberInString = (pValue: string): boolean => {
    const reg = /^\d+$/;
    return reg.test(pValue);
  };

  /**
   * Check if a string contain only number
   * If it's true, add px at the end
   * @return a string with px unit by default of
   */
  const fixUnit = (pValue: string | number): string => {
    // exit
    if (pValue === null) return;

    // if is a string
    if (typeof pValue === "string") {
      return isThereOnlyNumberInString(pValue) ? `${pValue}px` : pValue;
    }
    // if is number
    else if (typeof pValue === "number") {
      return `${pValue}px`;
    }
  };

  // --------------------------------------------------------------------------- COLUMN STYLE

  /**
   * Set root DOM element style
   * @param pMaxWidth
   * @param pWindowWidth
   * @param pCenter
   */
  const rootStyle = (
    pMaxWidth = props.maxWidth,
    pWindowWidth = windowSize?.width,
    pCenter = props.center
  ): CSSProperties | null => {
    if (
      // if max width is null
      pMaxWidth === null ||
      // or if max-width is a number & is bigger than window width
      (typeof pMaxWidth === "number" && pMaxWidth > pWindowWidth)
    ) {
      // do not continue
      return null;
    }
    // return style for root element
    return {
      marginLeft: pCenter && "auto",
      marginRight: pCenter && "auto",
      maxWidth: fixUnit(pMaxWidth)
    };
  };

  /**
   * Select size container reference
   * @param pWindow
   * @param pMaxWidth
   * @param pRootRect
   */
  const selectSizeContainerReference = ({
    pMaxWidth = props?.maxWidth,
    pWindow = windowSize,
    pRootRect = rootRect
  }) => {
    // cas max width is a string
    if (typeof pMaxWidth === "string") {
      return pRootRect?.width;
    }
    // case max width is a number or null
    else if (typeof pMaxWidth === "number" || pMaxWidth === null) {
      return (
        // if screen is smaller than max width
        pWindow?.width > pMaxWidth
          ? // ref is element size
            pRootRect?.width
          : // else, if screen is bigger than max width, ref is window width
            pWindow?.width
      );
    }
  };

  /**
   * Set column style, depend of props
   * @param pWidth
   * @param pColumnNumber
   * @param pGutter
   * @param pColor
   * @param pIndex
   */
  const columnStyle = ({
    pIndex,
    pWidth = selectSizeContainerReference({}),
    pColumnNumber = props.columnsNumber,
    pGutterSize = props.gutterSize,
    pColor = props.color
  }: {
    pIndex: number;
    pWidth?: number;
    pColumnNumber?: number;
    pGutterSize?: number | string;
    pColor?: string;
  }): CSSProperties => {
    // if there is no gutter, we apply pColor on border right
    if (pGutterSize === 0 || fixUnit(pGutterSize) === "0px") {
      return {
        // prettier-ignore
        width: `calc(${fixUnit(pWidth)} / ${pColumnNumber} - ${fixUnit(pGutterSize)})`,
        borderLeft: `${pColor} 1px solid`,
        borderRight: pIndex === pColumnNumber - 1 && `${pColor} 1px solid`
      };
      // if a gutter size is set, we use this gutter
      // and apply color on gutter background
    } else {
      return {
        // prettier-ignore
        width: `calc(${fixUnit(pWidth)} / ${pColumnNumber} - ${fixUnit(pGutterSize)})`,
        backgroundColor: pColor
      };
    }
  };

  // --------------------------------------------------------------------------- RENDER

  return (
    <div
      className={component}
      style={{
        ...css.root,
        ...rootStyle()
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
              ...columnStyle({ pIndex: i })
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
const css: { [x: string]: CSSProperties } = {
  root: {
    position: "fixed",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0"
  },
  columns: {
    display: "flex",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    width: "100%"
  },
  column: {
    height: "100vh"
  }
};

export { GridLayout as default };
