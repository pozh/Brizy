import { createSelector } from "reselect";
import produce from "immer";
import configRules from "visual/config/rules";
import { objectTraverse2, objectFromEntries } from "visual/utils/object";

// === 0 DEPENDENCIES ===

export const pageSelector = state => state.page;

export const projectSelector = state => state.project || {};

export const globalBlocksSelector = state => state.globalBlocks || {};

export const globalBlocksUpdatesSelector = state => state.globalBlocksUpdates;

export const savedBlocksSelector = state => state.savedBlocks || {};

export const stylesSelector = state => state.styles || [];

export const fontSelector = state => state.fonts || {};

export const deviceModeSelector = state => state.ui.deviceMode;

export const copiedElementSelector = state => state.copiedElement;

export const currentStyleIdSelector = state => state.currentStyleId;

export const currentStyleSelector = state => state.currentStyle;

export const extraFontStylesSelector = state => state.extraFontStyles;

export const screenshotsSelector = state => state.screenshots || {};

// === END 0 DEPENDENCIES ===

// === 1 DEPENDENCY ===

export const pageDataSelector = createSelector(
  pageSelector,
  page => page.data || {}
);

export const pageBlocksSelector = createSelector(
  pageDataSelector,
  pageData => pageData.items || []
);

export const unDeletedFontSelector = createSelector(
  fontSelector,
  fonts => {
    return Object.entries(fonts).reduce((acc, curr) => {
      const [type, { data = [] }] = curr;

      return {
        ...acc,
        [`${type}`]: {
          data: data.filter(i => i.deleted !== true)
        }
      };
    }, {});
  }
);

// === END 1 DEPENDENCY ===

// === 2 DEPENDENCIES ===

// all global block refs are replaced with their data
export const pageDataNoRefsSelector = createSelector(
  pageDataSelector,
  globalBlocksSelector,
  (pageData, globalBlocks) => {
    return transformData(pageData);

    function transformData(data) {
      return produce(data, draft => {
        objectTraverse2(draft, obj => {
          if (obj.type && obj.type === "GlobalBlock" && obj.value) {
            const { globalBlockId } = obj.value;

            if (globalBlocks[globalBlockId]) {
              transformData(Object.assign(obj, globalBlocks[globalBlockId]));
            }
          }
        });
      });
    }
  }
);

export const pageAssembledSelector = createSelector(
  pageSelector,
  screenshotsSelector,
  (page, screenshots) => {
    if (Object.keys(screenshots).length === 0) {
      return page;
    }

    return produce(page, draft => {
      objectTraverse2(draft, obj => {
        if (
          obj.type &&
          obj.type !== "GlobalBlock" &&
          obj.value &&
          obj.value._id &&
          screenshots[obj.value._id]
        ) {
          Object.assign(obj.value, screenshots[obj.value._id]);
        }
      });
    });
  }
);

export const savedBlocksAssembledSelector = createSelector(
  savedBlocksSelector,
  screenshotsSelector,
  (savedBlocks, screenshots) => {
    const savedBlocksScreenshotsExist = Object.values(screenshots).find(
      s => s.blockScreenshot === "saved"
    );
    if (savedBlocksScreenshotsExist) {
      return savedBlocks;
    }

    return objectFromEntries(
      Object.entries(savedBlocks).map(entry => {
        const [key, value] = entry;
        const blockScreenshot = screenshots[key];

        if (!blockScreenshot) {
          return entry;
        }

        const newValue = {
          ...value,
          value: {
            ...value.value,
            ...blockScreenshot
          }
        };

        return [key, newValue];
      })
    );
  }
);

export const globalBlocksInPageSelector = createSelector(
  globalBlocksSelector,
  pageBlocksSelector,
  (globalBlocks, pageBlocks) => {
    const acc = {};

    extractGlobalBlocks(pageBlocks);

    return acc;

    function extractGlobalBlocks(obj) {
      // global blocks can be deep in the tree (like popups)
      // that's why it's not sufficient to search only with a simple reduce
      objectTraverse2(obj, obj => {
        if (obj.type && obj.type === "GlobalBlock" && obj.value) {
          const { globalBlockId } = obj.value;

          if (!acc[globalBlockId]) {
            acc[globalBlockId] = globalBlocks[globalBlockId];
            extractGlobalBlocks(globalBlocks[globalBlockId]);
          }
        }
      });
    }
  }
);

// published globalBlocks + their updates
// this is used when rendering globalBlocks refs in the page
// and purposefully omits screenshots, to prevent a rerender when screenshots change
export const globalBlocksAssembled2Selector = createSelector(
  globalBlocksSelector,
  globalBlocksUpdatesSelector,
  (globalBlocks, globalBlocksUpdates) => {
    return objectFromEntries(
      Object.entries(globalBlocks).map(entry => {
        const [key, value] = entry;
        const update = globalBlocksUpdates[key];

        if (!update) {
          return entry;
        }

        const value_ = { ...value, value: update };

        return [key, value_];
      })
    );
  }
);

