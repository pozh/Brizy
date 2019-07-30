// ToDo.. De ce ColorFields accepta 2 valori HEX si Opacity eu cerd ca e nevoie doar de HEX opacity nu e nevoie de el
import { onChangeDependeciesGrouped } from "./onChange";
import { defaultValueValue, defaultValueKey } from "./device";

export function onChangeBoxShadowHexAndOpacity({
  v,
  device,
  state,
  hex,
  opacity = undefined,
  isChanged = "hex",
  opacityDragEnd = false
}) {
  opacity = onChangeBoxShadowOpacity({
    v,
    device,
    state,
    opacity,
    isChanged
  });

  const tempOpacity =
    opacity > 0 && opacityDragEnd
      ? opacity
      : defaultValueValue({
          v,
          key: "tempBoxShadowColorOpacity",
          device,
          state
        });
  return {
    [defaultValueKey({ key: "boxShadowColorHex", device, state })]: hex,
    [defaultValueKey({ key: "boxShadowColorOpacity", device, state })]: opacity,
    [defaultValueKey({
      key: "tempBoxShadowColorOpacity",
      device,
      state
    })]: tempOpacity,
    [defaultValueKey({ key: "boxShadow", device, state })]: "on"
  };
}

export function onChangeBoxShadowHexAndOpacityPalette({
  v,
  device,
  state,
  opacity = undefined,
  isChanged = "hex"
}) {
  const palette =
    isChanged === "hex" || opacity === 0
      ? ""
      : opacity > 0
      ? defaultValueValue({
          v,
          key: "tempBoxShadowColorPalette",
          device,
          state
        })
      : defaultValueValue({ v, key: "boxShadowColorPalette", device, state });

  const tempPalette =
    isChanged === "hex"
      ? ""
      : defaultValueValue({
          v,
          key: "tempBoxShadowColorPalette",
          device,
          state
        });
  return {
    [defaultValueKey({ key: "boxShadowColorPalette", device, state })]: palette,
    [defaultValueKey({
      key: "tempBoxShadowColorPalette",
      device,
      state
    })]: tempPalette,
    [defaultValueKey({ key: "boxShadow", device, state })]: "on"
  };
}

export function onChangeBoxShadowHexAndOpacityDependencies({
  v,
  device,
  state,
  opacity = undefined,
  isChanged = "hex"
}) {
  const dependencies = {
    boxShadowBlur: {
      childs: [],
      nullValue: [],
      tempValue: []
    },
    boxShadowSpread: {
      childs: [],
      nullValue: [],
      tempValue: []
    },
    boxShadowVertical: {
      childs: [],
      nullValue: [],
      tempValue: []
    },
    boxShadowHorizontal: {
      childs: [],
      nullValue: [],
      tempValue: []
    }
  };

  opacity = onChangeBoxShadowOpacity({
    v,
    device,
    state,
    opacity,
    isChanged
  });

  return onChangeDependeciesGrouped({
    v,
    device,
    state,
    value: opacity,
    dependencies
  });
}

export function onChangeBoxShadowPalette({ v, device, state, palette }) {
  return {
    [defaultValueKey({ key: "boxShadowColorPalette", device, state })]: palette,
    [defaultValueKey({
      key: "tempBoxShadowColorPalette",
      device,
      state
    })]: palette
  };
}

export function onChangeBoxShadowPaletteOpacity({
  v,
  device,
  state,
  opacity = undefined,
  isChanged = "hex"
}) {
  opacity = onChangeBoxShadowOpacity({
    v,
    device,
    state,
    opacity,
    isChanged
  });
  return {
    [defaultValueKey({ key: "boxShadowColorOpacity", device, state })]: opacity,
    [defaultValueKey({ key: "boxShadow", device, state })]: "on"
  };
}

function onChangeBoxShadowOpacity({ v, device, state, opacity, isChanged }) {
  return isChanged === "hex" &&
    defaultValueValue({ v, key: "boxShadowColorOpacity", device, state }) === 0
    ? defaultValueValue({ v, key: "tempBoxShadowColorOpacity", device, state })
    : opacity === undefined
    ? defaultValueValue({ v, key: "boxShadowColorOpacity", device, state })
    : opacity;
}

//boxShadow 2

export function onChangeBoxShadowHexAndOpacity2({
  v,
  device,
  state,
  hex,
  opacity = undefined,
  isChanged = "hex",
  opacityDragEnd = false
}) {
  opacity = onChangeBoxShadowOpacity2({
    v,
    device,
    state,
    opacity,
    isChanged
  });

  const tempOpacity =
    opacity > 0 && opacityDragEnd
      ? opacity
      : defaultValueValue({
          v,
          key: "tempBoxShadowColorOpacity",
          device,
          state
        });
  return {
    [defaultValueKey({ key: "boxShadowColorHex", device, state })]: hex,
    [defaultValueKey({ key: "boxShadowColorOpacity", device, state })]: opacity,
    [defaultValueKey({
      key: "tempBoxShadowColorOpacity",
      device,
      state
    })]: tempOpacity
  };
}

