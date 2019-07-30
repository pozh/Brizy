import { renderStyles } from "visual/utils/cssStyle";

export function styleBg(vs, v) {
  const styles = {
    ".brz &&:hover": {
      standart: [
        "cssStyleZIndex|||editor",
        "cssStyleFlexVerticalAlign",
        "cssStylePadding",
        "cssStyleMargin"
      ],
      interval: ["cssStyleVisible"]
    },
    ".brz &&:hover > .brz-bg-content": {
      standart: ["cssStyleBorderTransparentColor"],
      interval: ["cssStyleHoverTransition"]
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
    }
  };

  return renderStyles({ vs, v, styles });
}

export function styleColumn(vs, v) {
  const styles = {
    ".brz &&:hover": {
      standart: [
        "cssStyleZIndex|||preview",
        "cssStyleFlexColumn",
        "cssStyleSizeMaxWidthPercent"
      ]
    }
  };

  return renderStyles({ vs, v, styles });
}
