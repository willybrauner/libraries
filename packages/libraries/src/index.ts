/**
 * libraries standalone
 * @description: export every modules from libraries repository.
 */

/**
 * react-components
 */
export { VideoPlayer, NativeVideo, VimeoVideo, YoutubeVideo, EVideoType } from "@wbe/react-video-player";

/**
 * react-hooks
 */
export { useAsyncEffect, useAsyncLayoutEffect } from "@wbe/use-async-effect";
export { useBoundingClientRect, EListener } from "@wbe/use-bounding-client-rect";
export { useDidUpdate } from "@wbe/use-did-update";
export { useDocumentScrollTop } from "@wbe/use-document-scroll-top";
export { useIsInViewport } from "@wbe/use-is-in-viewport";
export { useWindowSize, IWindowSize } from "@wbe/use-window-size";

/**
 * utils
 */
export { FakeDataUtils, EFakeVideoType, IFakeImage } from "@wbe/fake-data-utils"
export { MetasManager, TTag, TMetaTags } from "@wbe/metas-manager"
export { preloadImage, preloadImages } from "@wbe/preloads"
