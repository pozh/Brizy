import { getOptionColorHexByPalette } from "visual/utils/options";
import {
  defaultValueKey,
  defaultValueValue,
  saveOnChanges
} from "visual/utils/onChange";

export function toolbarColorHexAndOpacity({
  v,
  device,
  state,
  prefix = "color",
  onChange
}) {
  const { hex } = getOptionColorHexByPalette(
    defaultValueValue({ v, key: `${prefix}Hex`, state }),
    defaultValueValue({ v, key: `${prefix}Palette`, state })
  );
  const colorKey = defaultValueKey({ key: prefix, device, state });
  const colorOpacityValue = defaultValueValue({
    v,
    key: `${prefix}Opacity`,
    device,
    state
  });

  return {
    id: colorKey,
    type: "colorPicker",
    value: {
      hex,
      opacity: colorOpacityValue
    },
    onChange: ({ hex, opacity, isChanged, opacityDragEnd }) => {
      const values = {
        ...{ v, state, prefix, onChange },
        ...{ hex, opacity, isChanged, opacityDragEnd }
      };
      return saveOnChanges(values);
    }
  };
}

export function toolbarColorPalette({
  v,
  device,
  state,
  prefix = "color",
  onChange
}) {
  const colorPaletteKey = defaultValueKey({
    key: `${prefix}Palette`,
    device,
    state
  });
  const colorPaletteValue = defaultValueValue({
    v,
    key: `${prefix}Palette`,
    device,
    state
  });

  return {
    id: colorPaletteKey,
    type: "colorPalette",
    value: colorPaletteValue,
    onChange: palette => {
      const values = {
        ...{ v, state, prefix, onChange },
        ...{ palette }
      };
      return saveOnChanges(values);
    }
  };
}

export function toolbarColorFields({
  v,
  device,
  state,
  prefix = "color",
  onChange
}) {
  const { hex } = getOptionColorHexByPalette(
    defaultValueValue({ v, key: `${prefix}Hex`, device, state }),
    defaultValueValue({ v, key: `${prefix}Palette`, device, state })
  );
  const colorFieldsKey = defaultValueKey({
    key: `${prefix}Fields`,
    device,
    state
  });
  const colorOpacityValue = defaultValueValue({
    v,
    key: `${prefix}Opacity`,
    device,
    state
  });

  return {
    id: colorFieldsKey,
    type: "colorFields",
    value: {
      hex,
      opacity: colorOpacityValue
    },
    onChange: ({ hex, opacity, isChanged, opacityDragEnd }) => {
      const values = {
        ...{ v, state, prefix, onChange },
        ...{ hex, opacity, isChanged, opacityDragEnd }
      };
      return saveOnChanges(values);
    }
  };
}

///Colors 2

export function toolbarColor2({
  v,
  device,
  state,
  disabled = false,
  prefix = "color",
  onChangeHex,
  onChangePalette
}) {
  const { hex } = getOptionColorHexByPalette(
    defaultValueValue({ v, key: `${prefix}Hex`, state }),
    defaultValueValue({ v, key: `${prefix}Palette`, state })
  );

  return {
    id: defaultValueKey({ key: prefix, device, state }),
    type: "colorPicker2",
    disabled,
    select: {
      show: false
    },
    value: {
      hex,
      opacity: defaultValueValue({
        v,
        key: `${prefix}Opacity`,
        device,
        state
      }),
      palette: defaultValueValue({
        v,
        key: `${prefix}Palette`,
        device,
        state
      })
    },
    onChange: ({ hex, opacity, palette, isChanged, opacityDragEnd }) => {
      const valuesHex = {
        ...{ v, device, state, prefix, onChange: onChangeHex },
        ...{ hex, opacity, palette, isChanged, opacityDragEnd }
      };
      const valuesPalette = {
        ...{ v, device, state, prefix, onChange: onChangePalette },
        ...{ hex, opacity, palette, isChanged, opacityDragEnd }
      };

      return isChanged === "hex" || isChanged === "opacity"
        ? saveOnChanges(valuesHex)
        : saveOnChanges(valuesPalette);
    }
  };
}

export function toolbarColorHexField2({
  v,
  device,
  state,
  prefix = "color",
  onChange
}) {
  const { hex } = getOptionColorHexByPalette(
    defaultValueValue({ v, key: `${prefix}Hex`, device, state }),
    defaultValueValue({ v, key: `${prefix}Palette`, device, state })
  );
  const colorFieldsKey = defaultValueKey({
    key: `${prefix}Fields`,
    device,
    state
  });
  const colorOpacityValue = defaultValueValue({
    v,
    key: `${prefix}Opacity`,
    device,
    state
  });

  return {
    id: colorFieldsKey,
    type: "colorFields",
    value: {
      hex,
      opacity: colorOpacityValue
    },
    onChange: ({ hex, opacity, isChanged, opacityDragEnd }) => {
      const values = {
        ...{ v, state, prefix, onChange },
        ...{ hex, opacity, isChanged, opacityDragEnd }
      };
      return saveOnChanges(values);
    }
  };
}
