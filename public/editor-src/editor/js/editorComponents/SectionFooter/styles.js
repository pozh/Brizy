import { renderStyles } from "visual/utils/cssStyle";

export function styleSection(vs, v) {
  const styles = {
    ".brz &&:hover": {
      interval: ["cssStyleVisible"]
    }
  };

  return renderStyles({ vs, v, styles });
}

export function styleBg(vs, v) {
  const styles = {
    ".brz &&:hover > .brz-bg-media": {
      standart: ["cssStyleBorder", "cssStyleBorderRadius"],
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
    },
    ".brz &&:hover > .brz-bg-content": {
      standart: ["cssStyleBoxShadowSection"],
      interval: ["cssStyleHoverTransition"]
    }
  };

  return renderStyles({ vs, v, styles });
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
      standart: ["cssStyleSectionContainerType", "cssStylePaddingSection"]
    }
  };

  return renderStyles({ vs, v, styles });
}
