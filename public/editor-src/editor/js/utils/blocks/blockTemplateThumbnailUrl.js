import Config from "visual/global/Config";
import { assetUrl } from "visual/utils/asset";
import { placeholderBlockThumbnailUrl } from "./placeholderBlockThumbnailUrl";

export function blockTemplateThumbnailUrl(blockTemplate) {
  if (!blockTemplate) {
    return placeholderBlockThumbnailUrl();
  }

  const configUrl = Config.get("urls").blockThumbnails;
  const url = configUrl
    ? `${configUrl}/${blockTemplate.id}.jpg`
    : assetUrl(`kits/thumbs/${blockTemplate.id}.jpg`);

  return url;
}
