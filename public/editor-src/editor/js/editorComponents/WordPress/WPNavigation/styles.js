import classnames from "classnames";
import { css } from "glamor";
import { getFontById } from "visual/utils/fonts";
import { tabletSyncOnChange, mobileSyncOnChange } from "visual/utils/onChange";
import { styleColor } from "visual/utils/style";

export function styleClassName(v) {
  const { className } = v;
  let glamorObj;

  if (IS_EDITOR) {
    glamorObj = {
      ".brz & .menu": {
        fontFamily: "var(--fontFamily)"
      },
      ".brz & .menu > .menu-item a": {
        color: "var(--color)"
      },
      ".brz-ed--desktop &": {
        maxWidth: "var(--maxWidth)",
        width: "var(--width)",

        "& .menu > .menu-item": {
          fontSize: "var(--fontSize)",
          lineHeight: "var(--lineHeight)",
          fontWeight: "var(--fontWeight)",
          letterSpacing: "var(--letterSpacing)",

          "&:not(:last-child)": {
            marginRight: "var(--itemPadding)"
          }
        }
      },
      ".brz-ed--tablet &": {
        maxWidth: "var(--tabletMaxWidth)",
        width: "var(--width)",

        "& .menu > .menu-item": {
          fontSize: "var(--tabletFontSize)",
          lineHeight: "var(--tabletLineHeight)",
          fontWeight: "var(--tabletFontWeight)",
          letterSpacing: "var(--tabletLetterSpacing)",

          "&:not(:last-child)": {
            marginRight: "var(--tabletMarginRight)",
            marginBottom: "var(--tabletMarginBottom)"
          }
        },
        "& .brz-wp-shortcode__menu__icon--bars": {
          backgroundColor: "var(--color)",
          color: "var(--color)"
        }
      },
      ".brz-ed--mobile &": {
        maxWidth: "var(--mobileMaxWidth)",
        width: "var(--width)",

        "& .menu > .menu-item": {
          fontSize: "var(--mobileFontSize)",
          lineHeight: "var(--mobileLineHeight)",
          fontWeight: "var(--mobileFontWeight)",
          letterSpacing: "var(--mobileLetterSpacing)",

          "&:not(:last-child)": {
            marginRight: "var(--mobileMarginRight)",
            marginBottom: "var(--mobileMarginBottom)"
          }
        },
        "& .brz-wp-shortcode__menu__icon--bars": {
          backgroundColor: "var(--color)",
          color: "var(--color)"
        }
      }
    };
  } else {
    const {
      menuName,
      fontFamily,
      fontFamilyType,
      fontSize,
      lineHeight,
      fontWeight,
      letterSpacing,
      width,
      itemPadding,

      // Tablet
      tabletFontSize,
      tabletLineHeight,
      tabletFontWeight,
      tabletLetterSpacing,
      tabletToggleMenu,

      // Mobile
      mobileFontSize,
      mobileLineHeight,
      mobileFontWeight,
      mobileLetterSpacing,
      mobileToggleMenu
    } = v;

    glamorObj = {
      ".brz &": {
        maxWidth: `${width}%`,
        width: menuName ? "auto" : "100%"
      },
      ".brz & .menu": {
        fontFamily: getFontById({ family: fontFamily, type: fontFamilyType })
          .family
      },
      ".brz & .menu > .menu-item": {
        fontSize,
        lineHeight,
        fontWeight,
        letterSpacing,

        "& > a": {
          color: styleColor({ v, device: "desktop", state: "normal" })
        },
        "&:not(:last-child)": {
          marginRight: `${itemPadding}px`
        }
      },
      "@media (max-width: 991px)": {
        ".brz &": {
          maxWidth: `${tabletSyncOnChange(v, "width")}%`
        },
        ".brz & .menu > .menu-item": {
          fontSize: `${tabletFontSize}px`,
          lineHeight: tabletLineHeight,
          fontWeight: tabletFontWeight,
          letterSpacing: `${tabletLetterSpacing}px`
        }
      },
      "@media (min-width: 768px) and (max-width: 991px)": {
        ".brz & .menu > .menu-item": {
          "&:not(:last-child)": {
            marginRight:
              tabletToggleMenu === "off"
                ? `${tabletSyncOnChange(v, "itemPadding")}px`
                : 0,
            marginBottom:
              tabletToggleMenu === "on"
                ? `${tabletSyncOnChange(v, "itemPadding")}px`
                : 0
          }
        },
        "& .brz-wp-shortcode__menu__toggle--tablet .menu .sub-menu a": {
          color: styleColor({ v, device: "desktop", state: "normal" })
        },
        "& .brz-wp-shortcode__menu__icon--bars": {
          backgroundColor: styleColor({
            v,
            device: "desktop",
            state: "normal"
          }),
          color: styleColor({ v, device: "desktop", state: "normal" })
        }
      },
      "@media (max-width: 767px)": {
        ".brz &": {
          maxWidth: `${mobileSyncOnChange(v, "width")}%`
        },
        ".brz & .menu > .menu-item": {
          fontSize: `${mobileFontSize}px`,
          lineHeight: mobileLineHeight,
          fontWeight: mobileFontWeight,
          letterSpacing: `${mobileLetterSpacing}px`,

          "&:not(:last-child)": {
            marginRight:
              mobileToggleMenu === "off"
                ? `${mobileSyncOnChange(v, "itemPadding")}px`
                : 0,
            marginBottom:
              mobileToggleMenu === "on"
                ? `${mobileSyncOnChange(v, "itemPadding")}px`
                : 0
          }
        },
        "& .brz-wp-shortcode__menu__toggle--mobile .menu .sub-menu a": {
          color: styleColor({ v, device: "desktop", state: "normal" })
        },
        "& .brz-wp-shortcode__menu__icon--bars": {
          backgroundColor: styleColor({
            v,
            device: "desktop",
            state: "normal"
          }),
          color: styleColor({ v, device: "desktop", state: "normal" })
        }
      }
    };
  }

  const glamorClassName = String(css(glamorObj));

  return classnames("brz-wp-shortcode__menu", glamorClassName, className);
}

