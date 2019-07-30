import { t } from "visual/utils/i18n";
import { getOptionColorHexByPalette } from "visual/utils/options";
import {
  defaultValueKey,
  defaultValueValue,
  saveOnChanges
} from "visual/utils/onChange";

export function toolbarBorderColorHexAndOpacity({
  v,
  device,
  state,
  onChange
}) {
  const { hex } = getOptionColorHexByPalette(
    defaultValueValue({ v, key: "borderColorHex", device, state }),
    defaultValueValue({ v, key: "borderColorPalette", device, state })
  );
  const borderColorKey = defaultValueKey({
    key: "borderColor",
    device,
    state
  });
  const borderColorOpacityValue = defaultValueValue({
    v,
    key: "borderColorOpacity",
    device,
    state
  });

  return {
    id: borderColorKey,
    type: "colorPicker",
    value: {
      hex,
      opacity: borderColorOpacityValue
    },
    onChange: ({ hex, opacity, isChanged, opacityDragEnd }) => {
      const values = {
        ...{ v, device, state, onChange },
        ...{ hex, opacity, isChanged, opacityDragEnd }
      };
      return saveOnChanges(values);
    }
  };
}

export function toolbarBorderColorPalette({ v, device, state, onChange }) {
  const borderColorPaletteKey = defaultValueKey({
    key: "borderColorPalette",
    device,
    state
  });
  const borderColorPaletteValue = defaultValueValue({
    v,
    key: "borderColorPalette",
    device,
    state
  });

  return {
    id: borderColorPaletteKey,
    type: "colorPalette",
    value: borderColorPaletteValue,
    onChange: palette => {
      const values = {
        ...{ v, device, state, onChange },
        ...{ palette }
      };
      return saveOnChanges(values);
    }
  };
}

export function toolbarBorderColorFields({ v, device, state, onChange }) {
  const { hex } = getOptionColorHexByPalette(
    defaultValueValue({ v, key: "borderColorHex", device, state }),
    defaultValueValue({ v, key: "borderColorPalette", device, state })
  );
  const borderColorFieldsKey = defaultValueKey({
    key: "borderColorFields",
    device,
    state
  });
  const borderColorOpacityValue = defaultValueValue({
    v,
    key: "borderColorOpacity",
    device,
    state
  });

  return {
    id: borderColorFieldsKey,
    type: "colorFields",
    value: {
      hex,
      opacity: borderColorOpacityValue
    },
    onChange: ({ hex }) => {
      const values = {
        ...{ v, device, state, onChange },
        ...{ hex }
      };
      return saveOnChanges(values);
    }
  };
}

//border color 2

export function toolbarBorderColor2({
  v,
  device,
  state,
  prefix = "border",
  showSelect = true,
  selectChoices = [
    {
      title: t("None"),
      value: ""
    },
    {
      value: "solid",
      icon: "nc-solid"
    },
    {
      value: "dashed",
      icon: "nc-dashed"
    },
    {
      value: "dotted",
      icon: "nc-dotted"
    }
  ],
  onChangeStyle,
  onChangeHex,
  onChangePalette
}) {
  const { hex } = getOptionColorHexByPalette(
    defaultValueValue({ v, key: `${prefix}ColorHex`, device, state }),
    defaultValueValue({ v, key: `${prefix}ColorPalette`, device, state })
  );
  return {
    id: defaultValueKey({ key: `${prefix}Color`, device, state }),
    type: "colorPicker2",
    select: {
      show: showSelect,
      choices: selectChoices
    },
    value: {
      hex,
      opacity: defaultValueValue({
        v,
        key: `${prefix}ColorOpacity`,
        device,
        state
      }),
      palette: defaultValueValue({
        v,
        key: `${prefix}ColorPalette`,
        device,
        state
      }),
      select: defaultValueValue({
        v,
        key: `${prefix}Style`,
        device,
        state
      })
    },
    onChange: ({
      hex,
      opacity,
      palette,
      select: style,
      isChanged,
      opacityDragEnd
    }) => {
      const values = {
        ...{
          v,
          device,
          state,
          prefix,
          onChange:
            isChanged === "select"
              ? onChangeStyle
              : isChanged === "hex" || isChanged === "opacity"
              ? onChangeHex
              : onChangePalette
        },
        ...{ v, hex, opacity, palette, style, isChanged, opacityDragEnd }
      };
      return saveOnChanges(values);
    }
  };
}

export function toolbarBorderColorHexField2({
  v,
  device,
  state,
  prefix = "border",
  onChange
}) {
  const { hex } = getOptionColorHexByPalette(
    defaultValueValue({ v, key: `${prefix}ColorHex`, device, state }),
    defaultValueValue({ v, key: `${prefix}ColorPalette`, device, state })
  );
  const borderColorFieldsKey = defaultValueKey({
    key: `${prefix}ColorFields`,
    device,
    state
  });
  const borderColorOpacityValue = defaultValueValue({
    v,
    key: `${prefix}ColorOpacity`,
    device,
    state
  });

  return {
    id: borderColorFieldsKey,
    type: "colorFields",
    value: {
      hex,
      opacity: borderColorOpacityValue
    },
    onChange: ({ hex }) => {
      const values = {
        ...{ v, device, state, prefix, onChange },
        ...{ hex }
      };
      return saveOnChanges(values);
    }
  };
}
