enum size {
  mobile = "576px",
  tablet = "768px",
  laptop = "992px",
  laptopL = "1200px",
  desktop = "1800px",
}
export const device = {
  mobile: `(min-width: ${size.mobile})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
};

// import { css } from "styled-components";

// export const breakpoints = (
//   cssProp = "padding", // the CSS property to apply to the breakpoints
//   cssPropUnits = "px", // the units of the CSS property (can set equal to "" and apply units to values directly)
//   values = [], // array of objects, e.g. [{ 800: 60 }, ...] <-- 800 (key) = screen breakpoint, 60 (value) = CSS prop breakpoint
//   mediaQueryType = "min-width" // media query breakpoint type, i.e.: max-width, min-width, max-height, min-height
// ) => {
//   const breakpointProps = values.reduce((mediaQueries, value) => {
//     const [screenBreakpoint, cssPropBreakpoint] = [
//       Object.keys(value)[0],
//       Object.values(value)[0],
//     ];
//     return (mediaQueries += `
//     @media screen and (${mediaQueryType}: ${screenBreakpoint}px) {
//       ${cssProp}: ${cssPropBreakpoint}${cssPropUnits};
//     }
//     `);
//   }, "");
//   return css([breakpointProps]);
//};

// import { css, CSSObject } from "styled-components";

// type BreakpointValues = { [key: number]: number };

// export const breakpoints = (
//   cssProp: string = "padding", // the CSS property to apply to the breakpoints
//   cssPropUnits: string = "px", // the units of the CSS property (can set equal to "" and apply units to values directly)
//   values: BreakpointValues[] = [], // array of objects, e.g. [{ 800: 60 }, ...] <-- 800 (key) = screen breakpoint, 60 (value) = CSS prop breakpoint
//   mediaQueryType: string = "min-width" // media query breakpoint type, i.e.: max-width, min-width, max-height, min-height
// ) => {
//   const breakpointProps = values.reduce((mediaQueries, value) => {
//     const [screenBreakpoint, cssPropBreakpoint] = [
//       Object.keys(value)[0],
//       Object.values(value)[0],
//     ];
//     return (
//       mediaQueries +
//       `
//       @media screen and (${mediaQueryType}: ${screenBreakpoint}px) {
//         ${cssProp}: ${cssPropBreakpoint}${cssPropUnits};
//       }`
//     );
//   }, "") ;

//   return css([breakpointProps]);
// };
