import { renderStyles } from "visual/utils/cssStyle";

export function styleWrapper(vs, v) {
  const styles = {
    ".brz &&:hover": {
      standart: ["cssStyleVisible"]
    }
  };
  return renderStyles({ vs, v, styles });
}

export function styleContainer(vs, v) {
  const styles = {
    ".brz &&:hover": {
      standart: [
        "cssStylePadding",
        "cssStyleMargin",
        "cssStyleZIndex",
        "cssStyleFlexHorizontalAlign",
        "cssStylePositionMode"
      ]
    }
  };

  return renderStyles({ vs, v, styles });
}
