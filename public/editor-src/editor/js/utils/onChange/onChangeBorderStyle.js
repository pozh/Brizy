import { onChangeDependeciesGrouped } from "./onChange";
import { defaultValueKey, defaultValueValue } from "./device";

export function onChangeBorderStyle({ v, device, state, value }) {
  return {
    [defaultValueKey({ key: "borderStyle", device, state })]: value,
    [defaultValueKey({ key: "tempBorderStyle", device, state })]:
      value !== ""
        ? value
        : defaultValueValue({ v, key: "tempBorderStyle", device, state })
  };
}

export function onChangeBorderStyleDependencies({ v, device, state, value }) {
  const dependencies = {
    borderWidth: {
      childs: [
        "borderTopWidth",
        "borderRightWidth",
        "borderBottomWidth",
        "borderLeftWidth"
      ],
      nullValue: [],
      tempValue: []
    },
    borderRadius: {
      childs: [
        "borderTopLeftRadius",
        "borderTopRightRadius",
        "borderBottomLeftRadius",
        "borderBottomRightRadius"
      ],
      nullValue: ["bgColorOpacity", "bgImageSrc"],
      tempValue: []
    },
    borderColorOpacity: {
      childs: [],
      nullValue: [],
      tempValue: []
    },
    borderColorPalette: {
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
    dependencies
  });
}

// border Style 2
export function onChangeBorderStyle2({ v, device, state, style }) {
  return {
    [defaultValueKey({ key: "borderStyle", device, state })]: style,
    [defaultValueKey({ key: "tempBorderStyle", device, state })]:
      style !== ""
        ? style
        : defaultValueValue({ v, key: "tempBorderStyle", device, state })
  };
}

export function onChangeElementBorderStyleDependencies2({
  v,
  device,
  state,
  style
}) {
  const dependencies = {
    borderWidth: {
      childs: [
        "borderTopWidth",
        "borderRightWidth",
        "borderBottomWidth",
        "borderLeftWidth"
      ],
      nullValue: [],
      tempValue: []
    },
    borderColorOpacity: {
      childs: [],
      nullValue: [],
      tempValue: []
    },
    borderColorPalette: {
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
    dependencies
  });
}

export function onChangeContainerBorderStyleDependencies2({
  v,
  device,
  state,
  style
}) {
  const dependencies = {
    borderWidth: {
      childs: [
        "borderTopWidth",
        "borderRightWidth",
        "borderBottomWidth",
        "borderLeftWidth"
      ],
      nullValue: [],
      tempValue: []
    },
    borderRadius: {
      childs: [
        "borderTopLeftRadius",
        "borderTopRightRadius",
        "borderBottomLeftRadius",
        "borderBottomRightRadius"
      ],
      nullValue: ["bgColorOpacity", "bgImageSrc"],
      tempValue: []
    },
    borderColorOpacity: {
      childs: [],
      nullValue: [],
      tempValue: []
    },
    borderColorPalette: {
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
    dependencies
  });
}
