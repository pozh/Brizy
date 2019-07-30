import { renderStyles } from "visual/utils/cssStyle";

export function styleBg(vs, v, props) {
  const styles = {
    ".brz &&:hover > .brz-bg-media": {
      standart: ["cssStyleBorder", "cssStyleBorderRadius"],
      interval: ["cssStyleHoverTransition"]
    },
    ".brz &&:hover > .brz-bg-media > .brz-bg-image": {
      standart: ["cssStyleBgImage", "cssStyleBgImagePosition"],
      interval: ["cssStyleBgImageAttachment", "cssStyleHoverTransition"]
    },
    ".brz &&:hover > .brz-bg-media > .brz-bg-color": {
      standart: ["cssStyleBgColor", "cssStyleBgGradient"],
      interval: ["cssStyleHoverTransition"]
    },
    ".brz &&:hover > .brz-bg-media > .brz-bg-map": {
      standart: ["cssStyleBgMap"]
    },
    ".brz &&:hover > .brz-bg-media > .brz-bg-shape__top": {
      standart: [
        "cssStyleShapeTopType",
        "cssStyleShapeTopHeight",
        "cssStyleShapeTopFlip",
        "cssStyleShapeTopIndex"
      ]
    },
    ".brz &&:hover > .brz-bg-media > .brz-bg-shape__bottom": {
      standart: [
        "cssStyleShapeBottomType",
        "cssStyleShapeBottomHeight",
        "cssStyleShapeBottomFlip",
        "cssStyleShapeBottomIndex"
      ]
    }
  };

  return renderStyles({ vs, v, styles, props });
}

export function styleContainer(vs, v) {
  const styles = {
    ".brz &&:hover": {
      standart: ["cssStyleBorderTransparentColor"],
      interval: ["cssStyleSectionMaxWidth"]
    }
  };

  return renderStyles({ vs, v, styles });
}

export function styleContainerWrap(vs, v) {
  const styles = {
    ".brz &&:hover": {
      standart: ["cssStylePaddingSection"],
      interval: ["cssStyleSectionContainerType"]
    }
  };

  return renderStyles({ vs, v, styles });
}
