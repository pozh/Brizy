import { renderStyles } from "visual/utils/cssStyle";

export function styleBg(vs, v) {
  const styles = {
    ".brz &&:hover": {
      standart: [
        "cssStyleSizeWidthPercent",
        "cssStyleBorderRadius",
        "cssStyleBg2Color",
        "cssStyleBoxShadow"
      ],
      interval: ["cssStyleHoverTransition"]
    }
  };

  return renderStyles({ vs, v, styles });
}

export function styleBar(vs, v) {
  const styles = {
    ".brz &&:hover": {
      standart: [
        "cssStyleSizeProgressBarMaxWidthPercent",
        "cssStyleElementProgressBarPadding",
        "cssStyleBorderRadius",
        "cssStyleTypography2FontFamily",
        "cssStyleTypography2FontSize",
        "cssStyleTypography2LineHeight",
        "cssStyleTypography2FontWeight",
        "cssStyleTypography2LetterSpacing",
        "cssStyleColor",
        "cssStyleBgColor"
      ],
      interval: ["cssStyleHoverTransition"]
    }
  };

  return renderStyles({ vs, v, styles });
}
