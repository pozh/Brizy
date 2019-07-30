import Config from "visual/global/Config";
import { makeRequest } from "../common/utils";

export const createFonts = ({ body }) => {
  const { api } = Config.get("wp");

  return makeRequest({
    method: "POST",
    url: api.url,
    headers: false, // deleted header have problems with multipart-form
    queryParams: {
      action: api.createFont,
      hash: api.hash
    },
    body
  });
};

export const deleteFont = fontId => {
  const { api } = Config.get("wp");

  return makeRequest({
    method: "POST",
    url: api.url,
    queryParams: {
      action: api.deleteFont,
      hash: api.hash,
      id: fontId
    }
  });
};
