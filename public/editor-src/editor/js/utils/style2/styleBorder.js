import { defaultValueValue } from "visual/utils/onChange";
import { styleState } from "visual/utils/style";
import { hexToRgba } from "visual/utils/color";
import { getOptionColorHexByPalette } from "visual/utils/options";

export function styleBorderStyle({ v, device, state }) {
  const isHover = styleState({ v, state });

  const borderStyle = defaultValueValue({
    v,
    key: "borderStyle",
    device,
    state
  });

  const hoverBorderStyle = defaultValueValue({
    v,
    key: "borderStyle",
    device,
    state: "hover"
  });

  return isHover === "hover" ? hoverBorderStyle : borderStyle;
}

export function styleBorderWidthType({ v, device, state }) {
  const isHover = styleState({ v, state });

  const currentValue = defaultValueValue({
    v,
    key: "borderWidthType",
    device,
    state
  });

  const hoverCurrentValue = defaultValueValue({
    v,
    key: "borderWidthType",
    device,
    state: "hover"
  });

  return isHover === "hover" ? hoverCurrentValue : currentValue;
}

export function styleBorderWidthGrouped({ v, device, state }) {
  const isHover = styleState({ v, state });

  const currentValue = defaultValueValue({
    v,
    key: "borderWidth",
    device,
    state
  });

  const hoverCurrentValue = defaultValueValue({
    v,
    key: "borderWidth",
    device,
    state: "hover"
  });

  return isHover === "hover" ? hoverCurrentValue : currentValue;
}

export function styleBorderWidthUngrouped({ v, device, state, current }) {
  const isHover = styleState({ v, state });

  const currentValue = defaultValueValue({ v, key: current, device, state });

  const hoverCurrentValue = defaultValueValue({
    v,
    key: current,
    device,
    state: "hover"
  });

  return isHover === "hover" ? hoverCurrentValue : currentValue;
}

export function styleBorderColor({ v, device, state }) {
  const isHover = styleState({ v, state });

  const { hex: borderColorHex } = getOptionColorHexByPalette(
    defaultValueValue({ v, key: "borderColorHex", device, state }),
    defaultValueValue({ v, key: "borderColorPalette", device, state })
  );

  const borderColorOpacity = defaultValueValue({
    v,
    key: "borderColorOpacity",
    device,
    state
  });

  const { hex: hoverBorderColorHex } = getOptionColorHexByPalette(
    defaultValueValue({ v, key: "borderColorHex", device, state: "hover" }),
    defaultValueValue({ v, key: "borderColorPalette", device, state: "hover" })
  );

  const hoverBorderColorOpacity = defaultValueValue({
    v,
    key: "borderColorOpacity",
    device,
    state: "hover"
  });

  return isHover === "hover"
    ? hexToRgba(hoverBorderColorHex, hoverBorderColorOpacity)
    : hexToRgba(borderColorHex, borderColorOpacity);
}
