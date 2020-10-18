type EBreakpoints = { [x: string]: string };

/**
 * ResponsiveManager
 */
class ResponsiveManager {
  // list of breakpoints
  protected _breakpoints: EBreakpoints;

  constructor(breakpoints: EBreakpoints) {
    this._breakpoints = breakpoints;
  }

  // protected static _instance: ResponsiveManager;
  //
  // public static get instance(): ResponsiveManager {
  //   if (ResponsiveManager._instance == null) {
  //     ResponsiveManager._instance = new ResponsiveManager();
  //   }
  //   return ResponsiveManager._instance;
  // }

  public minWidth(breakpoint: EBreakpoints, addLastPixel) {}
  public maxWidth(breakpoint: EBreakpoints, addLastPixel) {}
  public minHeight(breakpoint: EBreakpoints, addLastPixel) {}
  public maxHeight(breakpoint: EBreakpoints, addLastPixel) {}
}

export { ResponsiveManager };
