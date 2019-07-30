import { renderStyles } from "visual/utils/cssStyle";

export function styleBg(vs, v) {
  const styles = {
    ".brz &&:hover": {
      standart: ["cssStyleZIndex", "cssStyleMargin"],
      interval: [
        "cssStyleFlexVerticalAlign",
        "cssStyleSizeMaxWidthSize",
        "cssStyleRowMinHeight",
        "cssStyleVisible"
      ]
    },
    ".brz &&:hover > .brz-bg-media": {
      standart: ["cssStyleBorder", "cssStyleBorderRadius", "cssStyleBoxShadow"],
      interval: ["cssStyleHoverTransition"]
    },
    ".brz &&:hover > .brz-bg-media > .brz-bg-image": {
      standart: ["cssStyleBgImage", "cssStyleBgImagePosition"],
      interval: ["cssStyleHoverTransition"]
    },
    ".brz &&:hover > .brz-bg-media > .brz-bg-color": {
      standart: ["cssStyleBgColor", "cssStyleBgGradient"],
      interval: ["cssStyleHoverTransition"]
    },
    ".brz &&:hover > .brz-bg-media > .brz-bg-map": {
      standart: ["cssStyleBgMap"]
    },
    ".brz &&:hover > .brz-bg-content": {
      standart: ["cssStyleBorderTransparentColor"],
      interval: ["cssStyleHoverTransition"]
    },
    ".brz &&:hover > .brz-bg-content > .brz-row": {
      interval: ["cssStyleRowReverseColumn"]
    }
  };

  return renderStyles({ vs, v, styles });
}

export function styleContainer(vs, v) {
  const styles = {
    ".brz &&:hover": {
      standart: ["cssStylePadding"]
    }
  };

  return renderStyles({ vs, v, styles });
}
