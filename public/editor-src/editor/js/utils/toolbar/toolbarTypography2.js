import { t } from "visual/utils/i18n";
import { getWeightChoices } from "visual/utils/fonts";
import { getOptionFontByGlobal } from "visual/utils/options";
import {
  defaultValueKey,
  defaultValueValue,
  saveOnChanges
} from "visual/utils/onChange";

export function toolbarTypography2FontFamily({
  v,
  device,
  state,
  prefix,
  onChange
}) {
  const fontFamily = getOptionFontByGlobal(
    "fontFamily",
    v.fontFamily,
    defaultValueValue({ v, key: "fontStyle", device })
  );

  return {
    id: "fontFamily",
    label: t("Font Family"),
    type: "fontFamily",
    value: fontFamily,
    onChange: ({ id, weights, type }) => {
      const values = {
        ...{ v, device, prefix, onChange },
        ...{ current: "fontFamily", value: id, weights, type }
      };

      console.log(saveOnChanges(values));

      return saveOnChanges(values);
    }
  };
}

export function toolbarTypography2FontStyle({ v, device, state }) {
  const fontStyle = defaultValueValue({ v, key: "fontStyle", device });

  return {
    id: defaultValueKey({ key: "fontStyle", device }),
    type: "fontStyle",
    label: t("Typography"),
    className: "brz-ed-popover__font-style",
    display: "block",
    value: fontStyle,
    onChange: fontStyle => {
      console.log({
        [defaultValueKey({ key: "fontStyle", device })]: fontStyle
      });

      return {
        [defaultValueKey({ key: "fontStyle", device })]: fontStyle
      };
    }
  };
}

export function toolbarTypography2FontSize({
  v,
  device,
  state,
  prefix,
  onChange
}) {
  const fontSize = getOptionFontByGlobal(
    defaultValueKey({ key: "fontSize", device, state }),
    defaultValueValue({ v, key: "fontSize", device }),
    defaultValueValue({ v, key: "fontStyle", device })
  );

  return {
    id: defaultValueKey({ key: "fontSize", device }),
    label: t("Size"),
    type: "stepper",
    display: "block",
    min: 1,
    max: 100,
    step: 1,
    value: fontSize,
    onChange: fontSize => {
      const values = {
        ...{ v, device, onChange, prefix },
        ...{ current: "fontSize", value: fontSize }
      };

      console.log(saveOnChanges(values));

      return saveOnChanges(values);
    }
  };
}

export function toolbarTypography2LineHeight({
  v,
  device,
  state,
  prefix,
  onChange
}) {
  const lineHeight = getOptionFontByGlobal(
    defaultValueKey({ key: "lineHeight", device, state }),
    defaultValueValue({ v, key: "lineHeight", device }),
    defaultValueValue({ v, key: "fontStyle", device })
  );

  return {
    id: defaultValueKey({ key: "lineHeight", device }),
    label: t("Line Hgt."),
    type: "stepper",
    display: "block",
    min: 1,
    max: 10,
    step: 0.1,
    value: lineHeight,
    onChange: lineHeight => {
      const values = {
        ...{ v, device, onChange, prefix },
        ...{ current: "lineHeight", value: lineHeight }
      };

      console.log(saveOnChanges(values));

      return saveOnChanges(values);
    }
  };
}

export function toolbarTypography2FontWeight({
  v,
  device,
  state,
  prefix,
  onChange
}) {
  const fontFamily = getOptionFontByGlobal(
    "fontFamily",
    v.fontFamily,
    defaultValueValue({ v, key: "fontStyle", device })
  );

  const fontWeight = getOptionFontByGlobal(
    defaultValueKey({ key: "fontWeight", device, state }),
    defaultValueValue({ v, key: "fontWeight", device }),
    defaultValueValue({ v, key: "fontStyle", device })
  );

  return {
    id: defaultValueKey({ key: "fontWeight", device }),
    label: t("Weight"),
    type: "select",
    display: "block",
    choices: getWeightChoices(fontFamily),
    value: fontWeight,
    onChange: fontWeight => {
      const values = {
        ...{ v, device, onChange, prefix },
        ...{ current: "fontWeight", value: fontWeight }
      };

      console.log(saveOnChanges(values));

      return saveOnChanges(values);
    }
  };
}

export function toolbarTypography2LetterSpacing({
  v,
  device,
  state,
  prefix,
  onChange
}) {
  const letterSpacing = getOptionFontByGlobal(
    defaultValueKey({ key: "letterSpacing", device, state }),
    defaultValueValue({ v, key: "letterSpacing", device }),
    defaultValueValue({ v, key: "fontStyle", device })
  );

  return {
    id: defaultValueKey({ key: "letterSpacing", device }),
    label: t("Letter Sp."),
    type: "stepper",
    display: "block",
    min: -20,
    max: 20,
    step: 0.5,
    value: letterSpacing,
    onChange: letterSpacing => {
      const values = {
        ...{ v, device, onChange, prefix },
        ...{ current: "letterSpacing", value: letterSpacing }
      };

      console.log(saveOnChanges(values));

      return saveOnChanges(values);
    }
  };
}
