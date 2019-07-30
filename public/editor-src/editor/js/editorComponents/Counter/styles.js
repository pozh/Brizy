import { renderStyles } from "visual/utils/cssStyle";

export function style(vs, v) {
  const styles = {
    ".brz &&:hover": {
      standart: [
        "cssStyleColor",
        "cssStyleTypography2FontFamily",
        "cssStyleTypography2FontSize",
        "cssStyleTypography2LineHeight",
        "cssStyleTypography2FontWeight",
        "cssStyleTypography2LetterSpacing"
      ]
    }
  };

  return renderStyles({ vs, v, styles });
}