export function styleCSSVars(v) {
  if (IS_PREVIEW) return;

  const {
    menuName,
    fontFamily,
    fontFamilyType,
    fontSize,
    fontWeight,
    lineHeight,
    letterSpacing,
    width,
    itemPadding,

    // Tablet
    tabletFontSize,
    tabletLineHeight,
    tabletFontWeight,
    tabletLetterSpacing,
    tabletToggleMenu,

    // Mobile
    mobileFontSize,
    mobileLineHeight,
    mobileFontWeight,
    mobileLetterSpacing,
    mobileToggleMenu
  } = v;

  return {
    "--maxWidth": `${width}%`,
    "--itemPadding": `${itemPadding}px`,
    "--width": menuName ? "auto" : "100%",

    // Typography
    "--fontFamily": getFontById({ family: fontFamily, type: fontFamilyType })
      .family,
    "--fontWeight": fontWeight,
    "--fontSize": `${fontSize}px`,
    "--lineHeight": lineHeight,
    "--letterSpacing": `${letterSpacing}px`,

    // Colors
    "--color": styleColor({ v, device: "desktop", state: "normal" }),

    // Tablet
    "--tabletMaxWidth": `${tabletSyncOnChange(v, "width")}%`,
    "--tabletItemPadding": `${tabletSyncOnChange(v, "itemPadding")}px`,
    "--tabletMarginRight":
      tabletToggleMenu === "off"
        ? `${tabletSyncOnChange(v, "itemPadding")}px`
        : 0,
    "--tabletMarginBottom":
      tabletToggleMenu === "on"
        ? `${tabletSyncOnChange(v, "itemPadding")}px`
        : 0,
    "--tabletFontSize": `${tabletFontSize}px`,
    "--tabletLineHeight": tabletLineHeight,
    "--tabletFontWeight": tabletFontWeight,
    "--tabletLetterSpacing": `${tabletLetterSpacing}px`,

    // Mobile
    "--mobileItemPadding": `${mobileSyncOnChange(v, "itemPadding")}px`,
    "--mobileMarginRight":
      mobileToggleMenu === "off"
        ? `${mobileSyncOnChange(v, "itemPadding")}px`
        : 0,
    "--mobileMarginBottom":
      mobileToggleMenu === "on"
        ? `${mobileSyncOnChange(v, "itemPadding")}px`
        : 0,
    "--mobileFontSize": `${mobileFontSize}px`,
    "--mobileLineHeight": mobileLineHeight,
    "--mobileFontWeight": mobileFontWeight,
    "--mobileLetterSpacing": `${mobileLetterSpacing}px`,
    "--mobileMaxWidth": `${mobileSyncOnChange(v, "width")}%`
  };
}
