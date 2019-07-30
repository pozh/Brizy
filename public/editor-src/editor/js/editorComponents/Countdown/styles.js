import { renderStyles } from "visual/utils/cssStyle";

export function style(vs, v) {
  const styles = {
    ".brz &&:hover": {
      standart: [
        "cssStyleColor",
        "cssStyleSizeWidthPercent",
        "cssStyleTypography2FontFamily",
        "cssStyleTypography2FontSize",
        "cssStyleTypography2LineHeight",
        "cssStyleTypography2FontWeight",
        "cssStyleTypography2LetterSpacing"
      ]
    },

    ".brz &&:hover .brz-countdown__label": {
      standart: ["cssStyleTypographyElementCountdownLabelFontSize"]
    }
  };

  return renderStyles({ vs, v, styles });
}
