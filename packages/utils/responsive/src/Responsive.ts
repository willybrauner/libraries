export enum EOrientation {
  PORTRAIT = "portrait",
  LANDSCAPE = "landscape",
  SQUARE = "square",
}

/**
 * ResponsiveManager
 */
class Responsive {
  /**
   * Min width
   * @param breakpoint
   * @param includeBreakpoint
   */
  public static isMinWidth(
    breakpoint: string,
    includeBreakpoint: boolean = false
  ): boolean {
    if (typeof window !== "object") return;
    return includeBreakpoint
      ? window.innerWidth > parseFloat(breakpoint)
      : window.innerWidth >= parseFloat(breakpoint);
  }

  /**
   * Max width
   * @param breakpoint
   * @param includeBreakpoint
   */
  public static isMaxWidth(
    breakpoint: string,
    includeBreakpoint: boolean = false
  ): boolean {
    if (typeof window !== "object") return;
    return includeBreakpoint
      ? window.innerWidth < parseFloat(breakpoint)
      : window.innerWidth <= parseFloat(breakpoint);
  }

  /**
   * Min height
   * @param breakpoint
   * @param includeBreakpoint
   */
  public static isMinHeight(
    breakpoint: string,
    includeBreakpoint: boolean = false
  ): boolean {
    if (typeof window !== "object") return;
    return includeBreakpoint
      ? window.innerHeight > parseFloat(breakpoint)
      : window.innerHeight >= parseFloat(breakpoint);
  }

  /**
   * Max height
   * @param breakpoint
   * @param includeBreakpoint
   */
  public static isMaxHeight(
    breakpoint: string,
    includeBreakpoint: boolean = false
  ): boolean {
    if (typeof window !== "object") return;
    return includeBreakpoint
      ? window.innerHeight < parseFloat(breakpoint)
      : window.innerHeight <= parseFloat(breakpoint);
  }

  /**
   * Return current viewport orientation
   */
  public static orientation(): EOrientation {
    if (typeof window !== "object") return;
    if (window.innerWidth > window.innerHeight) {
      return EOrientation.LANDSCAPE;
    } else if (window.innerWidth < window.innerHeight) {
      return EOrientation.PORTRAIT;
    } else if (window.innerWidth === window.innerHeight) {
      return EOrientation.SQUARE;
    }
  }
}

export { Responsive };
