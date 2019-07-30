import { t } from "visual/utils/i18n";
import { getOptionColorHexByPalette } from "visual/utils/options";
import {
  defaultValueKey,
  defaultValueValue,
  saveOnChanges
} from "visual/utils/onChange";

export function toolbarBgColorHexAndOpacity({
  v,
  device,
  state,
  prefix = "bg",
  disabled = false,
  onChange
}) {
  const { hex } = getOptionColorHexByPalette(
    defaultValueValue({ v, key: `${prefix}ColorHex`, device, state }),
    defaultValueValue({ v, key: `${prefix}ColorPalette`, device, state })
  );
  const prefixColorKey = defaultValueKey({
    key: `${prefix}Color`,
    device,
    state
  });
  const prefixColorOpacityValue = defaultValueValue({
    v,
    key: `${prefix}ColorOpacity`,
    device,
    state
  });

  return {
    id: prefixColorKey,
    type: "colorPicker",
    disabled,
    value: {
      hex,
      opacity: prefixColorOpacityValue
    },
    onChange: ({ hex, opacity, isChanged, opacityDragEnd }) => {
      const values = {
        ...{ v, device, state, prefix, onChange },
        ...{ hex, opacity, isChanged, opacityDragEnd }
      };
      return saveOnChanges(values);
    }
  };
}

export function toolbarBgColorPalette({
  v,
  device,
  state,
  prefix = "bg",
  disabled = false,
  onChange
}) {
  const prefixColorPaletteKey = defaultValueKey({
    key: "borderColorPalette",
    device,
    state
  });
  const prefixColorPaletteValue = defaultValueValue({
    v,
    key: `${prefix}ColorPalette`,
    device,
    state
  });

  return {
    id: prefixColorPaletteKey,
    type: "colorPalette",
    disabled,
    value: prefixColorPaletteValue,
    onChange: palette => {
      const values = {
        ...{ v, device, state, prefix, onChange },
        ...{ palette }
      };
      return saveOnChanges(values);
    }
  };
}