export function onChangeBoxShadowHexAndOpacityPalette2({
  v,
  device,
  state,
  opacity = undefined,
  isChanged = "hex"
}) {
  opacity = onChangeBoxShadowOpacity2({
    v,
    device,
    state,
    opacity,
    isChanged
  });

  const palette =
    isChanged === "hex" || opacity === 0
      ? ""
      : opacity > 0
      ? defaultValueValue({
          v,
          key: "tempBoxShadowColorPalette",
          device,
          state
        })
      : defaultValueValue({ v, key: "boxShadowColorPalette", device, state });

  const tempPalette =
    isChanged === "hex"
      ? ""
      : defaultValueValue({
          v,
          key: "tempBoxShadowColorPalette",
          device,
          state
        });
  return {
    [defaultValueKey({ key: "boxShadowColorPalette", device, state })]: palette,
    [defaultValueKey({
      key: "tempBoxShadowColorPalette",
      device,
      state
    })]: tempPalette
  };
}

export function onChangeBoxShadowHexAndOpacityDependencies2({
  v,
  device,
  state,
  opacity = undefined,
  isChanged = "hex"
}) {
  const dependencies = {
    boxShadow: {
      childs: [],
      nullValue: [],
      tempValue: []
    },
    boxShadowBlur: {
      childs: [],
      nullValue: [],
      tempValue: []
    },
    boxShadowSpread: {
      childs: [],
      nullValue: [],
      tempValue: []
    },
    boxShadowVertical: {
      childs: [],
      nullValue: [],
      tempValue: []
    },
    boxShadowHorizontal: {
      childs: [],
      nullValue: [],
      tempValue: []
    }
  };

  opacity = onChangeBoxShadowOpacity2({
    v,
    device,
    state,
    opacity,
    isChanged
  });

  return onChangeDependeciesGrouped({
    v,
    device,
    state,
    value: opacity,
    dependencies,
    patch: false
  });
}

export function onChangeBoxShadowPalette2({ v, device, state, palette }) {
  return {
    [defaultValueKey({ key: "boxShadowColorPalette", device, state })]: palette,
    [defaultValueKey({
      key: "tempBoxShadowColorPalette",
      device,
      state
    })]: palette
  };
}

export function onChangeBoxShadowPaletteOpacity2({
  v,
  device,
  state,
  opacity = undefined,
  isChanged = "hex"
}) {
  opacity = onChangeBoxShadowOpacity2({
    v,
    device,
    state,
    opacity,
    isChanged
  });
  return {
    [defaultValueKey({ key: "boxShadowColorOpacity", device, state })]: opacity
  };
}

export function onChangeBoxShadowStyle2({ v, device, state, style }) {
  return {
    [defaultValueKey({ key: "boxShadow", device, state })]: style,
    [defaultValueKey({ key: "tempBoxShadow", device, state })]:
      style !== ""
        ? style
        : defaultValueValue({ v, key: "tempBoxShadow", device, state })
  };
}

export function onChangeBoxShadowStyleDependencies2({
  v,
  device,
  state,
  style
}) {
  const dependencies = {
    boxShadowColorOpacity: {
      childs: [],
      nullValue: [],
      tempValue: []
    },
    boxShadowColorPalette: {
      childs: [],
      nullValue: [],
      tempValue: []
    },
    boxShadowBlur: {
      childs: [],
      nullValue: [],
      tempValue: []
    },
    boxShadowSpread: {
      childs: [],
      nullValue: [],
      tempValue: []
    },
    boxShadowVertical: {
      childs: [],
      nullValue: [],
      tempValue: []
    },
    boxShadowHorizontal: {
      childs: [],
      nullValue: [],
      tempValue: []
    }
  };

  return onChangeDependeciesGrouped({
    v,
    device,
    state,
    value: style,
    dependencies,
    patch: false
  });
}

export function onChangeBoxShadow2({
  v,
  device,
  state,
  boxShadowBlur = 0,
  boxShadowSpread = 0,
  boxShadowVertical = 0,
  boxShadowHorizontal = 0
}) {
  return {
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
  };
}

export function onChangeBoxShadowDependencies2({
  v,
  device,
  state,
  boxShadowBlur = 0,
  boxShadowSpread = 0,
  boxShadowVertical = 0,
  boxShadowHorizontal = 0
}) {
  const value = Math.max(
    boxShadowBlur,
    boxShadowSpread,
    boxShadowVertical,
    boxShadowHorizontal
  );

  const dependencies = {
    boxShadow: {
      childs: [],
      nullValue: [],
      tempValue: []
    },
    boxShadowColorOpacity: {
      childs: [],
      nullValue: [],
      tempValue: []
    },
    boxShadowColorPalette: {
      childs: [],
      nullValue: [],
      tempValue: []
    }
  };

  return onChangeDependeciesGrouped({
    v,
    device,
    state,
    value,
    dependencies,
    patch: false
  });
}

function onChangeBoxShadowOpacity2({
  v,
  device,
  state = "normal",
  opacity,
  isChanged
}) {
  return (isChanged === "hex" || isChanged === "palette") &&
    defaultValueValue({ v, key: "boxShadowColorOpacity", device, state }) === 0
    ? defaultValueValue({ v, key: "tempBoxShadowColorOpacity", device, state })
    : opacity === undefined
    ? defaultValueValue({ v, key: "boxShadowColorOpacity", device, state })
    : opacity;
}
