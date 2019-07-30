import { renderStyles } from "visual/utils/cssStyle";

export function style(vs, v) {
  const styles = {
    ".brz &&:hover:before": {
      standart: ["cssStyleBoxShadow"],
      interval: ["cssStyleHoverTransition"]
    }
  };

  return renderStyles({ vs, v, styles });
}
