(window.webpackJsonp = window.webpackJsonp || []).push([
  [0],
  {
    144: function(module, exports, __webpack_require__) {
      "use strict";
      var __importDefault =
          (this && this.__importDefault) ||
          function(mod) {
            return mod && mod.__esModule ? mod : { default: mod };
          },
        __importStar =
          (this && this.__importStar) ||
          function(mod) {
            if (mod && mod.__esModule) return mod;
            var result = {};
            if (null != mod)
              for (var k in mod)
                Object.hasOwnProperty.call(mod, k) && (result[k] = mod[k]);
            return (result.default = mod), result;
          };
      Object.defineProperty(exports, "__esModule", { value: !0 });
      const react_1 = __webpack_require__(0),
        use_window_size_1 = __importDefault(__webpack_require__(54)),
        use_bounding_client_rect_1 = __importStar(__webpack_require__(66)),
        log = __webpack_require__(767)("libraries:react-hooks:useIsInViewport");
      exports.default = function useIsInViewport(
        pRef,
        pToggleVisibility = !1,
        pOffset = 0
      ) {
        const refRect = use_bounding_client_rect_1.default(
            pRef,
            use_bounding_client_rect_1.EListener.ON_SCROLL_AND_RESIZE
          ),
          windowSize = use_window_size_1.default(),
          [isVisible, setIsVisible] = react_1.useState(!1),
          updateState = react_1.useCallback(
            (pRefRect, pWindowSize, pOffset) => {
              if (
                ((pRefRect, pWindowSize, pOffset) => {
                  if (!pRefRect || !pWindowSize) return;
                  const topIsVisible =
                      pRefRect.top < pWindowSize.height - pOffset &&
                      pRefRect.top > 0,
                    bottomIsVisible =
                      pRefRect.bottom < pWindowSize.height &&
                      pRefRect.bottom - pOffset > 0,
                    isCropOrEgalOnTopAndBottom =
                      pRefRect.top <= 0 &&
                      pRefRect.bottom >= pWindowSize.height;
                  return (
                    log("conditions:", {
                      topIsVisible: topIsVisible,
                      bottomIsVisible: bottomIsVisible,
                      isCropOrEgalOnTopAndBottom: isCropOrEgalOnTopAndBottom
                    }),
                    topIsVisible ||
                      bottomIsVisible ||
                      isCropOrEgalOnTopAndBottom
                  );
                })(pRefRect, pWindowSize, pOffset)
              )
                setIsVisible(!0);
              else {
                if (isVisible && !pToggleVisibility) return;
                setIsVisible(!1);
              }
            },
            [refRect, windowSize]
          );
        return (
          react_1.useEffect(() => updateState(refRect, windowSize, pOffset), [
            refRect,
            windowSize
          ]),
          isVisible
        );
      };
    },
    202: function(module, __webpack_exports__, __webpack_require__) {
      "use strict";
      __webpack_exports__.a =
        '# @wbe/use-bounding-client-rect\r\n\r\nThis React hook allow to get dynamically `getBoundClientRect` of any React Ref.\r\n\r\n![](https://img.shields.io/npm/v/@wbe/use-bounding-client-rect/latest.svg)\r\n![](https://img.shields.io/bundlephobia/minzip/@wbe/use-bounding-client-rect.svg)\r\n![](https://img.shields.io/david/willybrauner/libraries.svg?path=packages%2Freact-hooks%2Fuse-bounding-client-rect)\r\n![](https://img.shields.io/npm/dt/@wbe/use-bounding-client-rect.svg)\r\n![](https://img.shields.io/npm/l/@wbe/use-bounding-client-rect.svg)\r\n\r\n## Installation\r\n\r\n```shell script\r\n$ npm install -S @wbe/use-bounding-client-rect\r\n```\r\n\r\n## How to use\r\n\r\nBasic usage:\r\n\r\n```jsx\r\n// ...\r\nimport useBoundingClientRect from "@wbe/use-window-size";\r\n\r\nconst App = () => {\r\n  // get ref\r\n  const rootRef = useRef();\r\n  // get window size\r\n  const refRect = useBoundingClientRect(rootRef);\r\n\r\n  return (\r\n    <div ref={rootRef}>\r\n      {refRect.x}, {refRect.y} ...\r\n    </div>\r\n  );\r\n};\r\n```\r\n\r\n## Parameters\r\n\r\n| params    | type                          | description      | default value     |\r\n| --------- | ----------------------------- | ---------------- | ----------------- |\r\n| pRef      | MutableRefObject<HTMLElement> | element ref      | /                 |\r\n| pListener | EListener                     | kind of listener | EListener.ON_INIT |\r\n\r\npListener options are:\r\n\r\n- `ON_INIT`: listen rect only on init\r\n- `ON_SCROLL`: listen rect on init + scroll\r\n- `ON_RESIZE`: listen rect on init + resize\r\n- `ON_SCROLL_AND_RESIZE`: listen rect on init + scroll + resize\r\n\r\n## Returned\r\n\r\nThe hook return an object (ClientRect interface):\r\n\r\n```\r\n{\r\n  "x": number,\r\n  "y": number,\r\n  "width": number,\r\n  "height": number,\r\n  "top": number,\r\n  "right": number,\r\n  "bottom": number,\r\n  "left": number\r\n}\r\n```\r\n';
    },
    203: function(module, __webpack_exports__, __webpack_require__) {
      "use strict";
      __webpack_exports__.a =
        '# @wbe/use-window-size\r\n\r\nThis React hook allow to get dynamically window dimensions.\r\n\r\n![](https://img.shields.io/npm/v/@wbe/use-window-size/latest.svg)\r\n![](https://img.shields.io/bundlephobia/minzip/@wbe/use-window-size.svg)\r\n![](https://img.shields.io/david/willybrauner/libraries.svg?path=packages%2Freact-hooks%2Fuse-window-size)\r\n![](https://img.shields.io/npm/dt/@wbe/use-window-size.svg)\r\n![](https://img.shields.io/npm/l/@wbe/use-window-size.svg)\r\n\r\n## Installation\r\n\r\n```shell script\r\n$ npm install -S @wbe/use-window-size\r\n```\r\n\r\n## How to use\r\n\r\n```jsx\r\n// ...\r\nimport useWindowSize from "@wbe/use-window-size";\r\n\r\nconst App = () => {\r\n  // get window size\r\n  const { width, height } = useWindowSize();\r\n\r\n  // Resize your browser and check width & height change.\r\n  return (\r\n    <ul>\r\n      <li>window width: {width}</li>\r\n      <li>window height: {height}</li>\r\n    </ul>\r\n  );\r\n};\r\n```\r\n\r\n## Returned\r\n\r\nThe hook return object who contains window dimensions:\r\n\r\n```\r\n{\r\n  "width": number,\r\n  "height": number\r\n}\r\n```\r\n';
    },
    21: function(module, __webpack_exports__, __webpack_require__) {
      "use strict";
      __webpack_require__.d(__webpack_exports__, "a", function() {
        return EImageType;
      }),
        __webpack_require__.d(__webpack_exports__, "b", function() {
          return ResponsiveImage;
        });
      var EImageType,
        _Users_willybrauner_Local_libraries_packages_storybook_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          342
        ),
        _Users_willybrauner_Local_libraries_packages_storybook_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          67
        ),
        _Users_willybrauner_Local_libraries_packages_storybook_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          29
        ),
        react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0),
        react__WEBPACK_IMPORTED_MODULE_3___default = __webpack_require__.n(
          react__WEBPACK_IMPORTED_MODULE_3__
        ),
        _wbe_use_bounding_client_rect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          66
        ),
        _wbe_use_bounding_client_rect__WEBPACK_IMPORTED_MODULE_4___default = __webpack_require__.n(
          _wbe_use_bounding_client_rect__WEBPACK_IMPORTED_MODULE_4__
        ),
        _wbe_use_is_in_viewport__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          144
        ),
        _wbe_use_is_in_viewport__WEBPACK_IMPORTED_MODULE_5___default = __webpack_require__.n(
          _wbe_use_is_in_viewport__WEBPACK_IMPORTED_MODULE_5__
        ),
        _wbe_use_responsive_image_data__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          335
        ),
        _wbe_use_responsive_image_data__WEBPACK_IMPORTED_MODULE_6___default = __webpack_require__.n(
          _wbe_use_responsive_image_data__WEBPACK_IMPORTED_MODULE_6__
        ),
        componentName = "ResponsiveImage",
        debug = __webpack_require__(325)("lib:".concat(componentName));
      (ResponsiveImage.defaultProps = {
        placeholder: !1,
        placeholderColor: "transparent",
        lazy: !1,
        lazyOffset: 0,
        ariaLabel: null,
        role: "img"
      }),
        (function(EImageType) {
          (EImageType.TAG_IMAGE = "tagImage"),
            (EImageType.BACKGROUND_IMAGE = "backgroundImage");
        })(EImageType || (EImageType = {}));
      var transparentImageUrl =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
      function ResponsiveImage(props) {
        var rootRef = Object(react__WEBPACK_IMPORTED_MODULE_3__.useRef)(null),
          rootRect = _wbe_use_bounding_client_rect__WEBPACK_IMPORTED_MODULE_4___default()(
            rootRef,
            _wbe_use_bounding_client_rect__WEBPACK_IMPORTED_MODULE_4__.EListener
              .ON_SCROLL_AND_RESIZE
          ),
          responsiveImage = _wbe_use_responsive_image_data__WEBPACK_IMPORTED_MODULE_6___default()(
            props.data,
            props.forceImageWidth
              ? props.forceImageWidth
              : rootRect && rootRect.width
          ),
          _useState = Object(react__WEBPACK_IMPORTED_MODULE_3__.useState)(
            transparentImageUrl
          ),
          _useState2 = Object(
            _Users_willybrauner_Local_libraries_packages_storybook_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__.a
          )(_useState, 2),
          requiredURL = _useState2[0],
          setRequiredURL = _useState2[1];
        Object(react__WEBPACK_IMPORTED_MODULE_3__.useLayoutEffect)(
          function() {
            (null == props ? void 0 : props.data) &&
              (debug(
                "useResponsiveImageData hook return image data object",
                responsiveImage
              ),
              setRequiredURL(
                props.lazy
                  ? transparentImageUrl
                  : null == responsiveImage
                  ? void 0
                  : responsiveImage.url
              ));
          },
          [responsiveImage]
        );
        var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_3__.useState)(
            !1
          ),
          _useState4 = Object(
            _Users_willybrauner_Local_libraries_packages_storybook_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__.a
          )(_useState3, 2),
          imageIsPreLoaded = _useState4[0],
          setImageIsPreLoaded = _useState4[1],
          isInViewport = _wbe_use_is_in_viewport__WEBPACK_IMPORTED_MODULE_5___default()(
            rootRef,
            !1,
            props.lazyOffset
          );
        Object(react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(
          function() {
            var preloadedHandler = function preloadedHandler() {
              setImageIsPreLoaded(!0);
            };
            if (props.lazy && isInViewport && responsiveImage) {
              if (!imageIsPreLoaded) {
                var $img = document.createElement("img");
                if ((($img.src = responsiveImage.url), !$img))
                  throw new Error("preloadImage lazy // error");
                $img.onload = function() {
                  preloadedHandler();
                };
              }
            } else setImageIsPreLoaded(!1);
            return function() {
              window.removeEventListener("load", preloadedHandler);
            };
          },
          [
            isInViewport,
            imageIsPreLoaded,
            null == responsiveImage ? void 0 : responsiveImage.url
          ]
        ),
          Object(react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(
            function() {
              props.lazy &&
                setRequiredURL(
                  imageIsPreLoaded && responsiveImage
                    ? null == responsiveImage
                      ? void 0
                      : responsiveImage.url
                    : transparentImageUrl
                );
            },
            [imageIsPreLoaded, responsiveImage]
          );
        var verticalRatio = Object(
            react__WEBPACK_IMPORTED_MODULE_3__.useCallback
          )(
            function() {
              var pResponsiveImage =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : responsiveImage,
                pCustomRatio =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : props.forceVerticalRatio;
              if (pResponsiveImage)
                return (
                  pCustomRatio ||
                  (pResponsiveImage.ratio
                    ? pResponsiveImage.ratio
                    : pResponsiveImage.width && pResponsiveImage.height
                    ? pResponsiveImage.height / pResponsiveImage.width
                    : null)
                );
            },
            [responsiveImage, props.forceVerticalRatio]
          ),
          backgroundColorStyle = Object(
            react__WEBPACK_IMPORTED_MODULE_3__.useCallback
          )(
            function() {
              var pBackgroundColor =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : props.placeholderColor;
              return { backgroundColor: pBackgroundColor || null };
            },
            [props.placeholderColor]
          ),
          paddingRatioStyle = Object(
            react__WEBPACK_IMPORTED_MODULE_3__.useCallback
          )(
            function() {
              var pRatio =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : verticalRatio();
              return {
                paddingBottom: pRatio
                  ? "".concat(Math.round(100 * pRatio), "%")
                  : null
              };
            },
            [verticalRatio]
          ),
          backgroundImageStyle = Object(
            react__WEBPACK_IMPORTED_MODULE_3__.useCallback
          )(
            function() {
              var pRequiredURL =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : requiredURL;
              return {
                backgroundImage: pRequiredURL
                  ? 'url("'.concat(pRequiredURL, '")')
                  : null
              };
            },
            [requiredURL]
          ),
          imageElementPosition = {
            display: "block",
            position: "absolute",
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
            width: "100%",
            height: "100%"
          },
          classBlock = [
            componentName,
            "".concat(componentName, "-").concat(props.type),
            props.lazy
              ? ""
                  .concat(componentName, "-")
                  .concat(imageIsPreLoaded ? "lazyloaded" : "lazyload")
              : "",
            props.placeholderColor
              ? "".concat(componentName, "-placeholderColor")
              : ""
          ]
            .concat(
              Object(
                _Users_willybrauner_Local_libraries_packages_storybook_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__.a
              )(
                (null == props
                ? void 0
                : props.classNames)
                  ? props.classNames
                  : []
              )
            )
            .filter(function(v) {
              return v;
            })
            .join(" ");
        return responsiveImage &&
          (null == responsiveImage ? void 0 : responsiveImage.url) &&
          requiredURL
          ? props.type === EImageType.TAG_IMAGE
            ? (function imageTagRender() {
                return (null == props ? void 0 : props.lazy) ||
                  (null == props ? void 0 : props.placeholder)
                  ? react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(
                      "div",
                      {
                        className: classBlock,
                        ref: rootRef,
                        style: null == props ? void 0 : props.rootStyle
                      },
                      react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(
                        "div",
                        {
                          className: "".concat(componentName, "_wrapper"),
                          style: Object(
                            _Users_willybrauner_Local_libraries_packages_storybook_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__.a
                          )(
                            { position: "relative", overflow: "hidden" },
                            backgroundColorStyle(),
                            {},
                            paddingRatioStyle()
                          )
                        },
                        react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(
                          "img",
                          {
                            className: "".concat(componentName, "_image"),
                            src: requiredURL,
                            alt: props.alt,
                            role: props.role,
                            "aria-label":
                              null == props ? void 0 : props.ariaLabel,
                            style: Object(
                              _Users_willybrauner_Local_libraries_packages_storybook_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__.a
                            )(
                              { objectFit: "cover" },
                              imageElementPosition,
                              {},
                              props.imageStyle
                            )
                          }
                        )
                      )
                    )
                  : react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(
                      "img",
                      {
                        className: classBlock,
                        ref: rootRef,
                        src: requiredURL,
                        alt: null == props ? void 0 : props.alt,
                        style: null == props ? void 0 : props.imageStyle,
                        "aria-label": null == props ? void 0 : props.ariaLabel,
                        role: props.role
                      }
                    );
              })()
            : props.type === EImageType.BACKGROUND_IMAGE
            ? (function backgroundImageRender() {
                return (null == props ? void 0 : props.lazy) ||
                  (null == props ? void 0 : props.placeholder)
                  ? react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(
                      "div",
                      {
                        className: classBlock,
                        ref: rootRef,
                        style: null == props ? void 0 : props.rootStyle
                      },
                      react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(
                        "div",
                        {
                          className: "".concat(componentName, "_wrapper"),
                          style: Object(
                            _Users_willybrauner_Local_libraries_packages_storybook_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__.a
                          )(
                            { position: "relative", overflow: "hidden" },
                            backgroundColorStyle(),
                            {},
                            paddingRatioStyle()
                          )
                        },
                        react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(
                          "div",
                          {
                            className: "".concat(componentName, "_image"),
                            children: props.children,
                            "aria-label":
                              null == props ? void 0 : props.ariaLabel,
                            role: props.role,
                            style: Object(
                              _Users_willybrauner_Local_libraries_packages_storybook_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__.a
                            )(
                              {},
                              backgroundImageStyle(),
                              {},
                              imageElementPosition,
                              {},
                              null == props ? void 0 : props.imageStyle
                            )
                          }
                        )
                      )
                    )
                  : react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(
                      "div",
                      {
                        className: classBlock,
                        ref: rootRef,
                        children: null == props ? void 0 : props.children,
                        "aria-label": null == props ? void 0 : props.ariaLabel,
                        role: props.role,
                        style: Object(
                          _Users_willybrauner_Local_libraries_packages_storybook_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__.a
                        )(
                          {},
                          backgroundImageStyle(),
                          {},
                          null == props ? void 0 : props.imageStyle
                        )
                      }
                    );
              })()
            : void 0
          : null;
      }
    },
    332: function(module, exports, __webpack_require__) {
      "use strict";
      var __importStar =
          (this && this.__importStar) ||
          function(mod) {
            if (mod && mod.__esModule) return mod;
            var result = {};
            if (null != mod)
              for (var k in mod)
                Object.hasOwnProperty.call(mod, k) && (result[k] = mod[k]);
            return (result.default = mod), result;
          },
        __importDefault =
          (this && this.__importDefault) ||
          function(mod) {
            return mod && mod.__esModule ? mod : { default: mod };
          };
      Object.defineProperty(exports, "__esModule", { value: !0 });
      const react_1 = __importStar(__webpack_require__(0)),
        use_bounding_client_rect_1 = __importStar(__webpack_require__(66)),
        use_window_size_1 = __importDefault(__webpack_require__(54));
      GridLayout.defaultProps = {
        columnsNumber: 12,
        gutterSize: 20,
        showGridByDefault: !1,
        color: "rgba(255, 0, 0, 0.14)",
        maxWidth: null
      };
      function GridLayout(props) {
        const rootRef = react_1.useRef(null),
          rootRect = use_bounding_client_rect_1.default(
            rootRef,
            use_bounding_client_rect_1.EListener.ON_SCROLL_AND_RESIZE
          ),
          windowSize = use_window_size_1.default();
        return react_1.default.createElement(
          "div",
          {
            className: "GridLayout",
            style: Object.assign(
              Object.assign({}, css.root),
              ((pMaxWidth, pWindowWidth) => {
                if (!(null == pMaxWidth || pMaxWidth > pWindowWidth))
                  return {
                    marginLeft: "auto",
                    marginRight: "auto",
                    maxWidth: pMaxWidth
                  };
              })(props.maxWidth, null == windowSize ? void 0 : windowSize.width)
            ),
            ref: rootRef
          },
          react_1.default.createElement(
            "div",
            { className: "GridLayout_columns", style: css.columns },
            new Array(props.columnsNumber).fill(null).map((e, i) => {
              return react_1.default.createElement("span", {
                className: "GridLayout_column",
                key: i,
                style: Object.assign(
                  Object.assign({}, css.column),
                  ((pWidth =
                    (null == windowSize ? void 0 : windowSize.width) >
                    (null == props ? void 0 : props.maxWidth)
                      ? rootRect && rootRect.width
                      : null == windowSize
                      ? void 0
                      : windowSize.width),
                  (pColumnNumber = props.columnsNumber),
                  (pGutter = props.gutterSize),
                  (pColor = props.color),
                  (pIndex = i),
                  0 === pGutter
                    ? {
                        width: pWidth / pColumnNumber,
                        borderRight:
                          pIndex + 1 === pColumnNumber
                            ? null
                            : `${pColor} 1px solid`
                      }
                    : {
                        width:
                          pWidth / pColumnNumber -
                          pGutter +
                          pGutter / pColumnNumber,
                        backgroundColor: pColor
                      })
                )
              });
              var pWidth, pColumnNumber, pGutter, pColor, pIndex;
            })
          )
        );
      }
      exports.default = GridLayout;
      const css = {
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
        column: { height: "100vh" }
      };
    },
    333: function(module, __webpack_exports__, __webpack_require__) {
      "use strict";
      __webpack_exports__.a =
        '# @wbe/react-grid-layout\r\n\r\nThis component allow to display a simple fixed grid layout on front of your react app.\r\n\r\n![](https://img.shields.io/npm/v/@wbe/react-grid-layout/latest.svg)\r\n![](https://img.shields.io/bundlephobia/minzip/@wbe/react-grid-layout.svg)\r\n![](https://img.shields.io/david/willybrauner/libraries.svg?path=packages%2Freact-components%2Freact-grid-layout)\r\n![](https://img.shields.io/npm/dt/@wbe/react-grid-layout.svg)\r\n![](https://img.shields.io/npm/l/@wbe/react-grid-layout.svg)\r\n\r\n![screen](https://i.gyazo.com/c1c179ee4453e2a7d1d62f2a17837f70.png)\r\n\r\n## Installation\r\n\r\n```shell script\r\n$ npm install -S @wbe/react-grid-layout\r\n```\r\n\r\n## How to use\r\n\r\nImport `<GridLayout />` component anywhere.\r\n\r\n```jsx\r\n// ...\r\nimport GridLayout from "@wbe/react-grid-layout";\r\n\r\nexport const App = () => {\r\n  return (\r\n    <div>\r\n      <GridLayout />\r\n    </div>\r\n  );\r\n};\r\n```\r\n\r\n## Props\r\n\r\n[GridLayout component](src/index.tsx) contains default props, you can overwrite as you need:\r\n\r\n| props         | type   | description                         | default value         |\r\n| ------------- | ------ | ----------------------------------- | --------------------- |\r\n| columnsNumber | number | Number of columns                   | 12                    |\r\n| gutterSize    | number | Size of gutter between columns (px) | 20                    |\r\n| color         | string | Set custom column Grid              | rgba(255, 0, 0, 0.14) |\r\n| maxWidth      | number | Set a max width on the container    | null                  |\r\n\r\nexample:\r\n\r\n```typescript jsx\r\n<GridLayout columnsNumber={6} gutterSize={10} />\r\n```\r\n\r\n## Tips\r\n\r\nIf you need to display a simple Grid Line Layout without gutter, set `gutterSize` props to `0`.\r\n';
    },
    334: function(module, __webpack_exports__, __webpack_require__) {
      "use strict";
      __webpack_exports__.a =
        '# @wbe/react-responsive-image\r\n\r\nreact-responsive-image is a React component allowing to display a simple `<img />` tag or\r\na `<div />` background-image who will set the appropriate thumbnail in src or url attribute,\r\naccording to a defined width.\r\n\r\nWe should never choose how to show an image based on stylistic rendering.\r\nThis is why this component makes the same rendering options possible, regardless of the sementic choice;\r\nTag HTML image or background image.\r\n\r\nThis component is a wrapper DOM rendering of `@wbe/use-responsive-image-data`.\r\n\r\n![](https://img.shields.io/npm/v/@wbe/react-responsive-image/latest.svg)\r\n![](https://img.shields.io/bundlephobia/minzip/@wbe/react-responsive-image.svg)\r\n![](https://img.shields.io/david/willybrauner/libraries.svg?path=packages%2Freact-components%2Freact-responsive-image)\r\n![](https://img.shields.io/npm/dt/@wbe/react-responsive-image.svg)\r\n![](https://img.shields.io/npm/l/@wbe/react-responsive-image.svg)\r\n\r\n## Installation\r\n\r\n```shell script\r\n$ npm install @wbe/react-responsive-image\r\n```\r\n\r\n## How to use\r\n\r\nBasic usage return a responsive image with `<img />` tag:\r\n\r\n```tsx\r\nimport { reactResponsiveImage } from "@wbe/react-responsive-image";\r\n\r\nconst thumbs = [\r\n  {\r\n    url: "my/image/1.jpg",\r\n    width: 640,\r\n    height: 480\r\n  },\r\n  {\r\n    url: "my/image/2.jpg",\r\n    width: 1024,\r\n    height: 800\r\n  }\r\n];\r\nconst App = () => {\r\n  return <ResponsiveImage type={EImageType.IMAGE_TAG} data={thumbs} />;\r\n};\r\n```\r\n\r\nWill returned this HTML DOM structure:\r\n\r\n```html\r\n<img\r\n  class="ResponsiveImage ResponsiveImage-tagImage"\r\n  src="my/image/1.jpg"\r\n  role="img"\r\n/>\r\n```\r\n\r\n## Options\r\n\r\n### Placeholder\r\n\r\nA placeholder can be set behind the image via `placeholder` props. Placeholder\r\nratio size is calc via image dimensions and allow to define an image wrapper\r\nwho take image dimension.\r\n\r\n```tsx\r\n<ResponsiveImage type={EImageType.IMAGE_TAG} data={thumbs} placeholder={true} />\r\n```\r\n\r\nA background-color can be set to this placeholder via `placeholderColor` props.\r\n\r\n```tsx\r\n<ResponsiveImage\r\n  type={EImageType.IMAGE_TAG}\r\n  data={thumbs}\r\n  placeholder={true}\r\n  placeholderColor={"#EEE"}\r\n/>\r\n```\r\n\r\nTo set a placeholder, DOM structure need to returned image with additional wrapper.\r\n\r\n```html\r\n<div class="ResponsiveImage ResponsiveImage-tagImage ...">\r\n  \x3c!-- wrapper used to set a padding bottom ratio --\x3e\r\n  <div class="ResponsiveImage_wrapper" style="...">\r\n    <img class="ResponsiveImage_image" role="img" src="..." style="..." />\r\n  </div>\r\n</div>\r\n```\r\n\r\nNote: if `lazy` props is set, placeholder is automaticaly enable with default transparent\r\nplaceholder color.\r\n\r\nWARNING: `object-fit: cover` is used to get the same effect than `background-size: cover` for background-image.\r\nCheck [can i use](https://caniuse.com/#search=object-fit) compatibility.\r\n\r\n### Lazyload\r\n\r\n`ResponsiveImage` as lazyload option. A small transparent base64 image will set in `src` util\r\nthe image is visible in window.\r\n\r\n```tsx\r\n<ResponsiveImage type={EImageType.IMAGE_TAG} data={thumbs} lazy={true} />\r\n```\r\n\r\nYou can prevent image loading with `lazyOffset` props.\r\nexample: -40 allow to preload image when it\'s top or bottom is to 40 pixels before\r\nor after border window.\r\n\r\n```tsx\r\n<ResponsiveImage\r\n  type={EImageType.IMAGE_TAG}\r\n  data={thumbs}\r\n  lazy={true}\r\n  lazyOffset={-40}\r\n/>\r\n```\r\n\r\nBefore the element is visible in viewport, `ResponsiveImage` will returned:\r\n\r\n```html\r\n<div class="ResponsiveImage ResponsiveImage-tagImage ResponsiveImage-lazyload">\r\n  <div class="ResponsiveImage_wrapper">\r\n    <img\r\n      class="ResponsiveImage_image"\r\n      src="data:image/png;base64..."\r\n      role="img"\r\n    />\r\n  </div>\r\n</div>\r\n```\r\n\r\n### Ratio\r\n\r\nImage ratio is automatically calc via image dimension, but it\'s possible to force\r\na custom vertical ratio via `forceVerticalRatio` props.\r\n\r\n```tsx\r\n<ResponsiveImage\r\n  type={EImageType.IMAGE_TAG}\r\n  data={thumbs}\r\n  placeholder={true}\r\n  placeholderColor={"#EEE"}\r\n  forceVerticalRatio={1.4}\r\n/>\r\n```\r\n\r\n### Tab props\r\n\r\n| props (\\* non optional) | type          | description                                                                     | default value |\r\n| ----------------------- | ------------- | ------------------------------------------------------------------------------- | ------------- |\r\n| classNames              | string[]      | class list                                                                      | /             |\r\n| **type** \\*             | EImageType    | TAG_IMAGE / BACKGROUND_IMAGE                                                    | /             |\r\n| **data** \\*             | IImage[]      | image object array                                                              | /             |\r\n| alt                     | string        | image alt attribute                                                             | /             |\r\n| children                | ReactNode     | add children only if type is EImageType.BACKGROUND_IMAGE                        | /             |\r\n| lazy                    | boolean       | active lazyloading                                                              | false         |\r\n| lazyOffset              | number        | load image at X pixel(s) of top/bottom window                                   | 0             |\r\n| forceImageWidth         | number        | force to display the image whose size is closest to the value provided in pixel | /             |\r\n| forceVerticalRatio      | number        | force a custom vertical ratio to the image                                      | /             |\r\n| placeholder             | boolean       | show a placeholder behind the image calc with image dimension                   | false         |\r\n| placeholderColor        | string        | set a background color to the placeholder                                       | transparent   |\r\n| rootStyle               | CSSProperties | style first child dom node                                                      | /             |\r\n| imageStyle              | CSSProperties | style image dom node                                                            | /             |\r\n| ariaLabel               | string / null | aria description of element                                                     | /             |\r\n| role                    | string        | role of element                                                                 | img           |\r\n';
    },
    335: function(module, exports, __webpack_require__) {
      "use strict";
      var __importDefault =
        (this && this.__importDefault) ||
        function(mod) {
          return mod && mod.__esModule ? mod : { default: mod };
        };
      Object.defineProperty(exports, "__esModule", { value: !0 });
      const react_1 = __webpack_require__(0),
        react_2 = __webpack_require__(0),
        use_window_size_1 = __importDefault(__webpack_require__(54));
      exports.default = function useResponsiveImageData(
        pImages,
        pWidth = null
      ) {
        const windowSize = use_window_size_1.default(),
          getImageDataObject = (pImages, pWidth) => {
            if (!pImages) return;
            const imagesWidth = pImages
                .map(el => (null == el ? void 0 : el.width))
                .sort((a, b) => a - b)
                .filter(el => el > pWidth),
              biggestImage = pImages.reduce(
                (a, b) => ((a.width || 0) > b.width ? a : b),
                pImages[0]
              ),
              filtered = pImages
                .map(el =>
                  el.width === imagesWidth[0]
                    ? el
                    : biggestImage.width <= pWidth
                    ? biggestImage
                    : void 0
                )
                .filter(val => val);
            return filtered.length > 0 ? filtered[0] : null;
          },
          [responsiveImage, setResponsiveImage] = react_2.useState(
            getImageDataObject(pImages, pWidth)
          );
        return (
          react_1.useLayoutEffect(() => {
            const selectedWidth =
              pWidth || (null == windowSize ? void 0 : windowSize.width);
            setResponsiveImage(getImageDataObject(pImages, selectedWidth));
          }, [pWidth, windowSize]),
          responsiveImage
        );
      };
    },
    338: function(module, __webpack_exports__, __webpack_require__) {
      "use strict";
      __webpack_exports__.a =
        '# @wbe/use-is-in-viewport\r\n\r\nThis React hook allow to check if a specific ref element is visible in viewport.\r\n\r\n![](https://img.shields.io/npm/v/@wbe/use-is-in-viewport/latest.svg)\r\n![](https://img.shields.io/bundlephobia/minzip/@wbe/use-is-in-viewport.svg)\r\n![](https://img.shields.io/david/willybrauner/libraries.svg?path=packages%2Freact-hooks%2Fuse-is-in-viewport)\r\n![](https://img.shields.io/npm/dt/@wbe/use-is-in-viewport.svg)\r\n![](https://img.shields.io/npm/l/@wbe/use-is-in-viewport.svg)\r\n\r\n## Installation\r\n\r\n```shell script\r\n$ npm install -S @wbe/use-is-in-viewport\r\n```\r\n\r\n## How to use\r\n\r\n```jsx\r\n// ...\r\nimport { useIsInViewport } from "@wbe/use-is-in-viewport;";\r\n\r\n// Get element ref\r\nconst ref = useRef(null);\r\n// Check if is in viewport (hook return boolean)\r\nconst isInViewport = useIsInViewport(ref);\r\n\r\nuseEffect(() => {\r\n  console.log(isInViewport);\r\n});\r\n\r\nreturn <div ref={ref} />;\r\n```\r\n\r\n## Parameters\r\n\r\n| params            | type                          | description                                                                          | default value |\r\n| ----------------- | ----------------------------- | ------------------------------------------------------------------------------------ | ------------- |\r\n| pRef              | MutableRefObject<HTMLElement> | element ref                                                                          | /             |\r\n| pToogleVisibility | boolean                       | Repeat the check visibility even if ref element visibility is already passed to true | false         |\r\n| pOffset           | number                        | Define a positive or negative offset to the ref element                              | 0             |\r\n\r\n## Returned\r\n\r\nHook return a boolean.\r\n';
    },
    339: function(module, __webpack_exports__, __webpack_require__) {
      "use strict";
      __webpack_exports__.a =
        '# @wbe/use-responsive-image-data\r\n\r\nThis hook allow to get image object whose width is closest to the value provided in px.\r\n\r\n![](https://img.shields.io/npm/v/@wbe/use-responsive-image-data/latest.svg)\r\n![](https://img.shields.io/bundlephobia/minzip/@wbe/use-responsive-image-data.svg)\r\n![](https://img.shields.io/david/willybrauner/libraries.svg?path=packages%2Freact-hooks%2Fuse-responsive-image-data)\r\n![](https://img.shields.io/npm/dt/@wbe/use-responsive-image-data.svg)\r\n![](https://img.shields.io/npm/l/@wbe/use-responsive-image-data.svg)\r\n\r\n## Installation\r\n\r\n```shell script\r\n$ npm install @wbe/use-responsive-image-data\r\n```\r\n\r\n## How to use\r\n\r\nBasic usage:\r\n\r\n```jsx\r\nimport { useResponsiveImageData, IImage } from "@wbe/use-responsive-image-data";\r\n\r\nconst thumbs: IImage[] = [\r\n  {\r\n    url: "my/image/1.jpg",\r\n    width: 640,\r\n    height: 480\r\n  },\r\n  {\r\n    url: "my/image/2.jpg",\r\n    width: 1024,\r\n    height: 800\r\n  }\r\n];\r\n\r\nconst App = () => {\r\n  // will return the first object of thumbs array\r\n  // (640 is the up closest to 500)\r\n  const responsiveImageData: IImage = useResponsiveImageData(thumbs, 500);\r\n\r\n  // ...\r\n};\r\n```\r\n\r\n## Parameters\r\n\r\npImages: IImage[], pWidth?: number\r\n\r\n| params  | type     | description                        | default value |\r\n| ------- | -------- | ---------------------------------- | ------------- |\r\n| pImages | IImage[] | array of image object              | /             |\r\n| pWidth  | number   | with limit of image object we need | null          |\r\n\r\n- pWidth: if value is not set, dynamic window width will be set as width reference.\r\n\r\n## Returned\r\n\r\nThe hook return an IImage object:\r\n\r\n```\r\n{\r\n  "url": number,\r\n  "width": number,\r\n  "height": number\r\n}\r\n```\r\n';
    },
    340: function(module, __webpack_exports__, __webpack_require__) {
      "use strict";
      __webpack_require__.d(__webpack_exports__, "a", function() {
        return useResponsiveImageData;
      });
      var _Users_willybrauner_Local_libraries_packages_storybook_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          29
        ),
        react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0),
        _wbe_use_window_size__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          54
        ),
        _wbe_use_window_size__WEBPACK_IMPORTED_MODULE_2___default = __webpack_require__.n(
          _wbe_use_window_size__WEBPACK_IMPORTED_MODULE_2__
        );
      function useResponsiveImageData(pImages) {
        var pWidth =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : null,
          windowSize = _wbe_use_window_size__WEBPACK_IMPORTED_MODULE_2___default()(),
          getImageDataObject = function getImageDataObject(pImages, pWidth) {
            if (pImages) {
              var imagesWidth = pImages
                  .map(function(el) {
                    return null == el ? void 0 : el.width;
                  })
                  .sort(function(a, b) {
                    return a - b;
                  })
                  .filter(function(el) {
                    return el > pWidth;
                  }),
                biggestImage = pImages.reduce(function(a, b) {
                  return (a.width || 0) > b.width ? a : b;
                }, pImages[0]),
                filtered = pImages
                  .map(function(el) {
                    return el.width === imagesWidth[0]
                      ? el
                      : biggestImage.width <= pWidth
                      ? biggestImage
                      : void 0;
                  })
                  .filter(function(val) {
                    return val;
                  });
              return filtered.length > 0 ? filtered[0] : null;
            }
          },
          _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__.useState)(
            getImageDataObject(pImages, pWidth)
          ),
          _useState2 = Object(
            _Users_willybrauner_Local_libraries_packages_storybook_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__.a
          )(_useState, 2),
          responsiveImage = _useState2[0],
          setResponsiveImage = _useState2[1];
        return (
          Object(react__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect)(
            function() {
              var selectedWidth =
                pWidth || (null == windowSize ? void 0 : windowSize.width);
              setResponsiveImage(getImageDataObject(pImages, selectedWidth));
            },
            [pWidth, windowSize]
          ),
          responsiveImage
        );
      }
    },
    341: function(module, __webpack_exports__, __webpack_require__) {
      "use strict";
      __webpack_exports__.a =
        '# @wbe/fake-data-utils\r\n\r\nGenerate fake data image/text/video allowing to test UI components\r\n\r\n![](https://img.shields.io/npm/v/@wbe/fake-data-utils/latest.svg)\r\n![](https://img.shields.io/bundlephobia/minzip/@wbe/fake-data-utils.svg)\r\n![](https://img.shields.io/david/willybrauner/libraries.svg?path=packages%2Futils%2Ffake-data-utils)\r\n![](https://img.shields.io/npm/dt/@wbe/fake-data-utils.svg)\r\n![](https://img.shields.io/npm/l/@wbe/fake-data-utils.svg)\r\n\r\n## Installation\r\n\r\n```shell script\r\n$ npm install @wbe/fake-data-utils\r\n```\r\n\r\n## How to use\r\n\r\n```js\r\nimport { fakeDataGenerator } from "@wbe/fake-data-utils";\r\n```\r\n';
    },
    343: function(module, exports, __webpack_require__) {
      __webpack_require__(344),
        __webpack_require__(490),
        (module.exports = __webpack_require__(491));
    },
    405: function(module, exports) {},
    491: function(module, __webpack_exports__, __webpack_require__) {
      "use strict";
      __webpack_require__.r(__webpack_exports__),
        function(module) {
          var storybook_readme__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
              327
            ),
            _storybook_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
              15
            ),
            _storybook_theming__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
              328
            );
          Object(_storybook_react__WEBPACK_IMPORTED_MODULE_1__.addDecorator)(
            storybook_readme__WEBPACK_IMPORTED_MODULE_0__.addReadme
          ),
            Object(
              _storybook_react__WEBPACK_IMPORTED_MODULE_1__.addParameters
            )({
              options: {
                theme: Object(
                  _storybook_theming__WEBPACK_IMPORTED_MODULE_2__.create
                )({
                  base: "light",
                  brandTitle: "@wbe/libraries",
                  brandUrl: null,
                  brandImage: null
                }),
                readme: { codeTheme: "github" },
                isFullScreen: !1,
                showNav: !0,
                showPanel: !0,
                panelPosition: "right",
                sidebarAnimations: !0,
                enableShortcuts: !0,
                isToolshown: !0
              }
            }),
            Object(_storybook_react__WEBPACK_IMPORTED_MODULE_1__.configure)(
              __webpack_require__(748),
              module
            );
        }.call(this, __webpack_require__(62)(module));
    },
    54: function(module, exports, __webpack_require__) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: !0 });
      const react_1 = __webpack_require__(0);
      exports.default = function useWindowSize() {
        const [windowSize, setWindowSize] = react_1.useState({
          width:
            null === window || void 0 === window ? void 0 : window.innerWidth,
          height:
            null === window || void 0 === window ? void 0 : window.innerHeight
        });
        return (
          react_1.useEffect(() => {
            const resizeHandler = () => {
              setWindowSize({
                width:
                  null === window || void 0 === window
                    ? void 0
                    : window.innerWidth,
                height:
                  null === window || void 0 === window
                    ? void 0
                    : window.innerHeight
              });
            };
            return (
              resizeHandler(),
              window.addEventListener("resize", resizeHandler),
              () => {
                window.removeEventListener("resize", resizeHandler);
              }
            );
          }, []),
          windowSize
        );
      };
    },
    66: function(module, exports, __webpack_require__) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: !0 });
      const react_1 = __webpack_require__(0);
      var EListener;
      !(function(EListener) {
        (EListener[(EListener.ON_INIT = 0)] = "ON_INIT"),
          (EListener[(EListener.ON_SCROLL = 1)] = "ON_SCROLL"),
          (EListener[(EListener.ON_RESIZE = 2)] = "ON_RESIZE"),
          (EListener[(EListener.ON_SCROLL_AND_RESIZE = 3)] =
            "ON_SCROLL_AND_RESIZE");
      })(EListener || (EListener = {})),
        (exports.EListener = EListener),
        (exports.default = function useBoundingClientRect(
          pRef,
          pListener = EListener.ON_INIT
        ) {
          const [rect, setRect] = react_1.useState(null),
            getBoundingClientRect = react_1.useCallback(() => {
              var _a;
              return null === (_a = null == pRef ? void 0 : pRef.current) ||
                void 0 === _a
                ? void 0
                : _a.getBoundingClientRect();
            }, [pRef]),
            update = () => {
              setRect(getBoundingClientRect());
            };
          react_1.useEffect(() => {
            if (pRef.current)
              return (
                update(),
                (pListener !== EListener.ON_RESIZE &&
                  pListener !== EListener.ON_SCROLL_AND_RESIZE) ||
                  window.addEventListener("resize", update),
                (pListener !== EListener.ON_SCROLL &&
                  pListener !== EListener.ON_SCROLL_AND_RESIZE) ||
                  document.addEventListener("scroll", update),
                () => {
                  (pListener !== EListener.ON_RESIZE &&
                    pListener !== EListener.ON_SCROLL_AND_RESIZE) ||
                    window.removeEventListener("resize", update),
                    (pListener !== EListener.ON_SCROLL &&
                      pListener !== EListener.ON_SCROLL_AND_RESIZE) ||
                      document.removeEventListener("scroll", update);
                }
              );
          }, [pRef.current]);
          const initialMount = react_1.useRef(!0);
          return (
            react_1.useEffect(() => {
              initialMount.current && (update(), (initialMount.current = !1));
            }, []),
            rect
          );
        });
    },
    748: function(module, exports, __webpack_require__) {
      var map = {
        "./react-components/react-grid-layout.stories.tsx": 749,
        "./react-components/react-responsive-image.stories.tsx": 766,
        "./react-hooks/use-get-bounding-client-rect.stories.tsx": 772,
        "./react-hooks/use-is-in-viewport.stories.tsx": 773,
        "./react-hooks/use-responsive-image-data.stories.tsx": 774,
        "./react-hooks/use-window-size.stories.tsx": 775,
        "./utils/fake-data-utils.stories.tsx": 776
      };
      function webpackContext(req) {
        var id = webpackContextResolve(req);
        return __webpack_require__(id);
      }
      function webpackContextResolve(req) {
        if (!__webpack_require__.o(map, req)) {
          var e = new Error("Cannot find module '" + req + "'");
          throw ((e.code = "MODULE_NOT_FOUND"), e);
        }
        return map[req];
      }
      (webpackContext.keys = function webpackContextKeys() {
        return Object.keys(map);
      }),
        (webpackContext.resolve = webpackContextResolve),
        (module.exports = webpackContext),
        (webpackContext.id = 748);
    },
    749: function(module, __webpack_exports__, __webpack_require__) {
      "use strict";
      __webpack_require__.r(__webpack_exports__),
        function(module) {
          var _Users_willybrauner_Local_libraries_packages_storybook_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
              29
            ),
            react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0),
            react__WEBPACK_IMPORTED_MODULE_1___default = __webpack_require__.n(
              react__WEBPACK_IMPORTED_MODULE_1__
            ),
            _storybook_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
              15
            ),
            _wbe_react_grid_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
              332
            ),
            _wbe_react_grid_layout__WEBPACK_IMPORTED_MODULE_3___default = __webpack_require__.n(
              _wbe_react_grid_layout__WEBPACK_IMPORTED_MODULE_3__
            ),
            _wbe_react_grid_layout_README_md__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
              333
            ),
            _storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_6__ =
              (__webpack_require__(77), __webpack_require__(82)),
            withSourceLoader = __webpack_require__(22).withSource,
            __STORY__ =
              (__webpack_require__(22).addSource,
              'import React, { CSSProperties, useEffect, useState } from "react";\nimport { storiesOf } from "@storybook/react";\nimport GridLayout from "@wbe/react-grid-layout";\nimport README from "@wbe/react-grid-layout/README.md";\nimport "../../global-style.css";\nconst storyName = "react-grid-layout";\nimport { withKnobs, text, number } from "@storybook/addon-knobs";\n\n/**\n * Demo\n */\nconst App = ({ gutter }: { gutter: number }) => {\n  // show grid state\n  const [showGrid, setShowGrid] = useState(true);\n\n  /**\n   * On key up listener\n   * Allow to toggle grid visibility\n   */\n  useEffect(() => {\n    document.body.onkeyup = pEvent => {\n      if (pEvent.code === "KeyG") setShowGrid(!showGrid);\n    };\n  });\n\n  return (\n    <div className="App">\n      {showGrid && (\n        <GridLayout\n          columnsNumber={number("columnNumber", 6)}\n          gutterSize={number("gutterSize", gutter)}\n          maxWidth={number("maxWidth", 1024)}\n          color={text("color", "rgba(255, 0, 0, 0.14)")}\n        />\n      )}\n      <div className="App_wrapper" style={css.wrapper}>\n        <h1 className="App_title" style={css.title}>\n          React Grid Layout Component\n        </h1>\n        <p>Just press "G Key" on your keyboard to toggle the grid. 💪</p>\n      </div>\n    </div>\n  );\n};\n\nconst css: { [x: string]: CSSProperties } = {\n  wrapper: {\n    position: "absolute",\n    top: "50%",\n    left: "calc(100vw/6*1)",\n    transform: "translateY(-50%)"\n  },\n  title: {\n    fontSize: "3rem"\n  }\n};\n\n/**\n * Config\n */\nstoriesOf(`react-components/${storyName}`, module)\n  .addParameters({\n    readme: {\n      sidebar: README\n    }\n  })\n  .addDecorator(withKnobs)\n  .add("basic example", () => <App gutter={20} />)\n  .add("column line", () => <App gutter={0} />);\n'),
            __ADDS_MAP__ = {},
            App = function App(_ref) {
              var gutter = _ref.gutter,
                _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__.useState)(
                  !0
                ),
                _useState2 = Object(
                  _Users_willybrauner_Local_libraries_packages_storybook_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__.a
                )(_useState, 2),
                showGrid = _useState2[0],
                setShowGrid = _useState2[1];
              return (
                Object(react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(
                  function() {
                    document.body.onkeyup = function(pEvent) {
                      "KeyG" === pEvent.code && setShowGrid(!showGrid);
                    };
                  }
                ),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                  "div",
                  { className: "App" },
                  showGrid &&
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                      _wbe_react_grid_layout__WEBPACK_IMPORTED_MODULE_3___default.a,
                      {
                        columnsNumber: Object(
                          _storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_6__.number
                        )("columnNumber", 6),
                        gutterSize: Object(
                          _storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_6__.number
                        )("gutterSize", gutter),
                        maxWidth: Object(
                          _storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_6__.number
                        )("maxWidth", 1024),
                        color: Object(
                          _storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_6__.text
                        )("color", "rgba(255, 0, 0, 0.14)")
                      }
                    ),
                  react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                    "div",
                    { className: "App_wrapper", style: css.wrapper },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                      "h1",
                      { className: "App_title", style: css.title },
                      "React Grid Layout Component"
                    ),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                      "p",
                      null,
                      'Just press "G Key" on your keyboard to toggle the grid. 💪'
                    )
                  )
                )
              );
            },
            css = {
              wrapper: {
                position: "absolute",
                top: "50%",
                left: "calc(100vw/6*1)",
                transform: "translateY(-50%)"
              },
              title: { fontSize: "3rem" }
            };
          Object(_storybook_react__WEBPACK_IMPORTED_MODULE_2__.storiesOf)(
            "react-components/".concat("react-grid-layout"),
            module
          )
            .addParameters({
              storySource: { source: __STORY__, locationsMap: __ADDS_MAP__ }
            })
            .addDecorator(
              withSourceLoader(
                __STORY__,
                __ADDS_MAP__,
                "/react-grid-layout.stories.tsx",
                [],
                {},
                "/Users/willybrauner/Local/libraries/packages/storybook/stories/react-components",
                {}
              )
            )
            .addParameters({
              readme: {
                sidebar:
                  _wbe_react_grid_layout_README_md__WEBPACK_IMPORTED_MODULE_4__.a
              }
            })
            .addDecorator(
              _storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_6__.withKnobs
            )
            .add("basic example", function() {
              return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                App,
                { gutter: 20 }
              );
            })
            .add("column line", function() {
              return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                App,
                { gutter: 0 }
              );
            });
        }.call(this, __webpack_require__(62)(module));
    },
    754: function(module, exports, __webpack_require__) {
      (exports = __webpack_require__(755)(!1)).push([
        module.i,
        "body {\n  font-family: sans-serif;\n  color: #1b1b1b;\n  /*color: #ddd;*/\n}\n",
        ""
      ]),
        (module.exports = exports);
    },
    766: function(module, __webpack_exports__, __webpack_require__) {
      "use strict";
      __webpack_require__.r(__webpack_exports__),
        function(module) {
          var _Users_willybrauner_Local_libraries_packages_storybook_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
              29
            ),
            react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0),
            react__WEBPACK_IMPORTED_MODULE_1___default = __webpack_require__.n(
              react__WEBPACK_IMPORTED_MODULE_1__
            ),
            _storybook_react__WEBPACK_IMPORTED_MODULE_3__ =
              (__webpack_require__(77), __webpack_require__(15)),
            _wbe_react_responsive_image_README_md__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
              334
            ),
            _wbe_react_responsive_image_src__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
              21
            ),
            _wbe_fake_data_utils_src__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
              78
            ),
            withSourceLoader = __webpack_require__(22).withSource,
            __STORY__ =
              (__webpack_require__(22).addSource,
              'import React, { useState } from "react";\nimport "../../global-style.css";\nimport { storiesOf } from "@storybook/react";\nimport README from "@wbe/react-responsive-image/README.md";\nimport ResponsiveImage, { EImageType } from "@wbe/react-responsive-image/src";\nimport FakeDataUtils from "@wbe/fake-data-utils/src";\n\n// set story name\nconst storyName = "react-responsive-image";\n\n// get fake thumbs array\nconst thumbs = FakeDataUtils.instance.getResponsiveImageData(16 / 9);\n\n/**\n * Demo\n */\nconst ImageTag = () => {\n  return (\n    <div>\n      <section>\n        <h2>img</h2>\n        <p>\n          This is a simple {`<img>`} HTML tag with responsive image data as data\n          props. Resize your browser and check image url change.\n        </p>\n        <ResponsiveImage\n          data={thumbs}\n          type={EImageType.TAG_IMAGE}\n          imageStyle={{ width: "100%" }}\n        />\n      </section>\n    </div>\n  );\n};\n\nconst ImageTagPlaceholder = () => {\n  // define image opacity\n  const [imageOpacity, setImageOpacity] = useState(1);\n\n  return (\n    <div>\n      <section>\n        <h2>img - placeholder</h2>\n        <p>\n          This image as got the same properties than the previous one, except it\n          takes a placeholder. Placeholder ratio size is calc via image\n          dimensions and allow to define an image wrapper who take image\n          dimension behind the image.\n        </p>\n        <button\n          onClick={() => {\n            if (imageOpacity === 0) setImageOpacity(1);\n            if (imageOpacity === 1) setImageOpacity(0);\n          }}\n        >\n          <h3>toggle image opacity to show placeholder</h3>\n        </button>\n        <ResponsiveImage\n          data={thumbs}\n          type={EImageType.TAG_IMAGE}\n          placeholder={true}\n          placeholderColor={"pink"}\n          rootStyle={{ marginTop: "1rem" }}\n          imageStyle={{\n            display: "block",\n            width: "100%",\n            opacity: imageOpacity,\n            transition: "opacity 300ms ease-out"\n          }}\n        />\n      </section>\n    </div>\n  );\n};\n\nconst ImageTagLazy = () => {\n  return (\n    <div>\n      <h2>img - lazyload</h2>\n      <p>\n        Set props "lazy" to "true" if you want to lazyload the image. In browser\n        network dev tab, check images loading when you scroll the page.\n      </p>\n      <p>\n        Change "lazyOffset" value if you want images load at X px to window top\n        or bottom{" "}\n      </p>\n      {new Array(50).fill(null).map((el, i) => {\n        // get thumbs per iteration\n        const thumbs = FakeDataUtils.instance.getResponsiveImageData(16 / 9);\n        return (\n          <ResponsiveImage\n            key={i}\n            data={thumbs}\n            type={EImageType.TAG_IMAGE}\n            lazy={true}\n            placeholder={true}\n            placeholderColor={"pink"}\n            rootStyle={{ marginTop: "1rem" }}\n          />\n        );\n      })}\n    </div>\n  );\n};\n\nconst ImageTagForceWidth = () => {\n  return (\n    <div>\n      <h2>img - force by width</h2>\n      <p>\n        Force to display the image whose size is closest to the value provided\n        in px.\n      </p>\n      <ResponsiveImage\n        data={thumbs}\n        type={EImageType.TAG_IMAGE}\n        forceImageWidth={800}\n        imageStyle={{ width: "100%" }}\n      />\n    </div>\n  );\n};\n\nconst ImageForceVerticalRatio = () => {\n  return (\n    <div>\n      <h2>img - force vertical ratio</h2>\n      <p>\n        ForceVertical ratio props is set to 0.9 (wrapper padding-bottom:"90%")\n      </p>\n      <ResponsiveImage\n        data={thumbs}\n        type={EImageType.TAG_IMAGE}\n        forceImageWidth={800}\n        placeholder={true}\n        forceVerticalRatio={0.9}\n      />\n    </div>\n  );\n};\n\nconst BackgroundImage = () => {\n  return (\n    <div>\n      <section>\n        <h2>{"background-image"}</h2>\n        <p>\n          This is {`<div>`} with a dynamic backgroud-image. On this example, div\n          height is fixed to 400px, and the image is backgroundSize cover.\n        </p>\n        <ResponsiveImage\n          data={thumbs}\n          type={EImageType.BACKGROUND_IMAGE}\n          imageStyle={{\n            height: "400px",\n            backgroundSize: "cover",\n            backgroundRepeat: "none"\n          }}\n        />\n      </section>\n    </div>\n  );\n};\n\nconst BackgroundImagePlaceholder = () => {\n  // define image opacity\n  const [imageOpacity, setImageOpacity] = useState(1);\n  return (\n    <div>\n      <section>\n        <h2>{"background-image - placeholder"}</h2>\n        <p>\n          This background-image as got the same properties than the previous\n          one, except it takes a placeholder. Placeholder ratio size is calc via\n          image dimensions and allow to define an image wrapper who take image\n          dimension behind the image.\n        </p>\n        <button\n          onClick={() => {\n            if (imageOpacity === 0) setImageOpacity(1);\n            if (imageOpacity === 1) setImageOpacity(0);\n          }}\n        >\n          <h3>toggle image opacity to show placeholder</h3>\n        </button>\n        <ResponsiveImage\n          data={thumbs}\n          type={EImageType.BACKGROUND_IMAGE}\n          placeholder={true}\n          placeholderColor={"pink"}\n          rootStyle={{ marginTop: "1rem" }}\n          imageStyle={{\n            display: "block",\n            width: "100%",\n            opacity: imageOpacity,\n            transition: "opacity 300ms ease-out"\n          }}\n        />\n      </section>\n    </div>\n  );\n};\n\n/**\n * Config\n */\nstoriesOf(`react-components/${storyName}`, module)\n  .addParameters({\n    readme: {\n      sidebar: README\n    }\n  })\n  .add("img", () => <ImageTag />)\n  .add("img - placeholder", () => <ImageTagPlaceholder />)\n  .add("img - lazy", () => <ImageTagLazy />)\n  .add("img - force image width", () => <ImageTagForceWidth />)\n  .add("img - forceVerticalRatio", () => <ImageForceVerticalRatio />)\n  .add("background-image", () => <BackgroundImage />)\n  .add("background-image - placeholder", () => <BackgroundImagePlaceholder />);\n'),
            __ADDS_MAP__ = {},
            thumbs = _wbe_fake_data_utils_src__WEBPACK_IMPORTED_MODULE_6__.a.instance.getResponsiveImageData(
              16 / 9
            ),
            ImageTag = function ImageTag() {
              return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                "div",
                null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                  "section",
                  null,
                  react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                    "h2",
                    null,
                    "img"
                  ),
                  react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                    "p",
                    null,
                    "This is a simple ",
                    "<img>",
                    " HTML tag with responsive image data as data props. Resize your browser and check image url change."
                  ),
                  react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                    _wbe_react_responsive_image_src__WEBPACK_IMPORTED_MODULE_5__.b,
                    {
                      data: thumbs,
                      type:
                        _wbe_react_responsive_image_src__WEBPACK_IMPORTED_MODULE_5__
                          .a.TAG_IMAGE,
                      imageStyle: { width: "100%" }
                    }
                  )
                )
              );
            },
            ImageTagPlaceholder = function ImageTagPlaceholder() {
              var _useState = Object(
                  react__WEBPACK_IMPORTED_MODULE_1__.useState
                )(1),
                _useState2 = Object(
                  _Users_willybrauner_Local_libraries_packages_storybook_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__.a
                )(_useState, 2),
                imageOpacity = _useState2[0],
                setImageOpacity = _useState2[1];
              return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                "div",
                null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                  "section",
                  null,
                  react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                    "h2",
                    null,
                    "img - placeholder"
                  ),
                  react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                    "p",
                    null,
                    "This image as got the same properties than the previous one, except it takes a placeholder. Placeholder ratio size is calc via image dimensions and allow to define an image wrapper who take image dimension behind the image."
                  ),
                  react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                    "button",
                    {
                      onClick: function onClick() {
                        0 === imageOpacity && setImageOpacity(1),
                          1 === imageOpacity && setImageOpacity(0);
                      }
                    },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                      "h3",
                      null,
                      "toggle image opacity to show placeholder"
                    )
                  ),
                  react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                    _wbe_react_responsive_image_src__WEBPACK_IMPORTED_MODULE_5__.b,
                    {
                      data: thumbs,
                      type:
                        _wbe_react_responsive_image_src__WEBPACK_IMPORTED_MODULE_5__
                          .a.TAG_IMAGE,
                      placeholder: !0,
                      placeholderColor: "pink",
                      rootStyle: { marginTop: "1rem" },
                      imageStyle: {
                        display: "block",
                        width: "100%",
                        opacity: imageOpacity,
                        transition: "opacity 300ms ease-out"
                      }
                    }
                  )
                )
              );
            },
            ImageTagLazy = function ImageTagLazy() {
              return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                "div",
                null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                  "h2",
                  null,
                  "img - lazyload"
                ),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                  "p",
                  null,
                  'Set props "lazy" to "true" if you want to lazyload the image. In browser network dev tab, check images loading when you scroll the page.'
                ),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                  "p",
                  null,
                  'Change "lazyOffset" value if you want images load at X px to window top or bottom',
                  " "
                ),
                new Array(50).fill(null).map(function(el, i) {
                  var thumbs = _wbe_fake_data_utils_src__WEBPACK_IMPORTED_MODULE_6__.a.instance.getResponsiveImageData(
                    16 / 9
                  );
                  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                    _wbe_react_responsive_image_src__WEBPACK_IMPORTED_MODULE_5__.b,
                    {
                      key: i,
                      data: thumbs,
                      type:
                        _wbe_react_responsive_image_src__WEBPACK_IMPORTED_MODULE_5__
                          .a.TAG_IMAGE,
                      lazy: !0,
                      placeholder: !0,
                      placeholderColor: "pink",
                      rootStyle: { marginTop: "1rem" }
                    }
                  );
                })
              );
            },
            ImageTagForceWidth = function ImageTagForceWidth() {
              return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                "div",
                null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                  "h2",
                  null,
                  "img - force by width"
                ),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                  "p",
                  null,
                  "Force to display the image whose size is closest to the value provided in px."
                ),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                  _wbe_react_responsive_image_src__WEBPACK_IMPORTED_MODULE_5__.b,
                  {
                    data: thumbs,
                    type:
                      _wbe_react_responsive_image_src__WEBPACK_IMPORTED_MODULE_5__
                        .a.TAG_IMAGE,
                    forceImageWidth: 800,
                    imageStyle: { width: "100%" }
                  }
                )
              );
            },
            ImageForceVerticalRatio = function ImageForceVerticalRatio() {
              return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                "div",
                null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                  "h2",
                  null,
                  "img - force vertical ratio"
                ),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                  "p",
                  null,
                  'ForceVertical ratio props is set to 0.9 (wrapper padding-bottom:"90%")'
                ),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                  _wbe_react_responsive_image_src__WEBPACK_IMPORTED_MODULE_5__.b,
                  {
                    data: thumbs,
                    type:
                      _wbe_react_responsive_image_src__WEBPACK_IMPORTED_MODULE_5__
                        .a.TAG_IMAGE,
                    forceImageWidth: 800,
                    placeholder: !0,
                    forceVerticalRatio: 0.9
                  }
                )
              );
            },
            BackgroundImage = function BackgroundImage() {
              return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                "div",
                null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                  "section",
                  null,
                  react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                    "h2",
                    null,
                    "background-image"
                  ),
                  react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                    "p",
                    null,
                    "This is ",
                    "<div>",
                    " with a dynamic backgroud-image. On this example, div height is fixed to 400px, and the image is backgroundSize cover."
                  ),
                  react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                    _wbe_react_responsive_image_src__WEBPACK_IMPORTED_MODULE_5__.b,
                    {
                      data: thumbs,
                      type:
                        _wbe_react_responsive_image_src__WEBPACK_IMPORTED_MODULE_5__
                          .a.BACKGROUND_IMAGE,
                      imageStyle: {
                        height: "400px",
                        backgroundSize: "cover",
                        backgroundRepeat: "none"
                      }
                    }
                  )
                )
              );
            },
            BackgroundImagePlaceholder = function BackgroundImagePlaceholder() {
              var _useState3 = Object(
                  react__WEBPACK_IMPORTED_MODULE_1__.useState
                )(1),
                _useState4 = Object(
                  _Users_willybrauner_Local_libraries_packages_storybook_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__.a
                )(_useState3, 2),
                imageOpacity = _useState4[0],
                setImageOpacity = _useState4[1];
              return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                "div",
                null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                  "section",
                  null,
                  react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                    "h2",
                    null,
                    "background-image - placeholder"
                  ),
                  react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                    "p",
                    null,
                    "This background-image as got the same properties than the previous one, except it takes a placeholder. Placeholder ratio size is calc via image dimensions and allow to define an image wrapper who take image dimension behind the image."
                  ),
                  react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                    "button",
                    {
                      onClick: function onClick() {
                        0 === imageOpacity && setImageOpacity(1),
                          1 === imageOpacity && setImageOpacity(0);
                      }
                    },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                      "h3",
                      null,
                      "toggle image opacity to show placeholder"
                    )
                  ),
                  react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                    _wbe_react_responsive_image_src__WEBPACK_IMPORTED_MODULE_5__.b,
                    {
                      data: thumbs,
                      type:
                        _wbe_react_responsive_image_src__WEBPACK_IMPORTED_MODULE_5__
                          .a.BACKGROUND_IMAGE,
                      placeholder: !0,
                      placeholderColor: "pink",
                      rootStyle: { marginTop: "1rem" },
                      imageStyle: {
                        display: "block",
                        width: "100%",
                        opacity: imageOpacity,
                        transition: "opacity 300ms ease-out"
                      }
                    }
                  )
                )
              );
            };
          Object(_storybook_react__WEBPACK_IMPORTED_MODULE_3__.storiesOf)(
            "react-components/".concat("react-responsive-image"),
            module
          )
            .addParameters({
              storySource: { source: __STORY__, locationsMap: __ADDS_MAP__ }
            })
            .addDecorator(
              withSourceLoader(
                __STORY__,
                __ADDS_MAP__,
                "/react-responsive-image.stories.tsx",
                [],
                {},
                "/Users/willybrauner/Local/libraries/packages/storybook/stories/react-components",
                {}
              )
            )
            .addParameters({
              readme: {
                sidebar:
                  _wbe_react_responsive_image_README_md__WEBPACK_IMPORTED_MODULE_4__.a
              }
            })
            .add("img", function() {
              return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                ImageTag,
                null
              );
            })
            .add("img - placeholder", function() {
              return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                ImageTagPlaceholder,
                null
              );
            })
            .add("img - lazy", function() {
              return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                ImageTagLazy,
                null
              );
            })
            .add("img - force image width", function() {
              return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                ImageTagForceWidth,
                null
              );
            })
            .add("img - forceVerticalRatio", function() {
              return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                ImageForceVerticalRatio,
                null
              );
            })
            .add("background-image", function() {
              return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                BackgroundImage,
                null
              );
            })
            .add("background-image - placeholder", function() {
              return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                BackgroundImagePlaceholder,
                null
              );
            });
        }.call(this, __webpack_require__(62)(module));
    },
    77: function(module, exports, __webpack_require__) {
      var api = __webpack_require__(753),
        content = __webpack_require__(754);
      "string" ==
        typeof (content = content.__esModule ? content.default : content) &&
        (content = [[module.i, content, ""]]);
      var options = { insert: "head", singleton: !1 },
        exported =
          (api(content, options), content.locals ? content.locals : {});
      module.exports = exported;
    },
    772: function(module, __webpack_exports__, __webpack_require__) {
      "use strict";
      __webpack_require__.r(__webpack_exports__),
        function(module) {
          __webpack_require__.d(__webpack_exports__, "App", function() {
            return App;
          });
          var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0),
            react__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
              react__WEBPACK_IMPORTED_MODULE_0__
            ),
            _wbe_use_bounding_client_rect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
              66
            ),
            _wbe_use_bounding_client_rect__WEBPACK_IMPORTED_MODULE_1___default = __webpack_require__.n(
              _wbe_use_bounding_client_rect__WEBPACK_IMPORTED_MODULE_1__
            ),
            _storybook_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
              15
            ),
            _wbe_use_bounding_client_rect_README_md__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
              202
            ),
            withSourceLoader =
              (__webpack_require__(77), __webpack_require__(22).withSource),
            __STORY__ =
              (__webpack_require__(22).addSource,
              'import React, { useRef } from "react";\nimport useBoundingClientRect, {\n  EListener\n} from "@wbe/use-bounding-client-rect";\nimport { storiesOf } from "@storybook/react";\nimport README from "@wbe/use-bounding-client-rect/README.md";\nconst storyName = "use-bounding-client-rect";\nimport "../../global-style.css";\n\n/**\n * Demo\n */\nexport const App = () => {\n  // get ref\n  const elementRef = useRef(null);\n\n  // get ref rect\n  const rect = useBoundingClientRect(\n    elementRef,\n    EListener.ON_SCROLL_AND_RESIZE\n  );\n\n  return (\n    <div ref={elementRef}>\n      <p> Resize your browser and check element properties change.</p>\n      <pre>{JSON.stringify(rect, null, 2)}</pre>\n    </div>\n  );\n};\n\n/**\n * Config\n */\nstoriesOf(`react-hooks/${storyName}`, module)\n  .addParameters({\n    readme: {\n      sidebar: README\n    }\n  })\n  .add("basic example", () => <App />, {\n    info: README\n  });\n'),
            __ADDS_MAP__ = {},
            App = function App() {
              var elementRef = Object(
                  react__WEBPACK_IMPORTED_MODULE_0__.useRef
                )(null),
                rect = _wbe_use_bounding_client_rect__WEBPACK_IMPORTED_MODULE_1___default()(
                  elementRef,
                  _wbe_use_bounding_client_rect__WEBPACK_IMPORTED_MODULE_1__
                    .EListener.ON_SCROLL_AND_RESIZE
                );
              return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                "div",
                { ref: elementRef },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                  "p",
                  null,
                  " Resize your browser and check element properties change."
                ),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                  "pre",
                  null,
                  JSON.stringify(rect, null, 2)
                )
              );
            };
          Object(_storybook_react__WEBPACK_IMPORTED_MODULE_2__.storiesOf)(
            "react-hooks/".concat("use-bounding-client-rect"),
            module
          )
            .addParameters({
              storySource: { source: __STORY__, locationsMap: __ADDS_MAP__ }
            })
            .addDecorator(
              withSourceLoader(
                __STORY__,
                __ADDS_MAP__,
                "/use-get-bounding-client-rect.stories.tsx",
                [],
                {},
                "/Users/willybrauner/Local/libraries/packages/storybook/stories/react-hooks",
                {}
              )
            )
            .addParameters({
              readme: {
                sidebar:
                  _wbe_use_bounding_client_rect_README_md__WEBPACK_IMPORTED_MODULE_3__.a
              }
            })
            .add(
              "basic example",
              function() {
                return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                  App,
                  null
                );
              },
              {
                info:
                  _wbe_use_bounding_client_rect_README_md__WEBPACK_IMPORTED_MODULE_3__.a
              }
            );
        }.call(this, __webpack_require__(62)(module));
    },
    773: function(module, __webpack_exports__, __webpack_require__) {
      "use strict";
      __webpack_require__.r(__webpack_exports__),
        function(module) {
          __webpack_require__.d(__webpack_exports__, "App", function() {
            return App;
          });
          var _Users_willybrauner_Local_libraries_packages_storybook_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
              67
            ),
            _Users_willybrauner_Local_libraries_packages_storybook_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
              29
            ),
            react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0),
            react__WEBPACK_IMPORTED_MODULE_2___default = __webpack_require__.n(
              react__WEBPACK_IMPORTED_MODULE_2__
            ),
            _storybook_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
              15
            ),
            _wbe_use_is_in_viewport_README_md__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
              338
            ),
            _wbe_use_is_in_viewport__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
              144
            ),
            _wbe_use_is_in_viewport__WEBPACK_IMPORTED_MODULE_5___default = __webpack_require__.n(
              _wbe_use_is_in_viewport__WEBPACK_IMPORTED_MODULE_5__
            ),
            withSourceLoader =
              (__webpack_require__(77), __webpack_require__(22).withSource),
            __STORY__ =
              (__webpack_require__(22).addSource,
              'import React, { CSSProperties, useEffect, useRef, useState } from "react";\nimport { storiesOf } from "@storybook/react";\nimport README from "@wbe/use-is-in-viewport/README.md";\nimport useIsInViewport from "@wbe/use-is-in-viewport";\nimport "../../global-style.css";\n\n// set story name\nconst storyName = "use-is-in-viewport";\n\n/**\n * Demo\n */\nexport const App = ({ offset }: { offset: number }) => {\n  // Get element ref\n  const elementRef = useRef<HTMLDivElement>(null);\n\n  // Check if is in viewport (hook return boolean)\n  const isInViewport: boolean = useIsInViewport(elementRef, true, offset);\n\n  // Create a state we want to toggle each time element is or not in viewport\n  const [isVisible, setIsVisible] = useState<boolean>(false);\n\n  // Toggle the state\n  useEffect(() => setIsVisible(isInViewport), [isInViewport]);\n\n  return (\n    <div style={css.root}>\n      <div style={css.text}>\n        <div>\n          Element is visible?{" "}\n          <span\n            style={{ color: isVisible ? "green" : "red" }}\n          >{`${isVisible}`}</span>\n        </div>\n        {offset !== 0 && <div style={css.note}>with {offset}px offset</div>}\n        <div style={css.note}>(scroll down ↓)</div>\n      </div>\n      <div\n        ref={elementRef}\n        style={{\n          ...css.element,\n          background: isVisible ? "green" : "red"\n        }}\n      />\n    </div>\n  );\n};\n\n/**\n * Style\n */\nconst css: { [x: string]: CSSProperties } = {\n  text: {\n    position: "fixed",\n    top: "0",\n    left: "0",\n    padding: "1rem"\n  },\n  note: {\n    marginTop: "1rem"\n  },\n  element: {\n    marginTop: "100vh",\n    marginBottom: "5rem",\n    width: "200px",\n    height: "200px",\n    background: "green"\n  }\n};\n\n/**\n * Config\n */\nstoriesOf(`react-hooks/${storyName}`, module)\n  .addParameters({\n    readme: {\n      sidebar: README\n    }\n  })\n  .add("basic example", () => <App offset={0} />)\n  .add("with offset", () => <App offset={100} />);\n'),
            __ADDS_MAP__ = {},
            App = function App(_ref) {
              var offset = _ref.offset,
                elementRef = Object(react__WEBPACK_IMPORTED_MODULE_2__.useRef)(
                  null
                ),
                isInViewport = _wbe_use_is_in_viewport__WEBPACK_IMPORTED_MODULE_5___default()(
                  elementRef,
                  !0,
                  offset
                ),
                _useState = Object(react__WEBPACK_IMPORTED_MODULE_2__.useState)(
                  !1
                ),
                _useState2 = Object(
                  _Users_willybrauner_Local_libraries_packages_storybook_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__.a
                )(_useState, 2),
                isVisible = _useState2[0],
                setIsVisible = _useState2[1];
              return (
                Object(react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(
                  function() {
                    return setIsVisible(isInViewport);
                  },
                  [isInViewport]
                ),
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(
                  "div",
                  { style: css.root },
                  react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(
                    "div",
                    { style: css.text },
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(
                      "div",
                      null,
                      "Element is visible?",
                      " ",
                      react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(
                        "span",
                        { style: { color: isVisible ? "green" : "red" } },
                        "".concat(isVisible)
                      )
                    ),
                    0 !== offset &&
                      react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(
                        "div",
                        { style: css.note },
                        "with ",
                        offset,
                        "px offset"
                      ),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(
                      "div",
                      { style: css.note },
                      "(scroll down ↓)"
                    )
                  ),
                  react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(
                    "div",
                    {
                      ref: elementRef,
                      style: Object(
                        _Users_willybrauner_Local_libraries_packages_storybook_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__.a
                      )({}, css.element, {
                        background: isVisible ? "green" : "red"
                      })
                    }
                  )
                )
              );
            },
            css = {
              text: { position: "fixed", top: "0", left: "0", padding: "1rem" },
              note: { marginTop: "1rem" },
              element: {
                marginTop: "100vh",
                marginBottom: "5rem",
                width: "200px",
                height: "200px",
                background: "green"
              }
            };
          Object(_storybook_react__WEBPACK_IMPORTED_MODULE_3__.storiesOf)(
            "react-hooks/".concat("use-is-in-viewport"),
            module
          )
            .addParameters({
              storySource: { source: __STORY__, locationsMap: __ADDS_MAP__ }
            })
            .addDecorator(
              withSourceLoader(
                __STORY__,
                __ADDS_MAP__,
                "/use-is-in-viewport.stories.tsx",
                [],
                {},
                "/Users/willybrauner/Local/libraries/packages/storybook/stories/react-hooks",
                {}
              )
            )
            .addParameters({
              readme: {
                sidebar:
                  _wbe_use_is_in_viewport_README_md__WEBPACK_IMPORTED_MODULE_4__.a
              }
            })
            .add("basic example", function() {
              return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(
                App,
                { offset: 0 }
              );
            })
            .add("with offset", function() {
              return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(
                App,
                { offset: 100 }
              );
            });
        }.call(this, __webpack_require__(62)(module));
    },
    774: function(module, __webpack_exports__, __webpack_require__) {
      "use strict";
      __webpack_require__.r(__webpack_exports__),
        function(module) {
          __webpack_require__.d(__webpack_exports__, "App", function() {
            return App;
          });
          __webpack_require__(77);
          var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0),
            react__WEBPACK_IMPORTED_MODULE_1___default = __webpack_require__.n(
              react__WEBPACK_IMPORTED_MODULE_1__
            ),
            _storybook_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
              15
            ),
            _wbe_use_responsive_image_data_README_md__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
              339
            ),
            _wbe_use_window_size__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
              54
            ),
            _wbe_use_window_size__WEBPACK_IMPORTED_MODULE_4___default = __webpack_require__.n(
              _wbe_use_window_size__WEBPACK_IMPORTED_MODULE_4__
            ),
            _wbe_fake_data_utils_src__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
              78
            ),
            _wbe_use_responsive_image_data_src__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
              340
            ),
            withSourceLoader = __webpack_require__(22).withSource,
            __STORY__ =
              (__webpack_require__(22).addSource,
              'import "../../global-style.css";\nimport React from "react";\nimport { storiesOf } from "@storybook/react";\nimport README from "@wbe/use-responsive-image-data/README.md";\nimport useWindowSize from "@wbe/use-window-size";\nimport FakeDataUtils from "@wbe/fake-data-utils/src";\nimport useResponsiveImageData, {\n  IImage\n} from "@wbe/use-responsive-image-data/src";\n\n// set story name\nconst storyName = "use-responsive-image-data";\n\n/**\n * Demo\n */\n// get fake thumbs array\nconst thumbs = FakeDataUtils.instance.getResponsiveImageData(16 / 9);\n\nexport const App = () => {\n  // get current width\n  const { width } = useWindowSize();\n  // get selected responsive image data object\n  const responsiveImageData: IImage = useResponsiveImageData(thumbs, width);\n\n  return (\n    <div>\n      <pre>{JSON.stringify(responsiveImageData, null, 2)}</pre>\n      <p>\n        Internal hook <em>useResponsiveImageData</em> return image data depend\n        to dynamic or static width value. In this example, width value depend of\n        current window width, so, you can observe image data object changing if\n        you resize your browser.\n      </p>\n    </div>\n  );\n};\n\n/**\n * Config\n */\nstoriesOf(`react-hooks/${storyName}`, module)\n  .addParameters({\n    readme: {\n      sidebar: README\n    }\n  })\n  .add(\n    "basic example",\n    () => <App />\n    //{info: README}\n  );\n'),
            __ADDS_MAP__ = {},
            thumbs = _wbe_fake_data_utils_src__WEBPACK_IMPORTED_MODULE_5__.a.instance.getResponsiveImageData(
              16 / 9
            ),
            App = function App() {
              var width = _wbe_use_window_size__WEBPACK_IMPORTED_MODULE_4___default()()
                  .width,
                responsiveImageData = Object(
                  _wbe_use_responsive_image_data_src__WEBPACK_IMPORTED_MODULE_6__.a
                )(thumbs, width);
              return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                "div",
                null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                  "pre",
                  null,
                  JSON.stringify(responsiveImageData, null, 2)
                ),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                  "p",
                  null,
                  "Internal hook ",
                  react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                    "em",
                    null,
                    "useResponsiveImageData"
                  ),
                  " return image data depend to dynamic or static width value. In this example, width value depend of current window width, so, you can observe image data object changing if you resize your browser."
                )
              );
            };
          Object(_storybook_react__WEBPACK_IMPORTED_MODULE_2__.storiesOf)(
            "react-hooks/".concat("use-responsive-image-data"),
            module
          )
            .addParameters({
              storySource: { source: __STORY__, locationsMap: __ADDS_MAP__ }
            })
            .addDecorator(
              withSourceLoader(
                __STORY__,
                __ADDS_MAP__,
                "/use-responsive-image-data.stories.tsx",
                [],
                {},
                "/Users/willybrauner/Local/libraries/packages/storybook/stories/react-hooks",
                {}
              )
            )
            .addParameters({
              readme: {
                sidebar:
                  _wbe_use_responsive_image_data_README_md__WEBPACK_IMPORTED_MODULE_3__.a
              }
            })
            .add("basic example", function() {
              return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                App,
                null
              );
            });
        }.call(this, __webpack_require__(62)(module));
    },
    775: function(module, __webpack_exports__, __webpack_require__) {
      "use strict";
      __webpack_require__.r(__webpack_exports__),
        function(module) {
          __webpack_require__.d(__webpack_exports__, "App", function() {
            return App;
          });
          var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0),
            react__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
              react__WEBPACK_IMPORTED_MODULE_0__
            ),
            _storybook_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
              15
            ),
            _wbe_use_window_size_README_md__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
              203
            ),
            _wbe_use_window_size__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
              54
            ),
            _wbe_use_window_size__WEBPACK_IMPORTED_MODULE_3___default = __webpack_require__.n(
              _wbe_use_window_size__WEBPACK_IMPORTED_MODULE_3__
            ),
            withSourceLoader =
              (__webpack_require__(77), __webpack_require__(22).withSource),
            __STORY__ =
              (__webpack_require__(22).addSource,
              'import React from "react";\nimport { storiesOf } from "@storybook/react";\nimport README from "@wbe/use-window-size/README.md";\nimport useWindowSize from "@wbe/use-window-size";\nimport "../../global-style.css";\n\n// set story name\nconst storyName = "use-window-size";\n\n/**\n * Demo\n */\nexport const App = () => {\n  // get window size\n  const { width, height } = useWindowSize();\n\n  return (\n    <div>\n      <p> Resize your browser and check width & height change.</p>\n      <ul>\n        <li>window width: {width}</li>\n        <li>window height: {height}</li>\n      </ul>\n    </div>\n  );\n};\n\n/**\n * Config\n */\nstoriesOf(`react-hooks/${storyName}`, module)\n  .addParameters({\n    readme: {\n      sidebar: README\n    }\n  })\n  .add("basic example", () => <App />, {\n    info: README\n  });\n'),
            __ADDS_MAP__ = {},
            App = function App() {
              var _useWindowSize = _wbe_use_window_size__WEBPACK_IMPORTED_MODULE_3___default()(),
                width = _useWindowSize.width,
                height = _useWindowSize.height;
              return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                "div",
                null,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                  "p",
                  null,
                  " Resize your browser and check width & height change."
                ),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                  "ul",
                  null,
                  react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                    "li",
                    null,
                    "window width: ",
                    width
                  ),
                  react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                    "li",
                    null,
                    "window height: ",
                    height
                  )
                )
              );
            };
          Object(_storybook_react__WEBPACK_IMPORTED_MODULE_1__.storiesOf)(
            "react-hooks/".concat("use-window-size"),
            module
          )
            .addParameters({
              storySource: { source: __STORY__, locationsMap: __ADDS_MAP__ }
            })
            .addDecorator(
              withSourceLoader(
                __STORY__,
                __ADDS_MAP__,
                "/use-window-size.stories.tsx",
                [],
                {},
                "/Users/willybrauner/Local/libraries/packages/storybook/stories/react-hooks",
                {}
              )
            )
            .addParameters({
              readme: {
                sidebar:
                  _wbe_use_window_size_README_md__WEBPACK_IMPORTED_MODULE_2__.a
              }
            })
            .add(
              "basic example",
              function() {
                return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                  App,
                  null
                );
              },
              {
                info:
                  _wbe_use_window_size_README_md__WEBPACK_IMPORTED_MODULE_2__.a
              }
            );
        }.call(this, __webpack_require__(62)(module));
    },
    776: function(module, __webpack_exports__, __webpack_require__) {
      "use strict";
      __webpack_require__.r(__webpack_exports__),
        function(module) {
          __webpack_require__.d(
            __webpack_exports__,
            "FakeDataImage",
            function() {
              return FakeDataImage;
            }
          ),
            __webpack_require__.d(__webpack_exports__, "FakeText", function() {
              return FakeText;
            }),
            __webpack_require__.d(__webpack_exports__, "FakeVideo", function() {
              return FakeVideo;
            });
          __webpack_require__(77);
          var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0),
            react__WEBPACK_IMPORTED_MODULE_1___default = __webpack_require__.n(
              react__WEBPACK_IMPORTED_MODULE_1__
            ),
            _storybook_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
              15
            ),
            _wbe_fake_data_utils_README_md__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
              341
            ),
            _wbe_fake_data_utils_src__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
              78
            ),
            withSourceLoader = __webpack_require__(22).withSource,
            __STORY__ =
              (__webpack_require__(22).addSource,
              'import "../../global-style.css";\nimport React from "react";\nimport { storiesOf } from "@storybook/react";\nimport README from "@wbe/fake-data-utils/README.md";\nimport FakeDataUtils from "@wbe/fake-data-utils/src";\n\n// set story name\nconst storyName = "fake-data-utils";\n\n/**\n * Demo\n */\nexport const FakeDataImage = () => {\n  return (\n    <div>\n      <h2>Fake image array</h2>\n      <p>Ratio 16/9</p>\n      <pre>\n        {JSON.stringify(\n          FakeDataUtils.instance.getResponsiveImageData(16 / 9),\n          null,\n          2\n        )}\n      </pre>\n    </div>\n  );\n};\n\nexport const FakeText = () => {\n  return (\n    <div>\n      <h2>Fake text</h2>\n      <pre>TODO</pre>\n    </div>\n  );\n};\n\nexport const FakeVideo = () => {\n  return (\n    <div>\n      <h2>Fake video</h2>\n      <pre>TODO</pre>\n    </div>\n  );\n};\n\n/**\n * Config\n */\nstoriesOf(`utils/${storyName}`, module)\n  .addParameters({\n    readme: {\n      sidebar: README\n    }\n  })\n  .add("fake image", () => <FakeDataImage />)\n  .add("fake text", () => <FakeText />)\n  .add("fake video", () => <FakeVideo />);\n'),
            __ADDS_MAP__ = {},
            FakeDataImage = function FakeDataImage() {
              return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                "div",
                null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                  "h2",
                  null,
                  "Fake image array"
                ),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                  "p",
                  null,
                  "Ratio 16/9"
                ),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                  "pre",
                  null,
                  JSON.stringify(
                    _wbe_fake_data_utils_src__WEBPACK_IMPORTED_MODULE_4__.a.instance.getResponsiveImageData(
                      16 / 9
                    ),
                    null,
                    2
                  )
                )
              );
            },
            FakeText = function FakeText() {
              return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                "div",
                null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                  "h2",
                  null,
                  "Fake text"
                ),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                  "pre",
                  null,
                  "TODO"
                )
              );
            },
            FakeVideo = function FakeVideo() {
              return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                "div",
                null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                  "h2",
                  null,
                  "Fake video"
                ),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                  "pre",
                  null,
                  "TODO"
                )
              );
            };
          Object(_storybook_react__WEBPACK_IMPORTED_MODULE_2__.storiesOf)(
            "utils/".concat("fake-data-utils"),
            module
          )
            .addParameters({
              storySource: { source: __STORY__, locationsMap: __ADDS_MAP__ }
            })
            .addDecorator(
              withSourceLoader(
                __STORY__,
                __ADDS_MAP__,
                "/fake-data-utils.stories.tsx",
                [],
                {},
                "/Users/willybrauner/Local/libraries/packages/storybook/stories/utils",
                {}
              )
            )
            .addParameters({
              readme: {
                sidebar:
                  _wbe_fake_data_utils_README_md__WEBPACK_IMPORTED_MODULE_3__.a
              }
            })
            .add("fake image", function() {
              return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                FakeDataImage,
                null
              );
            })
            .add("fake text", function() {
              return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                FakeText,
                null
              );
            })
            .add("fake video", function() {
              return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                FakeVideo,
                null
              );
            });
        }.call(this, __webpack_require__(62)(module));
    },
    78: function(module, __webpack_exports__, __webpack_require__) {
      "use strict";
      __webpack_require__.d(__webpack_exports__, "a", function() {
        return FakeDataUtils;
      });
      var _Users_willybrauner_Local_libraries_packages_storybook_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          336
        ),
        _Users_willybrauner_Local_libraries_packages_storybook_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          337
        ),
        debug = __webpack_require__(325)("lib:".concat("fake-data-utils")),
        FakeDataUtils = (function() {
          function FakeDataUtils() {
            Object(
              _Users_willybrauner_Local_libraries_packages_storybook_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__.a
            )(this, FakeDataUtils),
              (this.imageAPI = "https://picsum.photos");
          }
          return (
            Object(
              _Users_willybrauner_Local_libraries_packages_storybook_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__.a
            )(
              FakeDataUtils,
              [
                {
                  key: "getResponsiveImageData",
                  value: function getResponsiveImageData() {
                    var pRatio =
                        arguments.length > 0 && void 0 !== arguments[0]
                          ? arguments[0]
                          : 4 / 3,
                      pImageAPI =
                        arguments.length > 1 && void 0 !== arguments[1]
                          ? arguments[1]
                          : this.imageAPI,
                      imageBreakPoints = [640, 1024, 1640, 1900],
                      fakeImageArray = imageBreakPoints.map(function(el) {
                        var imageSize = {
                          width: el,
                          height: Math.round(el / pRatio)
                        };
                        return {
                          url: [
                            pImageAPI,
                            "/id/",
                            FakeDataUtils.randomId,
                            "/",
                            imageSize.width,
                            "/",
                            imageSize.height
                          ].join(""),
                          width: imageSize.width,
                          height: imageSize.height
                        };
                      });
                    return (
                      debug("fakeImageArray", fakeImageArray), fakeImageArray
                    );
                  }
                }
              ],
              [
                {
                  key: "randomIntFromInterval",
                  value: function randomIntFromInterval(min, max) {
                    return Math.floor(Math.random() * (max - min + 1) + min);
                  }
                },
                {
                  key: "instance",
                  get: function get() {
                    return (
                      null == FakeDataUtils.__instance &&
                        (FakeDataUtils.__instance = new FakeDataUtils()),
                      FakeDataUtils.__instance
                    );
                  }
                },
                {
                  key: "randomId",
                  get: function get() {
                    return FakeDataUtils.randomIntFromInterval(1, 200);
                  }
                }
              ]
            ),
            FakeDataUtils
          );
        })();
      FakeDataUtils.__instance = void 0;
    }
  },
  [[343, 1, 2]]
]);
//# sourceMappingURL=main.f3cbac4ddc62036212a0.bundle.js.map
