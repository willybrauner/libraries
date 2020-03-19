import React, { CSSProperties, useRef } from "react";
import useBoundingClientRect, {
  EListener
} from "@wbe/use-bounding-client-rect";
import useWindowSize, { IWindowSize } from "@wbe/use-window-size";

// init
const component: string = "GridLayout";
const debug = require("debug")(`lib:${component}`);

export enum EOrientation {
  VERTICAL,
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

  // FIXME remettre en vertical
  orientation: EOrientation.HORIZONTAL
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

  // --------------------------------------------------------------------------- SIZE

  /**
   * Select Size reference depend of orientation
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

  /**
   * Select container size reference
   * TODO pas très clair pourquoi pas le meme traitement que pMax soit un string ou non :/
   * @param pMaxSize
   */
  const containerSizeReference = (pMaxSize = props?.maxSize): number => {
    // cas max size is a string
    if (typeof pMaxSize === "string") {
      return sizeReference({ pSelectObject: ESizeObject.ROOT_RECT });
    }
    // case max width is a number or null
    else if (typeof pMaxSize === "number" || pMaxSize === null) {
      return (
        // if screen is smaller than max width
        sizeReference({ pSelectObject: ESizeObject.WINDOW_SIZE }) > pMaxSize
          ? // ref is element size
            sizeReference({ pSelectObject: ESizeObject.ROOT_RECT })
          : // else, if screen is bigger than max width, ref is window width
            sizeReference({ pSelectObject: ESizeObject.WINDOW_SIZE })
      );
    }
  };

  // --------------------------------------------------------------------------- STYLE

  /**
   * Set root DOM element style
   * @param pMaxSize
   * @param pCenter
   * @param pOrientation
   */
  const rootStyle = (
    pMaxSize = props.maxSize,
    pCenter = props.center,
    pOrientation = props.orientation
  ): CSSProperties | null => {
    if (
      // if max width is null
      pMaxSize === null ||
      // or if max-width is a number & is bigger than window width
      (typeof pMaxSize === "number" &&
        pMaxSize > sizeReference({ pSelectObject: ESizeObject.WINDOW_SIZE }))
    ) {
      // do not continue
      return null;
    }
    // return style for root element
    return {
      marginLeft:
        pOrientation === EOrientation.VERTICAL && pCenter ? "auto" : null,
      marginRight:
        pOrientation === EOrientation.VERTICAL && pCenter ? "auto" : null,

      // TODO positionner le container si center en HORIZONTAL sur l'axe vertical
      // TODO CONTINUER ICI

      // prettier-ignore
      ...(pOrientation === EOrientation.VERTICAL
        ? {maxWidth: fixUnit(pMaxSize)}
        : {}
      ),
      // prettier-ignore
      ...(pOrientation === EOrientation.HORIZONTAL
        ? {maxHeight: fixUnit(pMaxSize)}
        : {}
      )
    };
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
    // if there is no gutter, we apply pColor on border right
    if (pGutterSize === 0 || fixUnit(pGutterSize) === "0px") {
      // vertical
      if (props.orientation === EOrientation.VERTICAL) {
        return {
          // prettier-ignore
          width: `calc(${fixUnit(containerSizeReference())} / ${pColumnNumber} - ${fixUnit(pGutterSize)})`,
          borderLeft: `${pColor} 1px solid`,
          borderRight: pIndex === pColumnNumber - 1 && `${pColor} 1px solid`
        };
      }

      if (props.orientation === EOrientation.HORIZONTAL) {
      }

      // if a gutter size is set, we use this gutter
      // and apply color on gutter background
    } else {
      // define key orientation
      const key =
        props.orientation === EOrientation.VERTICAL ? "width" : "height";

      return {
        // prettier-ignore
        [key]: `calc(${fixUnit(containerSizeReference())} / ${pColumnNumber} - ${fixUnit(pGutterSize)})`,
        backgroundColor: pColor
      };
    }
  };

  // --------------------------------------------------------------------------- CSS

  /**
   * Define DOM elements style
   */
  const vertivalCss: { [x: string]: CSSProperties } = {
    root: {
      position: "fixed",
      top: "0",
      bottom: "0",
      left: "0",
      right: "0"
    },
    columns: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "space-between",
      width: "100%"
    },
    column: {
      height: "100vh"
    }
  };

  const horizontalCss: { [x: string]: CSSProperties } = {
    root: {
      position: "fixed",
      top: "0",
      bottom: "0",
      left: "0",
      right: "0"
    },
    columns: {
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      justifyContent: "space-between",
      height: "100%"
    },
    column: {
      width: "100vw"
    }
  };

  // css state
  const css =
    props.orientation === EOrientation.VERTICAL ? vertivalCss : horizontalCss;

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

export { GridLayout as default };