// published globalBlocks + published screenshots (those made when the global blocks is created)
// this is when saving the screenshot, after the globalBlock was created
export const globalBlocksAssembled3Selector = createSelector(
  globalBlocksSelector,
  screenshotsSelector,
  (globalBlocks, screenshots) => {
    return objectFromEntries(
      Object.entries(globalBlocks).map(entry => {
        const [key, value] = entry;
        const screenshot =
          screenshots._published && screenshots._published[key];

        if (!screenshot) {
          return entry;
        }

        const value_ = {
          ...value,
          value: {
            ...value.value,
            ...screenshot
          }
        };

        return [key, value_];
      })
    );
  }
);

export const rulesSelector = createSelector(
  currentStyleSelector,
  extraFontStylesSelector,
  (currentStyle, extraFontStyles) => {
    const { colorPalette, fontStyles } = currentStyle;
    const mergedFontStyles = fontStyles.concat(extraFontStyles);

    const generatedColorRules = colorPalette.reduce(
      (acc, color) => ({
        ...acc,
        [`${color.id}__color`]: {
          colorHex: color.hex
        },
        [`${color.id}__hoverColor`]: {
          hoverColorHex: color.hex
        },
        [`${color.id}__bg`]: {
          bgColorHex: color.hex
        },
        [`${color.id}__hoverBg`]: {
          hoverBgColorHex: color.hex
        },
        [`${color.id}__gradient`]: {
          gradientColorHex: color.hex
        },
        [`${color.id}__hoverGradient`]: {
          hoverGradientColorHex: color.hex
        },
        [`${color.id}__bg2`]: {
          bg2ColorHex: color.hex
        },
        [`${color.id}__border`]: {
          borderColorHex: color.hex
        },
        [`${color.id}__hoverBorder`]: {
          hoverBorderColorHex: color.hex
        },
        [`${color.id}__arrowsColor`]: {
          sliderArrowsColorHex: color.hex
        },
        [`${color.id}__dotsColor`]: {
          sliderDotsColorHex: color.hex
        },
        [`${color.id}__boxShadow`]: {
          boxShadowColorHex: color.hex
        },
        [`${color.id}__shapeTopColor`]: {
          shapeTopColorHex: color.hex
        },
        [`${color.id}__shapeBottomColor`]: {
          shapeBottomColorHex: color.hex
        },
        [`${color.id}__paginationColor`]: {
          paginationColorHex: color.hex
        },
        [`${color.id}__tabletBg`]: {
          tabletBgColorHex: color.hex
        },
        [`${color.id}__tabletBorder`]: {
          tabletBorderColorHex: color.hex
        },
        [`${color.id}__mobileBg`]: {
          mobileBgColorHex: color.hex
        },
        [`${color.id}__mobileBorder`]: {
          mobileBorderColorHex: color.hex
        },
        [`${color.id}__subMenuColor`]: {
          subMenuColorHex: color.hex
        },
        [`${color.id}__subMenuHoverColor`]: {
          subMenuHoverColorHex: color.hex
        },
        [`${color.id}__subMenuBgColor`]: {
          subMenuBgColorHex: color.hex
        },
        [`${color.id}__subMenuHoverBgColor`]: {
          subMenuHoverBgColorHex: color.hex
        },
        [`${color.id}__subMenuBorderColor`]: {
          subMenuBorderColorHex: color.hex
        },
        [`${color.id}__mMenuColor`]: {
          mMenuColorHex: color.hex
        },
        [`${color.id}__mMenuHoverColor`]: {
          mMenuHoverColorHex: color.hex
        },
        [`${color.id}__mMenuBgColor`]: {
          mMenuBgColorHex: color.hex
        },
        [`${color.id}__mMenuBorderColor`]: {
          mMenuBorderColorHex: color.hex
        },
        [`${color.id}__mMenuIconColor`]: {
          mMenuIconColorHex: color.hex
        },
        [`${color.id}__tabletMMenuIconColor`]: {
          tabletMMenuIconColorHex: color.hex
        },
        [`${color.id}__mobileMMenuIconColor`]: {
          mobileMMenuIconColorHex: color.hex
        }
      }),
      {}
    );
    const generatedFontRules = mergedFontStyles.reduce(
      (acc, font) => ({
        ...acc,
        [`${font.id}__fsDesktop`]: {
          fontFamily: font.fontFamily,
          fontFamilyType: font.fontFamilyType,
          fontSize: font.fontSize,
          fontWeight: font.fontWeight,
          lineHeight: font.lineHeight,
          letterSpacing: font.letterSpacing
        },
        [`${font.id}__fsTablet`]: {
          tabletFontSize: font.tabletFontSize,
          tabletFontWeight: font.tabletFontWeight,
          tabletLineHeight: font.tabletLineHeight,
          tabletLetterSpacing: font.tabletLetterSpacing
        },
        [`${font.id}__fsMobile`]: {
          mobileFontSize: font.mobileFontSize,
          mobileFontWeight: font.mobileFontWeight,
          mobileLineHeight: font.mobileLineHeight,
          mobileLetterSpacing: font.mobileLetterSpacing
        },
        [`${font.id}__subMenuFsDesktop`]: {
          subMenuFontFamily: font.fontFamily,
          subMenuFontFamilyType: font.fontFamilyType,
          subMenuFontSize: font.fontSize,
          subMenuFontWeight: font.fontWeight,
          subMenuLineHeight: font.lineHeight,
          subMenuLetterSpacing: font.letterSpacing
        },
        [`${font.id}__subMenuFsTablet`]: {
          tabletSubMenuFontSize: font.tabletFontSize,
          tabletSubMenuFontWeight: font.tabletFontWeight,
          tabletSubMenuLineHeight: font.tabletLineHeight,
          tabletSubMenuLetterSpacing: font.tabletLetterSpacing
        },
        [`${font.id}__subMenuFsMobile`]: {
          mobileSubMenuFontSize: font.mobileFontSize,
          mobileSubMenuFontWeight: font.mobileFontWeight,
          mobileSubMenuLineHeight: font.mobileLineHeight,
          mobileSubMenuLetterSpacing: font.mobileLetterSpacing
        },
        [`${font.id}__mMenuFsDesktop`]: {
          mMenuFontFamily: font.fontFamily,
          mMenuFontFamilyType: font.fontFamilyType,
          mMenuFontSize: font.fontSize,
          mMenuFontWeight: font.fontWeight,
          mMenuLineHeight: font.lineHeight,
          mMenuLetterSpacing: font.letterSpacing
        },
        [`${font.id}__mMenuFsTablet`]: {
          tabletMMenuFontSize: font.tabletFontSize,
          tabletMMenuFontWeight: font.tabletFontWeight,
          tabletMMenuLineHeight: font.tabletLineHeight,
          tabletMMenuLetterSpacing: font.tabletLetterSpacing
        },
        [`${font.id}__mMenuFsMobile`]: {
          mobileMMenuFontSize: font.mobileFontSize,
          mobileMMenuFontWeight: font.mobileFontWeight,
          mobileMMenuLineHeight: font.mobileLineHeight,
          mobileMMenuLetterSpacing: font.mobileLetterSpacing
        }
      }),
      {}
    );

    return {
      ...configRules,
      ...generatedColorRules,
      ...generatedFontRules
    };
  }
);

