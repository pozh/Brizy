import { t } from "visual/utils/i18n";
import { getOptionColorHexByPalette } from "visual/utils/options";
import {
  defaultValueKey,
  defaultValueValue,
  saveOnChanges
} from "visual/utils/onChange";

export function toolbarBoxShadowHexAndOpacity({ v, device, state, onChange }) {
  const { hex } = getOptionColorHexByPalette(
    defaultValueValue({ v, key: "boxShadowColorHex", device, state }),
    defaultValueValue({ v, key: "boxShadowColorPalette", device, state })
  );

  return {
    id: defaultValueKey({ key: "boxShadowColorHex", device, state }),
    type: "colorPicker",
    value: {
      hex,
      opacity: defaultValueValue({
        v,
        key: "boxShadowColorOpacity",
        device,
        state
      })
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

export function toolbarBoxShadowPalette({ v, device, state, onChange }) {
  return {
    id: defaultValueKey({ key: "boxShadowColorPalette", device, state }),
    type: "colorPalette",
    value: defaultValueValue({
      v,
      key: "boxShadowColorPalette",
      device,
      state
    }),
    onChange: palette => {
      const values = {
        ...{ v, device, state, onChange },
        ...{ palette }
      };
      return saveOnChanges(values);
    }
  };
}

export function toolbarBoxShadowFields({ v, device, state, onChange }) {
  const { hex } = getOptionColorHexByPalette(
    defaultValueValue({ v, key: "boxShadowColorHex", device, state }),
    defaultValueValue({ v, key: "boxShadowColorPalette", device, state })
  );

  return {
    id: defaultValueKey({ key: "boxShadowColorFields", device, state }),
    type: "colorFields",
    value: {
      hex,
      opacity: defaultValueValue({
        v,
        key: "boxShadowColorOpacity",
        device,
        state
      })
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

export function toolbarBoxShadowBlur({ v, device, state }) {
  return {
    id: defaultValueKey({ key: "boxShadowBlur", device, state }),
    type: "slider",
    icon: "nc-blur",
    slider: {
      min: 0
    },
    input: {
      show: true,
      min: 0
    },
    suffix: {
      show: true,
      choices: [
        {
          title: "px",
          value: "px"
        }
      ]
    },
    value: {
      value: defaultValueValue({
        v,
        key: "boxShadowBlur",
        device,
        state
      })
    },
    onChange: ({ value }) => ({
      [defaultValueKey({ key: "boxShadowBlur", device, state })]: value,
      [defaultValueKey({ key: "boxShadowColorOpacity", device, state })]:
        defaultValueValue({
          v,
          key: "boxShadowColorOpacity",
          device,
          state
        }) === 0
          ? defaultValueValue({
              v,
              key: "tempBoxShadowColorOpacity",
              device,
              state
            })
          : defaultValueValue({
              v,
              key: "boxShadowColorOpacity",
              device,
              state
            }),
      [defaultValueKey({ key: "boxShadow", device, state })]: "on"
    })
  };
}

export function toolbarBoxShadowSpread({ v, device, state }) {
  return {
    id: defaultValueKey({ key: "boxShadowSpread", device, state }),
    type: "slider",
    icon: "nc-size",
    slider: {
      min: -100,
      max: 100
    },
    input: {
      show: true,
      min: 0
    },
    suffix: {
      show: true,
      choices: [
        {
          title: "px",
          value: "px"
        }
      ]
    },
    value: {
      value: defaultValueValue({
        v,
        key: "boxShadowSpread",
        device,
        state
      })
    },
    onChange: ({ value }) => ({
      [defaultValueKey({ key: "boxShadowSpread", device, state })]: value,
      [defaultValueKey({ key: "boxShadowColorOpacity", device, state })]:
        defaultValueValue({
          v,
          key: "boxShadowColorOpacity",
          device,
          state
        }) === 0
          ? defaultValueValue({
              v,
              key: "tempBoxShadowColorOpacity",
              device,
              state
            })
          : defaultValueValue({
              v,
              key: "boxShadowColorOpacity",
              device,
              state
            }),
      [defaultValueKey({ key: "boxShadow", device, state })]: "on"
    })
  };
}

export function toolbarBoxShadowVertical({ v, device, state }) {
  return {
    id: defaultValueKey({ key: "boxShadowVertical", device, state }),
    type: "slider",
    icon: "nc-vertical",
    slider: {
      min: -100,
      max: 100
    },
    input: {
      show: true,
      min: -100,
      max: 100
    },
    suffix: {
      show: true,
      choices: [
        {
          title: "px",
          value: "px"
        }
      ]
    },
    value: {
      value: defaultValueValue({
        v,
        key: "boxShadowVertical",
        device,
        state
      })
    },
    onChange: ({ value }) => ({
      [defaultValueKey({ key: "boxShadowVertical", device, state })]: value,
      [defaultValueKey({ key: "boxShadowColorOpacity", device, state })]:
        defaultValueValue({
          v,
          key: "boxShadowColorOpacity",
          device,
          state
        }) === 0
          ? defaultValueValue({
              v,
              key: "tempBoxShadowColorOpacity",
              device,
              state
            })
          : defaultValueValue({
              v,
              key: "boxShadowColorOpacity",
              device,
              state
            }),
      [defaultValueKey({ key: "boxShadow", device, state })]: "on"
    })
  };
}

export function toolbarBoxShadowHorizontal({ v, device, state }) {
  return {
    id: defaultValueKey({ key: "boxShadowHorizontal", device, state }),
    type: "slider",
    icon: "nc-horizontal",
    slider: {
      min: -100,
      max: 100
    },
    input: {
      show: true,
      min: -100,
      max: 100
    },
    suffix: {
      show: true,
      choices: [
        {
          title: "px",
          value: "px"
        }
      ]
    },
    value: {
      value: defaultValueValue({
        v,
        key: "boxShadowHorizontal",
        device,
        state
      })
    },
    onChange: ({ value }) => ({
      [defaultValueKey({ key: "boxShadowHorizontal", device, state })]: value,
      [defaultValueKey({ key: "boxShadowColorOpacity", device, state })]:
        defaultValueValue({
          v,
          key: "boxShadowColorOpacity",
          device,
          state
        }) === 0
          ? defaultValueValue({
              v,
              key: "tempBoxShadowColorOpacity",
              device,
              state
            })
          : defaultValueValue({
              v,
              key: "boxShadowColorOpacity",
              device,
              state
            }),
      [defaultValueKey({ key: "boxShadow", device, state })]: "on"
    })
  };
}

export function toolbarBoxShadow({ v, device, state }) {
  const boxShadowBlur = defaultValueValue({
    v,
    key: "boxShadowBlur",
    device,
    state
  });
  const boxShadowSpread = defaultValueValue({
    v,
    key: "boxShadowSpread",
    device,
    state
  });
  const boxShadowVertical = defaultValueValue({
    v,
    key: "boxShadowVertical",
    device,
    state
  });
  const boxShadowHorizontal = defaultValueValue({
    v,
    key: "boxShadowHorizontal",
    device,
    state
  });

  return {
    id: defaultValueKey({ key: "boxShadow", device, state }),
    type: "multiInput",
    config: {
      defaultIcon: ["nc-shadow"],
      icons: ["nc-blur", "nc-size", "nc-vertical", "nc-horizontal"]
    },
    value: [
      boxShadowBlur,
      boxShadowSpread,
      boxShadowVertical,
      boxShadowHorizontal
    ],
    onChange: ([
      boxShadowBlur,
      boxShadowSpread,
      boxShadowVertical,
      boxShadowHorizontal
    ]) => ({
      [defaultValueKey({
        key: "boxShadow",
        device,
        state
      })]: "on",

      [defaultValueKey({
        key: "boxShadowBlur",
        device,
        state
      })]: boxShadowBlur,
      [defaultValueKey({
        key: `tempBoxShadowBlur`,
        device,
        state
      })]: boxShadowBlur,

      [defaultValueKey({
        key: "boxShadowSpread",
        device,
        state
      })]: boxShadowSpread,
      [defaultValueKey({
        key: `tempBoxShadowSpread`,
        device,
        state
      })]: boxShadowSpread,

      [defaultValueKey({
        key: "boxShadowVertical",
        device,
        state
      })]: boxShadowVertical,
      [defaultValueKey({
        key: `tempBoxShadowVertical`,
        device,
        state
      })]: boxShadowVertical,

      [defaultValueKey({
        key: "boxShadowHorizontal",
        device,
        state
      })]: boxShadowHorizontal,
      [defaultValueKey({
        key: `tempBoxShadowHorizontal`,
        device,
        state
      })]: boxShadowHorizontal
    })
  };
}

//boxshadow

export function toolbarBoxShadow2({
  v,
  device,
  state,
  choices = "all",
  onChangeHex,
  onChangePalette,
  onChangeStyle,
  showSelect = true
}) {
  const { hex } = getOptionColorHexByPalette(
    defaultValueValue({ v, key: "boxShadowColorHex", device, state }),
    defaultValueValue({ v, key: "boxShadowColorPalette", device, state })
  );

  const boxShadowColorHexAndOpacityAndPaletteAndStateKey = defaultValueKey({
    key: "boxShadowColorHexAndOpacityAndPaletteAndState",
    device,
    state
  });
  const boxShadowStateValue = defaultValueValue({
    v,
    key: "boxShadow",
    device,
    state
  });

  const boxShadowColorOpacityValue = defaultValueValue({
    v,
    key: "boxShadowColorOpacity",
    device,
    state
  });
  const boxShadowColorPaletteValue = defaultValueValue({
    v,
    key: "boxShadowColorPalette",
    device,
    state
  });

  const choicesAll = [
    {
      title: t("None"),
      value: ""
    },
    {
      title: t("Inset"),
      value: "inset"
    },
    {
      title: t("Outline"),
      value: "on"
    }
  ];

  const choicesInset = [
    {
      title: t("None"),
      value: ""
    },
    {
      title: t("Inset"),
      value: "inset"
    }
  ];

  const choicesOutline = [
    {
      title: t("None"),
      value: ""
    },
    {
      title: t("Outline"),
      value: "on"
    }
  ];

  return {
    id: boxShadowColorHexAndOpacityAndPaletteAndStateKey,
    type: "colorPicker2",
    select: {
      choices:
        choices === "all"
          ? choicesAll
          : choices === "inset"
          ? choicesInset
          : choicesOutline
    },
    value: {
      hex,
      opacity: boxShadowColorOpacityValue,
      palette: boxShadowColorPaletteValue,
      select: boxShadowStateValue
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

export function toolbarBoxShadowHexField2({ v, device, state, onChange }) {
  const { hex } = getOptionColorHexByPalette(
    defaultValueValue({ v, key: "boxShadowColorHex", device, state }),
    defaultValueValue({ v, key: "boxShadowColorPalette", device, state })
  );

  return {
    id: defaultValueKey({ key: "boxShadowColorFields", device, state }),
    type: "colorFields",
    value: {
      hex,
      opacity: defaultValueValue({
        v,
        key: "boxShadowColorOpacity",
        device,
        state
      })
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

export function toolbarBoxShadowFields2({ v, device, state, onChange }) {
  const boxShadowStateValue = defaultValueValue({
    v,
    key: "boxShadow",
    device,
    state
  });
  const boxShadowBlurValue = defaultValueValue({
    v,
    key: "boxShadowBlur",
    device,
    state
  });
  const boxShadowSpreadValue = defaultValueValue({
    v,
    key: "boxShadowSpread",
    device,
    state
  });
  const boxShadowVerticalValue = defaultValueValue({
    v,
    key: "boxShadowVertical",
    device,
    state
  });
  const boxShadowHorizontalValue = defaultValueValue({
    v,
    key: "boxShadowHorizontal",
    device,
    state
  });

  return {
    id: defaultValueKey({ key: "boxShadow", device, state }),
    type: "multiInput",
    config: {
      defaultIcon: ["nc-shadow"],
      icons: ["nc-blur", "nc-size", "nc-vertical", "nc-horizontal"]
    },
    value: [
      boxShadowBlurValue,
      boxShadowSpreadValue,
      boxShadowVerticalValue,
      boxShadowHorizontalValue
    ],
    onChange: ([
      boxShadowBlur,
      boxShadowSpread,
      boxShadowVertical,
      boxShadowHorizontal
    ]) => {
      const values = {
        ...{ v, device, state, onChange },
        ...{
          boxShadowBlur,
          boxShadowSpread,
          boxShadowVertical,
          boxShadowHorizontal
        }
      };

      return saveOnChanges(values);
    }
  };
}
