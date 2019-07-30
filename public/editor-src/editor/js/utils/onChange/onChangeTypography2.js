import { capitalize } from "visual/utils/string";
import { getWeight, getFontStyle } from "visual/utils/fonts";
import { defaultValueKey, defaultValueValue } from "visual/utils/onChange";

export function onChangeTypography2({
  v,
  device,
  prefix = "",
  current,
  value,
  weights,
  type
}) {
  const fontStyle =
    prefix === "" ? "fontStyle" : `${prefix}${capitalize("fontStyle")}`;

  const fontFamily =
    prefix === "" ? "fontFamily" : `${prefix}${capitalize("fontFamily")}`;

  const fontFamilyType =
    prefix === ""
      ? "fontFamilyType"
      : `${prefix}${capitalize("fontFamilyType")}`;

  const fontSize =
    prefix === "" ? "fontSize" : `${prefix}${capitalize("fontSize")}`;

  const lineHeight =
    prefix === "" ? "lineHeight" : `${prefix}${capitalize("lineHeight")}`;

  const letterSpacing =
    prefix === "" ? "letterSpacing" : `${prefix}${capitalize("letterSpacing")}`;

  const fontWeight =
    prefix === "" ? "fontWeight" : `${prefix}${capitalize("fontWeight")}`;

  const { [fontFamily]: ff, [fontFamilyType]: fft } =
    v[fontStyle] === "" ? v : getFontStyle(v[fontStyle]);

  const fg = defaultValueValue({ v, key: fontStyle, device });
  const {
    [defaultValueKey({ key: fontSize, device })]: fs,
    [defaultValueKey({ key: lineHeight, device })]: lh,
    [defaultValueKey({ key: letterSpacing, device })]: ls,
    [defaultValueKey({ key: fontWeight, device })]: fw
  } = fg === "" ? v : getFontStyle(fg);

  return {
    [defaultValueKey({ key: fontStyle, device })]: "",
    ...(current === "fontFamily"
      ? { fontFamily: value, fontFamilyType: type }
      : { fontFamily: ff, fontFamilyType: fft }),
    ...(current === "fontSize"
      ? { [defaultValueKey({ key: fontSize, device })]: value }
      : { [defaultValueKey({ key: fontSize, device })]: fs }),
    ...(current === "lineHeight"
      ? { [defaultValueKey({ key: lineHeight, device })]: value }
      : { [defaultValueKey({ key: lineHeight, device })]: lh }),
    ...(current === "letterSpacing"
      ? { [defaultValueKey({ key: letterSpacing, device })]: value }
      : { [defaultValueKey({ key: letterSpacing, device })]: ls }),
    ...(current === "fontWeight"
      ? { [defaultValueKey({ key: fontWeight, device })]: value }
      : current === "fontFamily"
      ? {
          [defaultValueKey({ key: fontWeight, device })]: getWeight(fw, weights)
        }
      : { [defaultValueKey({ key: fontWeight, device })]: fw })
  };
}
