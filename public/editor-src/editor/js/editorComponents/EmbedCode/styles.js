import { renderStyles } from "visual/utils/cssStyle";

export function style(vs, v) {
  const styles = {
    ".brz &&:hover": {
      standart: ["cssStyleSizeWidthPercent"]
    },
    ".brz &&:hover:before": {
      standart: ["cssStyleBoxShadow", "cssStyleBorder", "cssStyleBorderRadius"],
      interval: ["cssStyleHoverTransition"]
    },
    ".brz &&:hover .brz-shortcode__placeholder": {
      standart: ["cssStyleBorderRadius"],
      interval: ["cssStyleHoverTransition"]
    }
  };

  return renderStyles({ vs, v, styles });
}
