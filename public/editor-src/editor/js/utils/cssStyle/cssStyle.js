import { uuid } from "visual/utils/uuid";
import * as onStyles from "visual/utils/cssStyle";

const devices = {
  desktop: 1500,
  tablet: 991,
  mobile: 767
};

const states = {
  normal: "normal",
  hover: "hover"
};

let legacyByDefault = {};

export function renderStyles({ vs, v, styles, props }) {
  const defaultCSS = loopStyles({ vs, styles, props });
  const customCSS = loopStyles({ vs, v, styles, props });

  return [defaultCSS, customCSS];
}
function loopStyles({ vs, v, styles, props }) {
  let out = "";
  let legacy = {};
  let mode = "";

  Object.entries(devices).forEach(function([device, deviceValue]) {
    Object.entries(states).forEach(function([state, stateValue]) {
      if (device === "desktop" || state === "normal") {
        Object.entries(styles).forEach(function([styleKey, styleValue]) {
          Object.entries(styleValue).forEach(function([
            styleKeyKey,
            styleValueValue
          ]) {
            styleValueValue.forEach(function(currentStyle) {
              const currentStyleArray = currentStyle.split("|||");

              if (currentStyleArray.length === 2) {
                mode = currentStyleArray[1];
              } else {
                mode = "";
              }

              if (v) {
                out = onStyles[currentStyleArray[0]]({
                  v,
                  device,
                  state,
                  mode,
                  props
                });
              } else {
                out = onStyles[currentStyleArray[0]]({
                  v: vs,
                  device,
                  state,
                  mode,
                  props
                });
              }

              legacy = legacyByOut({
                legacy,
                out,
                styleKey,
                state,
                currentStyle
              });
            });
          });
        });
      }
    });
  });

  //console.log(JSON.parse(JSON.stringify(output)));
  //console.log(JSON.parse(JSON.stringify(legacy)));

  if (!v) legacyByDefault = legacy;

  return cssOutput({ v, styles, legacy });
}

function cssOutput({ v, styles, legacy }) {
  let goStandart = "";
  let goInterval = "";
  let gooutStandart = "";
  let gooutInterval = "";
  let goout = "";
  let devicesCounter = 0;
  let standartCss = "";
  let intervalCss = "";

  Object.entries(devices).forEach(function(
    [device, deviceValue],
    deviceKey,
    devicesArray
  ) {
    Object.entries(states).forEach(function([state, stateValue]) {
      if (legacy[state]) {
        gooutStandart = "";
        gooutInterval = "";

        Object.entries(legacy[state]).forEach(function([className, type]) {
          goStandart = "";
          goInterval = "";

          Object.entries(type).forEach(function([typeKey, cssArray]) {
            let go = cssArray[devicesCounter];

            if (
              v &&
              JSON.stringify(legacyByDefault[state][className][typeKey]) ===
                JSON.stringify(legacy[state][className][typeKey])
            ) {
              go = "";
            }

            goStandart +=
              styles[className].standart &&
              styles[className].standart.indexOf(typeKey) !== -1 &&
              go !== "" &&
              go !== undefined
                ? go
                : "";

            goInterval +=
              styles[className].interval &&
              styles[className].interval.indexOf(typeKey) !== -1 &&
              go !== "" &&
              go !== undefined
                ? go
                : "";
          });

          let key;
          if (state === "normal") {
            key = `${className.replace(":hover", "")}{`;
          } else {
            key = `${className}{`;
          }

          if (goStandart !== "") {
            gooutStandart += key + goStandart + "}";
          }

          if (goInterval !== "") {
            gooutInterval += key + goInterval + "}";
          }
        });
      }

      if (gooutStandart !== "") {
        standartCss =
          device === "desktop" && state === "hover"
            ? `@media(min-width:${devicesArray[devicesCounter + 1][1]}px){`
            : device === "desktop"
            ? ""
            : devicesCounter === devicesArray.length - 1
            ? `@media(max-width:${deviceValue}px){`
            : `@media(max-width:${
                devicesArray[devicesCounter][1]
              }px) and (min-width:${devicesArray[devicesCounter + 1][1] +
                1}px){`;

        goout += standartCss + gooutStandart + (standartCss !== "" ? "}" : "");
      }

      if (gooutInterval !== "") {
        intervalCss =
          devicesCounter === 0
            ? `@media(min-width:${devicesArray[devicesCounter + 1][1]}px){`
            : devicesCounter === devicesArray.length - 1
            ? `@media(max-width:${deviceValue}px){`
            : `@media(max-width:${
                devicesArray[devicesCounter][1]
              }px) and (min-width:${devicesArray[devicesCounter + 1][1] +
                1}px){`;

        goout += intervalCss + gooutInterval + (intervalCss !== "" ? "}" : "");
      }
    });

    devicesCounter++;
  });

  return goout;
}

