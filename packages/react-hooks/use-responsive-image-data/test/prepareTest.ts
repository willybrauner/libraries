import FakeDataUtils from "@wbe/fake-data-utils";

/**
 * min and max included
 * @param min
 * @param max
 */
export function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * available breakpoints needed as argument for useResponsiveImageData
 */
export const breakpoints = [640, 1024, 1440, 1920];

/**
 * Generate thumbs array needed as argument for useResponsiveImageData
 */
export const thumbs = FakeDataUtils.getResponsiveImageData(4 / 3, breakpoints);
