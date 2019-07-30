import { renderStyles } from "visual/utils/cssStyle";

export function style(vs, v) {
  const styles = {
    ".brz &&:hover": {
      standart: ["cssStyleSizeSizePercent", "cssStyleSizeHeightPx"]
    },

    ".brz &&:hover:before": {
      standart: ["cssStyleBorder", "cssStyleBorderRadius", "cssStyleBoxShadow"],
      interval: ["cssStyleHoverTransition"]
    },

    ".brz &&:hover .brz-map-content": {
      standart: ["cssStyleBorderRadius"],
      interval: ["cssStyleHoverTransition"]
    }
  };

  return renderStyles({ vs, v, styles });
}