function legacyByOut({ legacy, out, styleKey, state, currentStyle }) {
  if (
    state === "hover" &&
    legacy.normal &&
    legacy.normal[styleKey] &&
    legacy.normal[styleKey][currentStyle]
  ) {
    out = legacy.normal[styleKey][currentStyle][0] === out ? "" : out;
  }

  if (
    legacy[state] &&
    legacy[state][styleKey] &&
    legacy[state][styleKey][currentStyle]
  ) {
    out = legacy[state][styleKey][currentStyle][0] === out ? "" : out;
  }

  if (legacy[state]) {
    if (legacy[state][styleKey]) {
      if (legacy[state][styleKey][currentStyle]) {
        legacy[state][styleKey][currentStyle].push(out);
      } else {
        legacy[state][styleKey][currentStyle] = [out];
      }
    } else {
      legacy[state][styleKey] = { [currentStyle]: [out] };
    }
  } else {
    legacy[state] = { [styleKey]: { [currentStyle]: [out] } };
  }

  return legacy;
}

const cssCache = new Map();

export function css(defaultID, elementID, [defaultStyle, elementStyle]) {
  let defaultData;
  if (defaultStyle) {
    defaultData = cssCache.get(defaultID);
    // we don't treat the else clause because we assume that
    // default styles will be the same for a given id no matter
    // how many times this function will be called
    if (!defaultData) {
      const className = `brz-css-${uuid(5)}`;
      const cssText = replacePlaceholders(defaultStyle, className);
      let node;

      if (!css.isServer) {
        node = document.createElement("style");

        node.setAttribute("data-brz-css", "");
        node.appendChild(document.createTextNode(""));
        node.childNodes[0].nodeValue = cssText;

        document.head.appendChild(node);
      }

      defaultData = {
        node,
        className,
        cssText
      };
      cssCache.set(defaultID, defaultData);
    }
  }

  let elementData;
  if (elementStyle) {
    elementData = cssCache.get(elementID);
    if (!elementData) {
      const className = `brz-css-${uuid(5)}`;
      const cssText = replacePlaceholders(elementStyle, className);
      let node;

      if (!css.isServer) {
        node = document.createElement("style");

        node.setAttribute("data-brz-css", "");
        node.appendChild(document.createTextNode(""));
        node.childNodes[0].nodeValue = cssText;

        document.head.appendChild(node);
      }

      elementData = {
        node,
        className,
        cssText
      };
      cssCache.set(elementID, elementData);
    } else {
      const { node, className, cssText } = elementData;
      const cssTextNext = replacePlaceholders(elementStyle, className);

      if (cssTextNext !== cssText) {
        if (!css.isServer) {
          node.childNodes[0].nodeValue = cssTextNext;
        }

        elementData = {
          node,
          className,
          cssText: cssTextNext
        };
        cssCache.set(elementID, elementData);
      }
    }
  }

  return [
    ...(defaultData ? [defaultData.className] : []),
    ...(elementData ? [elementData.className] : [])
  ].join(" ");
}

function replacePlaceholders(styles, className) {
  return styles.replace(/&&/gm, `.${className}`);
}

export function renderStatic(cb) {
  cssDiff.isServer = true;
  cssCache.clear();

  const html = cb();
  let css = "";

  for (let { cssText } of cssCache.values()) {
    css += cssText;
    css += "\n\n\n";
  }

  return { html, css };
}

export function tmpCSSFromCache() {
  let css = "";

  for (let { cssText } of cssCache.values()) {
    css += cssText;
    css += "\n";
  }

  return css;
}