export function toolbarBgColorFields({
  v,
  device,
  state,
  prefix = "bg",
  className = "",
  disabled = false,
  onChange
}) {
  const { hex } = getOptionColorHexByPalette(
    defaultValueValue({ v, key: `${prefix}ColorHex`, device, state }),
    defaultValueValue({ v, key: `${prefix}ColorPalette`, device, state })
  );
  const prefixColorFieldsKey = defaultValueKey({
    key: `${prefix}ColorFields`,
    device,
    state
  });
  const prefixColorOpacityValue = defaultValueValue({
    v,
    key: `${prefix}ColorOpacity`,
    device,
    state
  });

  return {
    id: prefixColorFieldsKey,
    type: "colorFields",
    disabled,
    className,
    value: {
      hex,
      opacity: prefixColorOpacityValue
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

//bg color 2
export function toolbarBgColor2({
  v,
  device,
  state,
  disabled = false,
  prefix = "bg",
  showSelect = true,
  onChangeType,
  onChangeHex,
  onChangePalette,
  onChangeGradientHex,
  onChangeGradientPalette,
  onChangeGradient
}) {
  const bgColorKey = defaultValueKey({
    key: `${prefix}Color`,
    device,
    state
  });

  const bgColorTypeValue = defaultValueValue({
    v,
    key: `${prefix}ColorType`,
    device,
    state
  });

  const { hex: bgColorHex } = getOptionColorHexByPalette(
    defaultValueValue({ v, key: `${prefix}ColorHex`, device, state }),
    defaultValueValue({ v, key: `${prefix}ColorPalette`, device, state })
  );

  const bgColorOpacityValue = defaultValueValue({
    v,
    key: `${prefix}ColorOpacity`,
    device,
    state
  });

  const bgColorPaletteValue = defaultValueValue({
    v,
    key: `${prefix}ColorPalette`,
    device,
    state
  });

  if (bgColorTypeValue === "gradient") {
    var { hex: gradientColorHex } = getOptionColorHexByPalette(
      defaultValueValue({ v, key: "gradientColorHex", device, state }),
      defaultValueValue({ v, key: "gradientColorPalette", device, state })
    );
    var gradientColorOpacityValue = defaultValueValue({
      v,
      key: "gradientColorOpacity",
      device,
      state
    });

    var gradientColorPaletteValue = defaultValueValue({
      v,
      key: "gradientColorPalette",
      device,
      state
    });

    var startPointerValue = defaultValueValue({
      v,
      key: "gradientStartPointer",
      device,
      state
    });
    var finishPointerValue = defaultValueValue({
      v,
      key: "gradientFinishPointer",
      device,
      state
    });
    var activePointerValue = defaultValueValue({
      v,
      key: "gradientActivePointer",
      device,
      state
    });
  }

  return {
    id: bgColorKey,
    type: "colorPicker2",
    disabled,
    select: {
      show: showSelect,
      choices: [
        {
          title: t("Solid"),
          value: "solid"
        },
        {
          title: t("Gradient"),
          value: "gradient"
        }
      ]
    },
    gradient: {
      show: bgColorTypeValue === "gradient"
    },
    value: {
      hex:
        bgColorTypeValue === "gradient" &&
        activePointerValue === "finishPointer"
          ? gradientColorHex
          : bgColorHex,

      opacity:
        bgColorTypeValue === "gradient" &&
        activePointerValue === "finishPointer"
          ? gradientColorOpacityValue
          : bgColorOpacityValue,

      palette:
        bgColorTypeValue === "gradient" &&
        activePointerValue === "finishPointer"
          ? gradientColorPaletteValue
          : bgColorPaletteValue,

      ...(bgColorTypeValue === "gradient" && {
        bgColorHex,
        gradientColorHex,
        select: bgColorTypeValue,
        startPointer: startPointerValue,
        finishPointer: finishPointerValue,
        activePointer: activePointerValue
      })
    },
    onChange: ({
      hex,
      opacity,
      palette,
      select: bgColorType,
      opacityDragEnd,
      startPointer,
      finishPointer,
      activePointer,
      isChanged
    }) => {
      const valuesBgColorType = {
        ...{ v, device, state, prefix, onChange: onChangeType },
        ...{
          bgColorType
        }
      };
      const valuesBgColorHex = {
        ...{
          v,
          device,
          state,
          prefix:
            activePointer === "startPointer" || bgColorTypeValue === "solid"
              ? prefix
              : "gradient",
          onChange:
            activePointer === "startPointer" || bgColorTypeValue === "solid"
              ? onChangeHex
              : onChangeGradientHex
        },
        ...{
          hex,
          opacity,
          isChanged,
          opacityDragEnd
        }
      };
      const valuesBgColorPalette = {
        ...{
          v,
          device,
          state,
          prefix:
            activePointer === "startPointer" || bgColorTypeValue === "solid"
              ? prefix
              : "gradient",
          onChange:
            activePointer === "startPointer" || bgColorTypeValue === "solid"
              ? onChangePalette
              : onChangeGradientPalette
        },
        ...{
          opacity,
          palette
        }
      };
      const valuesGradientRange = {
        ...{ v, device, state, prefix, onChange: onChangeGradient },
        ...{
          startPointer,
          finishPointer,
          activePointer
        }
      };
      return isChanged === "select"
        ? saveOnChanges(valuesBgColorType)
        : isChanged === "hex" || isChanged === "opacity"
        ? saveOnChanges(valuesBgColorHex)
        : isChanged === "palette"
        ? saveOnChanges(valuesBgColorPalette)
        : saveOnChanges(valuesGradientRange);
    }
  };
}

export function toolbarBgColorHexField2({
  v,
  device,
  state,
  prefix = "bg",
  className = "",
  disabled = false,
  onChange
}) {
  const { hex } = getOptionColorHexByPalette(
    defaultValueValue({ v, key: `${prefix}ColorHex`, device, state }),
    defaultValueValue({ v, key: `${prefix}ColorPalette`, device, state })
  );
  const prefixColorFieldsKey = defaultValueKey({
    key: `${prefix}ColorFields`,
    device,
    state
  });
  const prefixColorOpacityValue = defaultValueValue({
    v,
    key: `${prefix}ColorOpacity`,
    device,
    state
  });

  return {
    id: prefixColorFieldsKey,
    type: "colorFields",
    disabled,
    className,
    value: {
      hex,
      opacity: prefixColorOpacityValue
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
