import { hexToRgba } from "visual/utils/color";
import { defaultValueValue } from "visual/utils/onChange";
import { getOptionColorHexByPalette } from "visual/utils/options";
import { styleState } from "visual/utils/style";

export function styleBoxShadowStyle({ v, device, state }) {
  const isHover = styleState({ v, state });

  const boxShadow = defaultValueValue({
    v,
    key: "boxShadow",
    device,
    state
  });
  const hoverBoxShadow = defaultValueValue({
    v,
    key: "boxShadow",
    device,
    state: "hover"
  });

  return isHover === "hover" ? hoverBoxShadow : boxShadow;
}

export function styleBoxShadowColor({ v, device, state }) {
  const isHover = styleState({ v, state });

  const { hex: boxShadowColorHex } = getOptionColorHexByPalette(
    defaultValueValue({ v, key: "boxShadowColorHex", device, state }),
    defaultValueValue({ v, key: "boxShadowColorPalette", device, state })
  );
  const boxShadowColorOpacity = defaultValueValue({
    v,
    key: "boxShadowColorOpacity",
    device,
    state
  });

  const { hex: hoverBoxShadowColorHex } = getOptionColorHexByPalette(
    defaultValueValue({
      v,
      key: "boxShadowColorHex",
      device,
      state: "hover"
    }),
    defaultValueValue({
      v,
      key: "boxShadowColorPalette",
      device,
      state: "hover"
    })
  );
  const hoverBoxShadowColorOpacity = defaultValueValue({
    v,
    key: "boxShadowColorOpacity",
    device,
    state: "hover"
  });

  return isHover === "hover"
    ? hexToRgba(hoverBoxShadowColorHex, hoverBoxShadowColorOpacity)
    : hexToRgba(boxShadowColorHex, boxShadowColorOpacity);
}

export function styleBoxShadowHorizontal({ v, device, state }) {
  const isHover = styleState({ v, state });

  let boxShadowHorizontal = defaultValueValue({
    v,
    key: "boxShadowHorizontal",
    device,
    state
  });

  let hoverBoxShadowHorizontal = defaultValueValue({
    v,
    key: "boxShadowHorizontal",
    device,
    state: "hover"
  });

  return isHover === "hover" ? hoverBoxShadowHorizontal : boxShadowHorizontal;
}

export function styleBoxShadowVertical({ v, device, state }) {
  const isHover = styleState({ v, state });

  let boxShadowVertical = defaultValueValue({
    v,
    key: "boxShadowVertical",
    device,
    state
  });

  let hoverBoxShadowVertical = defaultValueValue({
    v,
    key: "boxShadowVertical",
    device,
    state: "hover"
  });

  return isHover === "hover" ? hoverBoxShadowVertical : boxShadowVertical;
}

export function styleBoxShadowBlur({ v, device, state }) {
  const isHover = styleState({ v, state });

  const boxShadowBlur = defaultValueValue({
    v,
    key: "boxShadowBlur",
    device,
    state
  });

  const hoverBoxShadowBlur = defaultValueValue({
    v,
    key: "boxShadowBlur",
    device,
    state: "hover"
  });

  return isHover === "hover" ? hoverBoxShadowBlur : boxShadowBlur;
}

export function styleBoxShadowSpread({ v, device, state }) {
  const isHover = styleState({ v, state });

  const boxShadowSpread = defaultValueValue({
    v,
    key: "boxShadowSpread",
    device,
    state
  });

  const hoverBoxShadowSpread = defaultValueValue({
    v,
    key: "boxShadowSpread",
    device,
    state: "hover"
  });

  return isHover === "hover" ? hoverBoxShadowSpread : boxShadowSpread;
}
