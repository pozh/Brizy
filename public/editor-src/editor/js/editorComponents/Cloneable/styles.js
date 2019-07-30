import { renderStyles } from "visual/utils/cssStyle";

export function style(vs, v) {
  const styles = {
    ".brz &&:hover": {
      interval: ["cssStyleVisibleMode|||preview"]
    }
  };
  return renderStyles({ vs, v, styles });
}

export function styleWrap(vs, v) {
  const styles = {
    ".brz &&:hover": {
      standart: ["cssStyleZIndex", "cssStylePositionMode", "cssStyleMargin"],
      interval: ["cssStyleVisibleMode|||editor"]
    }
  };
  return renderStyles({ vs, v, styles });
}

export function styleContainer(vs, v) {
  const styles = {
    ".brz &&:hover": {
      standart: [
        "cssStyleFlexHorizontalAlign",
        "cssStylePadding",
        "cssStyleItemMargin"
      ]
    }
  };
  return renderStyles({ vs, v, styles });
}

export function styleItem(vs, v) {
  const styles = {
    ".brz &&:hover": {
      standart: ["cssStyleItemPadding"]
    }
  };
  return renderStyles({ vs, v, styles });
}
