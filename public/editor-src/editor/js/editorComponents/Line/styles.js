import { renderStyles } from "visual/utils/cssStyle";

export function style(vs, v) {
  const styles = {
    ".brz &&:hover": { standart: ["cssStyleSizeWidthPercent"] },
    ".brz &&:hover .brz-hr": { standart: ["cssStyleElementLineBorder"] }
  };

  return renderStyles({ vs, v, styles });
}
