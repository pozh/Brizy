import { capitalize } from "visual/utils/string";
import { onChangeDependeciesGrouped } from "./onChange";
import { defaultValueValue, defaultValueKey } from "./device";

export function onChangeBgColorHexAndOpacity({
  v,
  device,
  state,
  prefix,
  hex,
  opacity = undefined,
  isChanged = "hex",
  opacityDragEnd = false
}) {
  const upperPrefix = capitalize(prefix);
  opacity = onChangeBgColorOpacity({
    v,
    device,
    state,
    prefix,
    opacity,
    isChanged
  });

  const tempOpacity =
    opacity > 0 && opacityDragEnd
      ? opacity
      : defaultValueValue({
          v,
          key: `temp${upperPrefix}ColorOpacity`,
          device,
          state
        });

  return {
    [defaultValueKey({ key: `${prefix}ColorHex`, device, state })]: hex,
    [defaultValueKey({
      key: `${prefix}ColorOpacity`,
      device,
      state
    })]: opacity,
    [defaultValueKey({
      key: `temp${upperPrefix}ColorOpacity`,
      device,
      state
    })]: tempOpacity
  };
}

export function onChangeBgColorHexAndOpacityPalette({
  v,
  device,
  state,
  prefix,
  opacity = undefined,
  isChanged = "hex"
}) {
  const upperPrefix = capitalize(prefix);

  opacity = onChangeBgColorOpacity({
    v,
    device,
    state,
    prefix,
    opacity,
    isChanged
  });

  const palette =
    isChanged === "hex" || opacity === 0
      ? ""
      : opacity > 0
      ? defaultValueValue({
          v,
          key: `temp${upperPrefix}ColorPalette`,
          device,
          state
        })
      : defaultValueValue({ v, key: `${prefix}ColorPalette`, device, state });

  const tempPalette =
    isChanged === "hex"
      ? ""
      : defaultValueValue({
          v,
          key: `temp${upperPrefix}ColorPalette`,
          device,
          state
        });

  return {
    [defaultValueKey({
      key: `${prefix}ColorPalette`,
      device,
      state
    })]: palette,
    [defaultValueKey({
      key: `temp${upperPrefix}ColorPalette`,
      device,
      state
    })]: tempPalette
  };
}

