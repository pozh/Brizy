import { renderStyles } from "visual/utils/cssStyle";

export function style(vs, v) {
  const styles = {
    ".brz &&:hover": { standart: ["cssStyleSizeMaxWidthPercent"] }
  };

  return renderStyles({ vs, v, styles });
}