export const copiedElementNoRefsSelector = createSelector(
  copiedElementSelector,
  globalBlocksSelector,
  (copiedElement, globalBlocks) => {
    return produce(copiedElement, draft => {
      objectTraverse2(draft, obj => {
        if (obj.type && obj.type === "GlobalBlock" && obj.value) {
          const { globalBlockId } = obj.value;

          if (globalBlocks[globalBlockId]) {
            Object.assign(obj, globalBlocks[globalBlockId]);
          }
        }
      });
    });
  }
);

// === END 2 DEPENDENCIES ===

// === 3 DEPENDENCIES ===

export const globalBlocksAssembledSelector = createSelector(
  globalBlocksSelector,
  globalBlocksUpdatesSelector,
  screenshotsSelector,
  (globalBlocks, globalBlocksUpdates, screenshots) => {
    return objectFromEntries(
      Object.entries(globalBlocks).map(entry => {
        const [key, value] = entry;
        const update = globalBlocksUpdates[key];
        const screenshot = screenshots[key];

        if (!update && !screenshot) {
          return entry;
        }

        let value_ = produce(value, draft => {
          if (update) {
            draft.value = update;
          }

          if (screenshot) {
            Object.assign(draft.value, screenshot);
          }

          objectTraverse2(draft.value, obj => {
            if (
              obj.type &&
              obj.type !== "GlobalBlock" &&
              obj.value &&
              obj.value._id &&
              screenshots[obj.value._id]
            ) {
              Object.assign(obj.value, screenshots[obj.value._id]);
            }
          });
        });

        return [key, value_];
      })
    );
  }
);

// ==== END 3 DEPENDENCIES ===

// === 6 DEPENDENCIES ===

export const projectAssembled = createSelector(
  projectSelector,
  fontSelector,
  stylesSelector,
  currentStyleIdSelector,
  currentStyleSelector,
  extraFontStylesSelector,
  (project, fonts, styles, currentStyleId, currentStyle, extraFontStyles) => {
    return produce(project, draft => {
      draft.data.fonts = fonts;
      draft.data.styles = styles;
      draft.data.selectedStyle = currentStyleId;
      draft.data.extraFontStyles = extraFontStyles;

      for (let i = 0; i < draft.data.styles.length; i++) {
        if (draft.data.styles[i].id === currentStyle.id) {
          draft.data.styles[i] = currentStyle;
        }
      }
    });
  }
);

// === END 6 DEPENDENCIES ===

// === ANOMALIES ===

export const pageDataAssembledSelector = createSelector(
  pageAssembledSelector,
  page => page.data || {}
);

export const pageBlocksAssembledSelector = createSelector(
  pageDataAssembledSelector,
  pageData => pageData.items || []
);

// === END ANOMALIES ===
