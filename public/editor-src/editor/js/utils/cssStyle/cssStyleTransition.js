import { styleHoverTransition } from "visual/utils/style2";

export function cssStyleHoverTransition({ v, device, state }) {
  const hoverTransition = styleHoverTransition({ v, device, state });

  return hoverTransition === undefined
    ? ""
    : `transition:all 0.${hoverTransition}s ease-in-out;`;
}
