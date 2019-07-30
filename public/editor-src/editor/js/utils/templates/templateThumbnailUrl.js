import Config from "visual/global/Config";
import { assetUrl } from "visual/utils/asset";

export function templateThumbnailUrl(template) {
  const configUrl = Config.get("urls").templateThumbnails;
  const url = configUrl
    ? `${configUrl}/${template.id}.jpg`
    : assetUrl(`templates/thumbs/${template.id}.jpg`);

  return url;
}
