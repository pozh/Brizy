import { renderStyles } from "visual/utils/cssStyle";

export function styleCloseButton(vs, v) {
  const styles = {
    ".brz && > .brz-popup__close:hover": {
      standart: ["cssStyleColor"]
    }
  };

  return renderStyles({ vs, v, styles });
}

export function styleBg(vs, v) {
  const styles = {
    ".brz &&:hover > .brz-bg-media": {
      standart: ["cssStyleBorder", "cssStyleBorderRadius"]
    },
    ".brz &&:hover > .brz-bg-media > .brz-bg-image": {
      standart: ["cssStyleBgImage", "cssStyleBgImagePosition"]
    },
    ".brz &&:hover > .brz-bg-media > .brz-bg-color": {
      standart: ["cssStyleBgColor", "cssStyleBgGradient"]
    }
  };

  return renderStyles({ vs, v, styles });
}

export function styleContainer(vs, v) {
  const styles = {
    ".brz &&:hover": {
      standart: ["cssStyleBorderTransparentColor"],
      interval: ["cssStyleSizeMaxWidthContainer"]
    }
  };

  return renderStyles({ vs, v, styles });
}

export function styleContainerWrap(vs, v) {
  const styles = {
    ".brz &&:hover": {
      standart: ["cssStyleSectionPopupContainerWrap"]
    }
  };

  return renderStyles({ vs, v, styles });
}
