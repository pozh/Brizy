import Config from "visual/global/Config";
import { getStore } from "visual/redux/store";
import { applyFilter } from "visual/utils/filters";
import { urlContainsQueryString, objectToQueryString } from "visual/utils/url";
import { placeholderBlockThumbnailUrl } from "./placeholderBlockThumbnailUrl";
import {
  globalBlocksAssembledSelector,
  screenshotsSelector
} from "visual/redux/selectors";

export const blockThumbnailData = (block, options = {}) => {
  const screenshotData = blockScreenshotData(block, options);
  let data;

  if (screenshotData) {
    data = screenshotData;
  } else {
    data = {
      url: placeholderBlockThumbnailUrl(),
      width: 500,
      height: 200
    };
  }

  return applyFilter("blockThumbnailData", data, block, options);
};

function blockScreenshotData(block, options) {
  if (block.type === "GlobalBlock") {
    block = globalBlocksAssembledSelector(getStore().getState())[
      block.value.globalBlockId
    ];

    options.blockType = "global";
  }

  if (options.searchScreenshotInStoreFirst === true) {
    const screenshots = screenshotsSelector(getStore().getState());

    if (screenshots[block.value._id]) {
      block = {
        ...block,
        value: {
          ...block.value,
          ...screenshots[block.value._id]
        }
      };
    }
  }

  const { _thumbnailSrc, _thumbnailWidth, _thumbnailHeight } = block.value;

  if (_thumbnailSrc && _thumbnailWidth && _thumbnailHeight) {
    return {
      url:
        TARGET === "WP"
          ? blockScreenshotUrlWP(block, options)
          : blockScreenshotUrlCloud(block, options),
      width: _thumbnailWidth,
      height: _thumbnailHeight
    };
  }

  return null;
}

function blockScreenshotUrlCloud(block) {
  const { _thumbnailSrc, _thumbnailTime } = block.value;
  const screenshotUrl = Config.get("urls").screenshot;
  const qs = objectToQueryString({
    t: _thumbnailTime || Date.now()
  });

  return `${screenshotUrl}/${_thumbnailSrc}?${qs}`;
}

function blockScreenshotUrlWP(block, options) {
  const { _thumbnailSrc, _thumbnailTime } = block.value;
  const siteUrl = Config.get("urls").site;
  const page = Config.get("wp").page;
  const qs = objectToQueryString({
    brizy_post: page,
    brizy_block_screenshot: _thumbnailSrc,
    brizy_block_type: options.blockType || "normal",
    t: _thumbnailTime || Date.now()
  });

  return urlContainsQueryString(siteUrl)
    ? `${siteUrl}&${qs}`
    : `${siteUrl}?${qs}`;
}
