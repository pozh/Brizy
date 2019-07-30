import { renderStyles } from "visual/utils/cssStyle";

export function style(vs, v) {
  const styles = {
    ".brz &&:hover": { standart: ["cssStyleElementIconBoxFlexDirection"] },

    ".brz &&:hover .brz-icon__container": {
      standart: [
        "cssStyleElementIconBoxMarginLeft",
        "cssStyleElementIconBoxMarginRight"
      ]
    }
  };

  return renderStyles({ vs, v, styles });
}
