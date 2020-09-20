import React, { CSSProperties, useRef } from "react";
import useBoundingClientRect, {
  EListener
} from "@wbe/use-bounding-client-rect";
import useWindowSize, { IWindowSize } from "@wbe/use-window-size";

const component: string = "GridLayout";
const debug = require("debug")(`lib:${component}`);

enum EOrientation {
  VERTICAL = "vertical",
  HORIZONTAL = "horizontal"
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
   * Set a max size to the all grid (px value by default)
   * Can accept string like '90vw'
   */
  maxSize?: number | string | null;

  /**
   * Center the grid in viewport
   */
  center?: boolean;

  /**
   * Grid Orientation
   */
  orientation?: EOrientation;
}

GridLayout.defaultProps = {
  columnsNumber: 12,
  gutterSize: 20,
  showGridByDefault: false,
  color: "rgba(255, 0, 0, 0.14)",
  maxSize: null,
  center: true,
  orientation: EOrientation.VERTICAL
} as IProps;

enum ESizeObject {
  WINDOW_SIZE,
  ROOT_RECT
}

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

  // --------------------------------------------------------------------------- TEST TYPE / UNIT

  /**
   * Test if is there only number in string
   * ex "20" return true
   * ex "20px" return false
   * @param pValue
   * @return {boolean}
   */
  const thereIsOnlyNumberInString = (pValue: string): boolean => {
    const reg = /^\d+$/;
    return reg.test(pValue);
  };

  /**
   * FixUnit
   * Check value Type
   * if it's a number, return a `${number}px` as string
   * if it's a string:
   *  - contain only number (ex: "20"): returns "20px" with px as default unit
   *  - contain NOT only number (ex: "20vw"): returns "20vw"
   *  (this function not convert unit, it suppose other part of string is the right unit)
   * @return {string}
   */
  const fixUnit = (pValue: string | number): string => {
    // exit
    if (pValue === null) return;

    // if is a string
    if (typeof pValue === "string") {
      return thereIsOnlyNumberInString(pValue) ? `${pValue}px` : pValue;
    }
    // if is number
    else if (typeof pValue === "number") {
      return `${pValue}px`;
    }
  };

  // --------------------------------------------------------------------------- SIZE

  /**
   * Select a reference object (windowSize or rootRect) + a reference property (width or height)
   * It depend of orientation.
   *
   * ex:
   * If "pSelectObject" is set to ESizeObject.WINDOW_SIZE (it select windowSize Object)
   * and orientation is vertical (select width properties)
   * it returns: windowSize.width
   *
   * @param pSelectObject
   * @param pOrientation
   * @param pSizeObject
   * @param pWindowSize
   * @param pRootRect
   * @return object.width or object.height
   */
  const sizeReference = ({
    pSelectObject,
    pOrientation = props.orientation,
    pWindowSize = windowSize,
    pRootRect = rootRect
  }: {
    pSelectObject: ESizeObject;
    pOrientation?: EOrientation;
    pWindowSize?: IWindowSize;
    pRootRect?: ClientRect | DOMRect;
  }): number => {
    // create object ref
    let objectRef;
    // select object ref
    if (pSelectObject === ESizeObject.WINDOW_SIZE) objectRef = pWindowSize;
    else if (pSelectObject === ESizeObject.ROOT_RECT) objectRef = pRootRect;

    // select object key depend of orientation
    if (pOrientation === EOrientation.VERTICAL) return objectRef?.width;
    else if (pOrientation === EOrientation.HORIZONTAL) return objectRef?.height;
  };

  // --------------------------------------------------------------------------- STYLE

  /**
   * Set root DOM element style
   * @param pMaxSize
   * @param pCenter
   * @param pWindowSize
   * @param pOrientation
   */
  const rootStyle = (
    pMaxSize = props.maxSize,
    pCenter = props.center,
    pWindowSize = windowSize,
    pOrientation = props.orientation
  ): CSSProperties => {
    // check if we are in strech view
    let isStrech = pWindowSize?.height < pMaxSize;

    if (pOrientation === EOrientation.VERTICAL) {
      return {
        pointerEvents: "none",
        position: "fixed",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        marginLeft: pCenter ? "auto" : null,
        marginRight: pCenter ? "auto" : null,
        maxWidth: fixUnit(pMaxSize)
      };
    }

    if (pOrientation === EOrientation.HORIZONTAL) {
      return {
        pointerEvents: "none",
        position: "fixed",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        marginTop:
          // if is Center mode
          pCenter
            ? // if is strech version
              isStrech
              ? // no margin top
                "0"
              : // if not strech, we need to center the container with margin top calc
                `calc((${pWindowSize.height}px - ${fixUnit(pMaxSize)}) / 2)`
            : // if no center mode, there is no margin-top
              null,
        maxHeight: fixUnit(pMaxSize)
      };
    }
  };

  /**
   * Colums list
   * @param pOrientation
   */
  const columnsListStyle = ({
    pOrientation = props.orientation
  } = {}): CSSProperties => {
    if (pOrientation === EOrientation.VERTICAL) {
      return {
        display: "flex",
        flexWrap: "nowrap",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%"
      };
    }
    if (pOrientation === EOrientation.HORIZONTAL) {
      return {
        display: "flex",
        flexWrap: "nowrap",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%"
      };
    }
  };

  /**
   * Set column style, depend of props
   * @param pIndex
   * @param pWidth
   * @param pColumnNumber
   * @param pGutterSize
   * @param pColor
   */
  const columnStyle = ({
    pIndex,
    pColumnNumber = props.columnsNumber,
    pGutterSize = props.gutterSize,
    pColor = props.color
  }: {
    pIndex: number;
    pColumnNumber?: number;
    pGutterSize?: number | string;
    pColor?: string;
  }): CSSProperties => {
    // calc Width and height value
    // prettier ignore
    const widthHeightCalc = `calc(
        (
          ${fixUnit(sizeReference({ pSelectObject: ESizeObject.ROOT_RECT }))} 
          / ${pColumnNumber}
        ) 
        - ${fixUnit(pGutterSize)}
        + ${fixUnit(pGutterSize)} / ${pColumnNumber}
    )`;

    /**
     * One Column style if the NO gutterSize
     * We show only a simple line
     */
    if (pGutterSize === 0 || fixUnit(pGutterSize) === "0px") {
      if (props.orientation === EOrientation.VERTICAL) {
        return {
          width: widthHeightCalc,
          height: "100vh",
          borderLeft: `${pColor} 1px solid`,
          borderRight: pIndex === pColumnNumber - 1 && `${pColor} 1px solid`
        };
      } else if (props.orientation === EOrientation.HORIZONTAL) {
        return {
          height: widthHeightCalc,
          width: "100vw",
          borderTop: `${pColor} 1px solid`,
          borderBottom: pIndex === pColumnNumber - 1 && `${pColor} 1px solid`
        };
      }

      /**
       * One Column grid style if there is a gutterSize
       * Wz apply background-color on the column
       */
    } else {
      if (props.orientation === EOrientation.VERTICAL) {
        return {
          width: widthHeightCalc,
          height: "100vh",
          backgroundColor: pColor
        };
      }

      if (props.orientation === EOrientation.HORIZONTAL) {
        return {
          height: widthHeightCalc,
          width: "100vw",
          backgroundColor: pColor
        };
      }
    }
  };

  // --------------------------------------------------------------------------- RENDER

  return (
    <div className={component} ref={rootRef} style={rootStyle()}>
      <div className={`${component}_columns`} style={columnsListStyle()}>
        {new Array(props.columnsNumber).fill(null).map((e, i) => (
          <span
            key={i}
            className={`${component}_column`}
            style={columnStyle({ pIndex: i })}
          />
        ))}
      </div>
    </div>
  );
}

export { GridLayout, EOrientation };
