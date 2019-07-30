import Config from "visual/global/Config";
import { urlContainsQueryString, objectToQueryString } from "visual/utils/url";

export const makeSimpleGoogleFontsUrl = fonts => {
  const family = fonts.reduce((acc, curr) => {
    const family = curr.family.replace(/\s/g, "+");

    return acc === "" ? family : `${acc}|${family}`;
  }, "");

  return `https://fonts.googleapis.com/css?family=${family}`;
};

export const makeSubsetGoogleFontsUrl = fonts => {
  const family = fonts.reduce((acc, curr) => {
    const family = curr.family.replace(/\s/g, "+");
    const weights = curr.variants.join();

    return acc === "" ? `${family}:${weights}` : `${acc}|${family}:${weights}`;
  }, "");

  return `https://fonts.googleapis.com/css?family=${family}&subset=arabic,bengali,cyrillic,cyrillic-ext,devanagari,greek,greek-ext,gujarati,hebrew,khmer,korean,latin-ext,tamil,telugu,thai,vietnamese`;
};

export const makeUploadFontsUrl = fonts => {
  const siteUrl = Config.get("urls").site;
  const qs = objectToQueryString({
    "brizy-font": fonts.reduce((acc, curr) => {
      const id = curr.id;
      const weights = curr.weights.join();

      return acc === "" ? `${id}:${weights}` : `${acc}|${id}:${weights}`;
    }, "")
  });

  return urlContainsQueryString(siteUrl)
    ? `${siteUrl}&${qs}`
    : `${siteUrl}?${qs}`;
};
