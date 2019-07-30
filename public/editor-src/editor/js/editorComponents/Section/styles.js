import { renderStyles } from "visual/utils/cssStyle";

export function styleSection(vs, v) {
  const styles = {
    ".brz &&:hover": {
      standart: ["cssStyleZIndex", "cssStyleVisible|||preview"]
    },
    ".brz &&:hover .brz-container__wrap": {
      interval: ["cssStyleVisible|||editor"]
    },
    ".brz &&:hover .brz-section__content": {
      standart: ["cssStyleSectionSliderHeight"]
    },
    ".brz && .brz-slick-slider__dots:hover": {
      standart: ["cssStyleSectionColorDots"]
    },
    ".brz && .brz-slick-slider__arrow:hover": {
      standart: ["cssStyleSectionColorArrows"]
    }
  };

  return renderStyles({ vs, v, styles });
}
