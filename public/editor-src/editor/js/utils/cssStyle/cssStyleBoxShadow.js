import {
  styleBoxShadowStyle,
  styleBoxShadowColor,
  styleBoxShadowHorizontal,
  styleBoxShadowVertical,
  styleBoxShadowBlur,
  styleBoxShadowSpread
} from "visual/utils/style2";

export function cssStyleBoxShadow({ v, device, state }) {
  const boxShadow = styleBoxShadowStyle({ v, device, state });
  let boxShadowHorizontal = styleBoxShadowHorizontal({ v, device, state });
  let boxShadowVertical = styleBoxShadowVertical({ v, device, state });
  const boxShadowBlur = styleBoxShadowBlur({ v, device, state });
  const boxShadowSpread = styleBoxShadowSpread({ v, device, state });
  const boxShadowColor = styleBoxShadowColor({ v, device, state });

  const prefix = boxShadow === "inset" ? "inset " : "";

  boxShadowHorizontal =
    boxShadow === "inset" ? boxShadowHorizontal * -1 : boxShadowHorizontal;

  boxShadowVertical =
    boxShadow === "inset" ? boxShadowVertical * -1 : boxShadowVertical;

  const boxShadowUndefined =
    boxShadowHorizontal === undefined ||
    boxShadowVertical === undefined ||
    boxShadowBlur === undefined ||
    boxShadowSpread === undefined;

  if (boxShadowUndefined) {
    return "";
  } else {
    return boxShadowHorizontal === 0 &&
      boxShadowVertical === 0 &&
      boxShadowBlur === 0 &&
      boxShadowSpread === 0
      ? `box-shadow:none;`
      : `box-shadow:${prefix}${boxShadowHorizontal}px ${boxShadowVertical}px ${boxShadowBlur}px ${boxShadowSpread}px ${boxShadowColor};`;
  }
}

export function cssStyleBoxShadowSection({ v, device, state }) {
  let boxShadowVertical = styleBoxShadowVertical({ v, device, state });
  const boxShadowBlur = styleBoxShadowBlur({ v, device, state });
  const boxShadowColor = styleBoxShadowColor({ v, device, state });

  const diff = boxShadowVertical < 0 ? -boxShadowBlur : boxShadowBlur;
  const inBoth = boxShadowVertical === 0;

  const boxShadowUndefined =
    boxShadowVertical === undefined || boxShadowBlur === undefined;

  const boxShadowNone = boxShadowVertical === 0 && boxShadowBlur === 0;

  if (boxShadowUndefined) {
    return "";
  } else {
    if (boxShadowNone) {
      return `box-shadow: none;`;
    } else {
      if (inBoth) {
        return `box-shadow: inset 0 ${boxShadowVertical +
          diff}px ${boxShadowBlur}px -${boxShadowBlur}px ${boxShadowColor}, inset 0 -${boxShadowVertical +
          diff}px ${boxShadowBlur}px -${boxShadowBlur}px ${boxShadowColor};`;
      } else {
        return `box-shadow: inset 0 ${boxShadowVertical +
          diff}px ${boxShadowBlur}px -${boxShadowBlur}px ${boxShadowColor}, inset 0 0 0 0 ${boxShadowColor};`;
      }
    }
  }
}