export function onChangeBgColorHexAndOpacityDependencies({
  v,
  device,
  state,
  prefix,
  opacity = undefined,
  isChanged = "hex"
}) {
  /**
   * borderRadius:
   *   bgColorOpacity === 0 && v.borderColorOpacity === 0 && v.bgImageSrc === ""
   *     ? 0
   *     : bgColorOpacity > 0
   *       ? v.tempBorderRadius
   *       : v.borderRadius,
   *
   * borderTopLeftRadius:
   *   bgColorOpacity === 0 && v.borderColorOpacity === 0 && v.bgImageSrc === ""
   *     ? 0
   *     : bgColorOpacity > 0
   *       ? v.tempBorderTopLeftRadius
   *       : v.borderTopLeftRadius,
   *
   * borderTopRightRadius:
   *   bgColorOpacity === 0 && v.borderColorOpacity === 0 && v.bgImageSrc === ""
   *     ? 0
   *     : bgColorOpacity > 0
   *       ? v.tempBorderTopRightRadius
   *       : v.borderTopRightRadius,
   *
   * borderBottomRightRadius:
   *   bgColorOpacity === 0 && v.borderColorOpacity === 0 && v.bgImageSrc === ""
   *     ? 0
   *     : bgColorOpacity > 0
   *       ? v.tempBorderBottomRightRadius
   *       : v.borderBottomRightRadius,
   *
   * borderBottomLeftRadius:
   *   bgColorOpacity === 0 && v.borderColorOpacity === 0 && v.bgImageSrc === ""
   *     ? 0
   *     : bgColorOpacity > 0
   *       ? v.tempBorderBottomLeftRadius
   *       : v.borderBottomLeftRadius,
   */
  const dependencies = {
    borderRadius: {
      childs: [
        "borderTopLeftRadius",
        "borderTopRightRadius",
        "borderBottomLeftRadius",
        "borderBottomRightRadius"
      ],
      nullValue: ["bgImageSrc", "borderColorOpacity"],
      tempValue: []
    }
  };

  opacity = onChangeBgColorOpacity({
    v,
    device,
    state,
    prefix,
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

export function onChangeBgColorHexAndOpacityColumnAndRowSyncMobile({
  v,
  device,
  prefix,
  opacity = undefined,
  isChanged = "hex"
}) {
  opacity = onChangeBgColorOpacity({ v, device, prefix, opacity, isChanged });

  const mobilePaddingRight =
    opacity === 0
      ? 0
      : isChanged === "hex" || opacity > 0
      ? v.tempMobilePaddingRight
      : v.mobilePaddingRight;

  const mobilePaddingLeft =
    opacity === 0
      ? 0
      : isChanged === "hex" || opacity > 0
      ? v.tempMobilePaddingLeft
      : v.mobilePaddingLeft;

  return {
    mobilePaddingRight,
    mobilePaddingLeft
  };
}

export function onChangeBgColorPalette({ device, state, prefix, palette }) {
  const upperPrefix = capitalize(prefix);

  return {
    [defaultValueKey({
      key: `${prefix}ColorPalette`,
      device,
      state
    })]: palette,
    [defaultValueKey({
      key: `temp${upperPrefix}ColorPalette`,
      device,
      state
    })]: palette
  };
}

export function onChangeBgColorPaletteOpacity({
  v,
  device,
  state,
  prefix,
  opacity = undefined,
  isChanged = "hex"
}) {
  const upperPrefix = capitalize(prefix);

  opacity = onChangeBgColorOpacity({
    v,
    device,
    state,
    prefix,
    opacity,
    isChanged
  });

  return {
    [defaultValueKey({ key: `${prefix}ColorOpacity`, device, state })]: opacity
  };
}

function onChangeBgColorOpacity({
  v,
  device,
  state,
  prefix,
  opacity,
  isChanged
}) {
  const upperPrefix = capitalize(prefix);

  return isChanged === "hex" &&
    defaultValueValue({ v, key: `${prefix}ColorOpacity`, device, state }) ===
      0 &&
    defaultValueValue({
      v,
      key: `temp${upperPrefix}ColorOpacity`,
      device,
      state
    }) === 1 &&
    defaultValueValue({ v, key: "bgImageSrc", device, state }) !== ""
    ? 0.9
    : isChanged === "hex" &&
      defaultValueValue({ v, key: `${prefix}ColorOpacity`, device, state }) ===
        0
    ? defaultValueValue({
        v,
        key: `temp${upperPrefix}ColorOpacity`,
        device,
        state
      })
    : opacity === undefined
    ? defaultValueValue({ v, key: `${prefix}ColorOpacity`, device, state })
    : opacity;
}

//onchange bg 2

export function onChangeBgColorType2({ v, device, state, bgColorType }) {
  const bgColorTypeKey = defaultValueKey({ key: "bgColorType", device, state });

  const gradientActivePointerKey = defaultValueKey({
    key: "gradientActivePointer",
    device,
    state
  });
  const gradientActivePointerValue = defaultValueValue({
    v,
    key: "gradientActivePointer",
    device,
    state
  });

  return {
    [bgColorTypeKey]: bgColorType,
    [gradientActivePointerKey]:
      bgColorType === "solid" ? "startPointer" : gradientActivePointerValue
  };
}

export function onChangeGradientRange2({
  device,
  state,
  startPointer,
  finishPointer,
  activePointer
}) {
  const gradientStartPointerKey = defaultValueKey({
    key: "gradientStartPointer",
    device,
    state
  });

  const gradientFinishPointerKey = defaultValueKey({
    key: "gradientFinishPointer",
    device,
    state
  });

  const gradientActivePointerKey = defaultValueKey({
    key: "gradientActivePointer",
    device,
    state
  });

  return {
    [gradientStartPointerKey]: startPointer,
    [gradientFinishPointerKey]: finishPointer,
    [gradientActivePointerKey]: activePointer
  };
}

export function onChangeBgColorHexAndOpacity2({
  v,
  device,
  state,
  prefix,
  hex,
  opacity = undefined,
  isChanged = "hex",
  opacityDragEnd = false
}) {
  const upperPrefix = capitalize(prefix);
  opacity = onChangeBgColorOpacity2({
    v,
    device,
    state,
    prefix,
    opacity,
    isChanged
  });

  const tempOpacity =
    opacity > 0 && opacityDragEnd
      ? opacity
      : defaultValueValue({
          v,
          key: `temp${upperPrefix}ColorOpacity`,
          device,
          state
        });

  return {
    [defaultValueKey({ key: `${prefix}ColorHex`, device, state })]: hex,
    [defaultValueKey({
      key: `${prefix}ColorOpacity`,
      device,
      state
    })]: opacity,
    [defaultValueKey({
      key: `temp${upperPrefix}ColorOpacity`,
      device,
      state
    })]: tempOpacity
  };
}

export function onChangeBgColorHexAndOpacityPalette2({
  v,
  device,
  state,
  prefix,
  opacity = undefined,
  isChanged = "hex"
}) {
  const upperPrefix = capitalize(prefix);

  opacity = onChangeBgColorOpacity2({
    v,
    device,
    state,
    prefix,
    opacity,
    isChanged
  });

  const palette =
    isChanged === "hex" || opacity === 0
      ? ""
      : opacity > 0
      ? defaultValueValue({
          v,
          key: `temp${upperPrefix}ColorPalette`,
          device,
          state
        })
      : defaultValueValue({ v, key: `${prefix}ColorPalette`, device, state });

  const tempPalette =
    isChanged === "hex"
      ? ""
      : defaultValueValue({
          v,
          key: `temp${upperPrefix}ColorPalette`,
          device,
          state
        });

  return {
    [defaultValueKey({
      key: `${prefix}ColorPalette`,
      device,
      state
    })]: palette,
    [defaultValueKey({
      key: `temp${upperPrefix}ColorPalette`,
      device,
      state
    })]: tempPalette
  };
}

export function onChangeBgColorHexAndOpacityDependencies2({
  v,
  device,
  state,
  prefix,
  opacity = undefined,
  isChanged = "hex"
}) {
  /**
   * borderRadius:
   *   bgColorOpacity === 0 && v.borderColorOpacity === 0 && v.bgImageSrc === ""
   *     ? 0
   *     : bgColorOpacity > 0
   *       ? v.tempBorderRadius
   *       : v.borderRadius,
   *
   * borderTopLeftRadius:
   *   bgColorOpacity === 0 && v.borderColorOpacity === 0 && v.bgImageSrc === ""
   *     ? 0
   *     : bgColorOpacity > 0
   *       ? v.tempBorderTopLeftRadius
   *       : v.borderTopLeftRadius,
   *
   * borderTopRightRadius:
   *   bgColorOpacity === 0 && v.borderColorOpacity === 0 && v.bgImageSrc === ""
   *     ? 0
   *     : bgColorOpacity > 0
   *       ? v.tempBorderTopRightRadius
   *       : v.borderTopRightRadius,
   *
   * borderBottomRightRadius:
   *   bgColorOpacity === 0 && v.borderColorOpacity === 0 && v.bgImageSrc === ""
   *     ? 0
   *     : bgColorOpacity > 0
   *       ? v.tempBorderBottomRightRadius
   *       : v.borderBottomRightRadius,
   *
   * borderBottomLeftRadius:
   *   bgColorOpacity === 0 && v.borderColorOpacity === 0 && v.bgImageSrc === ""
   *     ? 0
   *     : bgColorOpacity > 0
   *       ? v.tempBorderBottomLeftRadius
   *       : v.borderBottomLeftRadius,
   */
  const dependencies = {
    borderRadius: {
      childs: [
        "borderTopLeftRadius",
        "borderTopRightRadius",
        "borderBottomLeftRadius",
        "borderBottomRightRadius"
      ],
      nullValue: ["bgImageSrc", "borderColorOpacity"],
      tempValue: []
    }
  };

  opacity = onChangeBgColorOpacity2({
    v,
    device,
    state,
    prefix,
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

export function onChangeBgColorHexAndOpacityColumnAndRowSyncMobile2({
  v,
  device,
  prefix,
  opacity = undefined,
  isChanged = "hex"
}) {
  opacity = onChangeBgColorOpacity2({ v, device, prefix, opacity, isChanged });

  const mobilePaddingRight =
    opacity === 0
      ? 0
      : isChanged === "hex" || opacity > 0
      ? v.tempMobilePaddingRight
      : v.mobilePaddingRight;

  const mobilePaddingLeft =
    opacity === 0
      ? 0
      : isChanged === "hex" || opacity > 0
      ? v.tempMobilePaddingLeft
      : v.mobilePaddingLeft;

  return {
    mobilePaddingRight,
    mobilePaddingLeft
  };
}

export function onChangeBgColorPalette2({ device, state, prefix, palette }) {
  const upperPrefix = capitalize(prefix);

  return {
    [defaultValueKey({
      key: `${prefix}ColorPalette`,
      device,
      state
    })]: palette,
    [defaultValueKey({
      key: `temp${upperPrefix}ColorPalette`,
      device,
      state
    })]: palette
  };
}

export function onChangeBgColorPaletteOpacity2({
  v,
  device,
  state,
  prefix,
  opacity = undefined,
  isChanged = "hex"
}) {
  const upperPrefix = capitalize(prefix);

  opacity = onChangeBgColorOpacity2({
    v,
    device,
    state,
    prefix,
    opacity,
    isChanged
  });

  return {
    [defaultValueKey({ key: `${prefix}ColorOpacity`, device, state })]: opacity
  };
}

function onChangeBgColorOpacity2({
  v,
  device,
  state,
  prefix,
  opacity,
  isChanged
}) {
  const upperPrefix = capitalize(prefix);

  return (isChanged === "hex" || isChanged === "palette") &&
    defaultValueValue({ v, key: `${prefix}ColorOpacity`, device, state }) ===
      0 &&
    defaultValueValue({
      v,
      key: `temp${upperPrefix}ColorOpacity`,
      device,
      state
    }) === 1 &&
    defaultValueValue({ v, key: "bgImageSrc", device, state }) !== ""
    ? 0.9
    : (isChanged === "hex" || isChanged === "palette") &&
      defaultValueValue({
        v,
        key: `${prefix}ColorOpacity`,
        device,
        state
      }) === 0
    ? defaultValueValue({
        v,
        key: `temp${upperPrefix}ColorOpacity`,
        device,
        state
      })
    : opacity === undefined
    ? defaultValueValue({ v, key: `${prefix}ColorOpacity`, device, state })
    : opacity;
}
