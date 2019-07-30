import { hexToRgba } from "visual/utils/color";
import { getOptionColorHexByPalette } from "visual/utils/options";
import { t } from "visual/utils/i18n";
import {
  defaultValueValue,
  tabletSyncOnChange,
  mobileSyncOnChange
} from "visual/utils/onChange";
import {
  toolbarBgImage,
  toolbarColor2,
  toolbarColorHexField2,
  toolbarGradientType,
  toolbarBgColorHexField2,
  toolbarBgColor2,
  toolbarGradientLinearDegree,
  toolbarGradientRadialDegree
} from "visual/utils/toolbar";

export function getItemsForDesktop(v, component) {
  const device = "desktop";

  const { hex: bgColorHex } = getOptionColorHexByPalette(
    defaultValueValue({ v, key: "bgColorHex", device }),
    defaultValueValue({ v, key: "bgColorPalette", device })
  );
  return [
    {
      id: "toolbarPopup",
      type: "popover",
      icon: "nc-popup",
      title: "Popup",
      position: 70,
      options: [
        {
          id: "makeItGlobal",
          label: t("Make it Global"),
          type: "switch",
          value: component.props.meta.globalBlockId ? "on" : "off",
          onChange: value => {
            value === "on"
              ? component.becomeGlobal()
              : component.becomeNormal();
          }
        }
      ]
    },
    {
      id: "toolbarMedia",
      type: "popover",
      icon: "nc-background",
      title: t("Background"),
      position: 80,
      options: [
        toolbarBgImage({
          v,
          device,
          state: "normal",
          onChange: ["onChangeBgImage", "onChangeBgImageBgOpacity"]
        })
      ]
    },
    {
      id: "toolbarColor",
      type: "popover",
      size: "auto",
      title: t("Colors"),
      position: 90,
      icon: {
        style: {
          backgroundColor: hexToRgba(bgColorHex, v.bgColorOpacity)
        }
      },
      options: [
        {
          id: "tabsState",
          tabsPosition: "left",
          type: "tabs",
          value: v.tabsState,
          tabs: [
            {
              id: "tabNormal",
              tabIcon: "nc-circle",
              title: t("Normal"),
              options: [
                {
                  id: "tabsColor",
                  type: "tabs",
                  value: v.tabsColor,
                  tabs: [
                    {
                      id: "tabOverlay",
                      label: t("Overlay"),
                      options: [
                        toolbarBgColor2({
                          v,
                          device,
                          state: "normal",
                          onChangeType: ["onChangeBgColorType2"],
                          onChangeHex: [
                            "onChangeBgColorHexAndOpacity2",
                            "onChangeBgColorHexAndOpacityPalette2",
                            "onChangeBgColorHexAndOpacityDependencies2"
                          ],
                          onChangePalette: [
                            "onChangeBgColorPalette2",
                            "onChangeBgColorPaletteOpacity2",
                            "onChangeBgColorHexAndOpacityDependencies2"
                          ],
                          onChangeGradientHex: [
                            "onChangeBgColorHexAndOpacity2",
                            "onChangeBgColorHexAndOpacityPalette2",
                            "onChangeBgColorHexAndOpacityDependencies2"
                          ],
                          onChangeGradientPalette: [
                            "onChangeBgColorPalette2",
                            "onChangeBgColorPaletteOpacity2",
                            "onChangeBgColorHexAndOpacityDependencies2"
                          ],
                          onChangeGradient: ["onChangeGradientRange2"]
                        }),
                        {
                          type: "grid",
                          className: "brz-ed-grid__color-fileds",
                          columns: [
                            {
                              width: 30,
                              options: [
                                toolbarBgColorHexField2({
                                  v,
                                  device,
                                  state: "normal",
                                  prefix:
                                    defaultValueValue({
                                      v,
                                      key: "gradientActivePointer",
                                      device,
                                      state: "normal"
                                    }) === "startPointer"
                                      ? "bg"
                                      : "gradient",
                                  onChange: [
                                    "onChangeBgColorHexAndOpacity2",
                                    "onChangeBgColorHexAndOpacityPalette2",
                                    "onChangeBgColorHexAndOpacityDependencies2"
                                  ]
                                })
                              ]
                            },
                            {
                              width: 52,
                              options: [
                                toolbarGradientType({
                                  v,
                                  device,
                                  state: "normal",
                                  className:
                                    "brz-ed__select--transparent brz-ed__select--align-right",
                                  disabled:
                                    defaultValueValue({
                                      v,
                                      key: "bgColorType",
                                      device,
                                      state: "normal"
                                    }) === "solid"
                                })
                              ]
                            },
                            {
                              width: 18,
                              options: [
                                toolbarGradientLinearDegree({
                                  v,
                                  device,
                                  state: "normal",
                                  disabled:
                                    defaultValueValue({
                                      v,
                                      key: "bgColorType",
                                      device,
                                      state: "normal"
                                    }) === "solid" ||
                                    defaultValueValue({
                                      v,
                                      key: "gradientType",
                                      device,
                                      state: "normal"
                                    }) === "radial"
                                }),
                                toolbarGradientRadialDegree({
                                  v,
                                  device,
                                  state: "normal",
                                  disabled:
                                    defaultValueValue({
                                      v,
                                      key: "bgColorType",
                                      device,
                                      state: "normal"
                                    }) === "solid" ||
                                    defaultValueValue({
                                      v,
                                      key: "gradientType",
                                      device,
                                      state: "normal"
                                    }) === "linear"
                                })
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      id: "tabClose",
                      label: t("Close"),
                      options: [
                        toolbarColor2({
                          v,
                          device,
                          state: "normal",
                          onChangeHex: [
                            "onChangeColorHexAndOpacity",
                            "onChangeColorHexAndOpacityPalette"
                          ],
                          onChangePalette: [
                            "onChangeColorPalette",
                            "onChangeColorPaletteOpacity"
                          ]
                        }),
                        {
                          type: "grid",
                          className: "brz-ed-grid__color-fileds",
                          columns: [
                            {
                              width: 100,
                              options: [
                                toolbarColorHexField2({
                                  v,
                                  device,
                                  state: "normal",
                                  onChange: [
                                    "onChangeColorHexAndOpacity",
                                    "onChangeColorHexAndOpacityPalette"
                                  ]
                                })
                              ]
                            },
                            {
                              width: 52,
                              options: []
                            },
                            {
                              width: 18,
                              options: []
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              id: "tabHover",
              tabIcon: "nc-hover",
              title: t("Hover"),
              options: [
                {
                  id: "tabsColor",
                  type: "tabs",
                  value: v.tabsColor,
                  hideHandlesWhenOne: false,
                  tabs: [
                    {
                      id: "tabClose",
                      label: t("Close"),
                      options: [
                        toolbarColor2({
                          v,
                          device,
                          state: "hover",
                          onChangeHex: [
                            "onChangeColorHexAndOpacity",
                            "onChangeColorHexAndOpacityPalette"
                          ],
                          onChangePalette: [
                            "onChangeColorPalette",
                            "onChangeColorPaletteOpacity"
                          ]
                        }),
                        {
                          type: "grid",
                          className: "brz-ed-grid__color-fileds",
                          columns: [
                            {
                              width: 100,
                              options: [
                                toolbarColorHexField2({
                                  v,
                                  device,
                                  state: "hover",
                                  onChange: [
                                    "onChangeColorHexAndOpacity",
                                    "onChangeColorHexAndOpacityPalette"
                                  ]
                                })
                              ]
                            },
                            {
                              width: 52,
                              options: []
                            },
                            {
                              width: 18,
                              options: []
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      onChange: (_, { isOpen }) => ({
        tabsColor: !isOpen ? "" : v.tabsColor
      })
    },
    {
      id: "makeItSaved",
      type: "buttonTooltip",
      icon: "nc-save-section",
      position: 100,
      title: t("Save"),
      tooltipContent: t("Saved"),
      onChange: () => {
        component.becomeSaved();
      }
    },
    {
      id: "toolbarSettings",
      type: "popover",
      icon: "nc-cog",
      title: t("Settings"),
      roles: ["admin"],
      position: 110,
      options: [
        {
          id: "advancedSettings",
          type: "advancedSettings",
          label: t("More Settings"),
          icon: "nc-cog",
          options: [
            {
              id: "settingsTabs",
              type: "tabs",
              align: "start",
              tabs: [
                {
                  id: "moreSettingsAdvanced",
                  label: t("Advanced"),
                  tabIcon: "nc-cog",
                  options: []
                }
              ]
            }
          ]
        }
      ]
    }
  ];
}

export function getItemsForTablet(v) {
  const device = "tablet";
  const state = "normal";

  const { hex: tabletBgColorHex } = getOptionColorHexByPalette(
    defaultValueValue({ v, key: "bgColorHex", device }),
    defaultValueValue({ v, key: "bgColorPalette", device })
  );

  return [
    {
      id: "tabletToolbarMedia",
      type: "popover",
      icon: "nc-background",
      title: t("Background"),
      position: 90,
      options: [
        toolbarBgImage({
          v,
          device,
          state: "normal",
          onChange: ["onChangeBgImage", "onChangeBgImageBgOpacity"]
        })
      ]
    },
    {
      id: "tabletToolbarColor",
      type: "popover",
      size: "auto",
      title: t("Colors"),
      position: 100,
      icon: {
        style: {
          backgroundColor: hexToRgba(
            tabletBgColorHex,
            tabletSyncOnChange(v, "bgColorOpacity")
          )
        }
      },
      options: [
        toolbarBgColor2({
          v,
          device,
          state,
          onChangeType: ["onChangeBgColorType2"],
          onChangeHex: [
            "onChangeBgColorHexAndOpacity2",
            "onChangeBgColorHexAndOpacityPalette2",
            "onChangeBgColorHexAndOpacityDependencies2"
          ],
          onChangePalette: [
            "onChangeBgColorPalette2",
            "onChangeBgColorPaletteOpacity2",
            "onChangeBgColorHexAndOpacityDependencies2"
          ],
          onChangeGradientHex: [
            "onChangeBgColorHexAndOpacity2",
            "onChangeBgColorHexAndOpacityPalette2",
            "onChangeBgColorHexAndOpacityDependencies2"
          ],
          onChangeGradientPalette: [
            "onChangeBgColorPalette2",
            "onChangeBgColorPaletteOpacity2",
            "onChangeBgColorHexAndOpacityDependencies2"
          ],
          onChangeGradient: ["onChangeGradientRange2"]
        }),
        {
          type: "grid",
          className: "brz-ed-grid__color-fileds",
          columns: [
            {
              width: 30,
              options: [
                toolbarBgColorHexField2({
                  v,
                  device,
                  state,
                  prefix:
                    defaultValueValue({
                      v,
                      key: "gradientActivePointer",
                      device,
                      state
                    }) === "startPointer"
                      ? "bg"
                      : "gradient",
                  onChange: [
                    "onChangeBgColorHexAndOpacity2",
                    "onChangeBgColorHexAndOpacityPalette2",
                    "onChangeBgColorHexAndOpacityDependencies2"
                  ]
                })
              ]
            },
            {
              width: 52,
              options: [
                toolbarGradientType({
                  v,
                  device,
                  state,
                  className:
                    "brz-ed__select--transparent brz-ed__select--align-right",
                  disabled:
                    defaultValueValue({
                      v,
                      key: "bgColorType",
                      device,
                      state
                    }) === "solid"
                })
              ]
            },
            {
              width: 18,
              options: [
                toolbarGradientLinearDegree({
                  v,
                  device,
                  state,
                  disabled:
                    defaultValueValue({
                      v,
                      key: "bgColorType",
                      device,
                      state
                    }) === "solid" ||
                    defaultValueValue({
                      v,
                      key: "gradientType",
                      device,
                      state
                    }) === "radial"
                }),
                toolbarGradientRadialDegree({
                  v,
                  device,
                  state,
                  disabled:
                    defaultValueValue({
                      v,
                      key: "bgColorType",
                      device,
                      state
                    }) === "solid" ||
                    defaultValueValue({
                      v,
                      key: "gradientType",
                      device,
                      state
                    }) === "linear"
                })
              ]
            }
          ]
        }
      ]
    }
  ];
}

export function getItemsForMobile(v) {
  const device = "mobile";
  const state = "normal";

  const { hex: mobileBgColorHex } = getOptionColorHexByPalette(
    defaultValueValue({ v, key: "bgColorHex", device }),
    defaultValueValue({ v, key: "bgColorPalette", device })
  );

  return [
    {
      id: "mobileToolbarMedia",
      type: "popover",
      icon: "nc-background",
      title: t("Background"),
      position: 90,
      options: [
        toolbarBgImage({
          v,
          device,
          state: "normal",
          onChange: ["onChangeBgImage", "onChangeBgImageBgOpacity"]
        })
      ]
    },
    {
      id: "mobileToolbarColor",
      type: "popover",
      size: "auto",
      title: t("Colors"),
      position: 100,
      icon: {
        style: {
          backgroundColor: hexToRgba(
            mobileBgColorHex,
            mobileSyncOnChange(v, "bgColorOpacity")
          )
        }
      },
      options: [
        toolbarBgColor2({
          v,
          device,
          state,
          onChangeType: ["onChangeBgColorType2"],
          onChangeHex: [
            "onChangeBgColorHexAndOpacity2",
            "onChangeBgColorHexAndOpacityPalette2",
            "onChangeBgColorHexAndOpacityDependencies2"
          ],
          onChangePalette: [
            "onChangeBgColorPalette2",
            "onChangeBgColorPaletteOpacity2",
            "onChangeBgColorHexAndOpacityDependencies2"
          ],
          onChangeGradientHex: [
            "onChangeBgColorHexAndOpacity2",
            "onChangeBgColorHexAndOpacityPalette2",
            "onChangeBgColorHexAndOpacityDependencies2"
          ],
          onChangeGradientPalette: [
            "onChangeBgColorPalette2",
            "onChangeBgColorPaletteOpacity2",
            "onChangeBgColorHexAndOpacityDependencies2"
          ],
          onChangeGradient: ["onChangeGradientRange2"]
        }),
        {
          type: "grid",
          className: "brz-ed-grid__color-fileds",
          columns: [
            {
              width: 30,
              options: [
                toolbarBgColorHexField2({
                  v,
                  device,
                  state,
                  prefix:
                    defaultValueValue({
                      v,
                      key: "gradientActivePointer",
                      device,
                      state
                    }) === "startPointer"
                      ? "bg"
                      : "gradient",
                  onChange: [
                    "onChangeBgColorHexAndOpacity2",
                    "onChangeBgColorHexAndOpacityPalette2",
                    "onChangeBgColorHexAndOpacityDependencies2"
                  ]
                })
              ]
            },
            {
              width: 52,
              options: [
                toolbarGradientType({
                  v,
                  device,
                  state,
                  className:
                    "brz-ed__select--transparent brz-ed__select--align-right",
                  disabled:
                    defaultValueValue({
                      v,
                      key: "bgColorType",
                      device,
                      state
                    }) === "solid"
                })
              ]
            },
            {
              width: 18,
              options: [
                toolbarGradientLinearDegree({
                  v,
                  device,
                  state,
                  disabled:
                    defaultValueValue({
                      v,
                      key: "bgColorType",
                      device,
                      state
                    }) === "solid" ||
                    defaultValueValue({
                      v,
                      key: "gradientType",
                      device,
                      state
                    }) === "radial"
                }),
                toolbarGradientRadialDegree({
                  v,
                  device,
                  state,
                  disabled:
                    defaultValueValue({
                      v,
                      key: "bgColorType",
                      device,
                      state
                    }) === "solid" ||
                    defaultValueValue({
                      v,
                      key: "gradientType",
                      device,
                      state
                    }) === "linear"
                })
              ]
            }
          ]
        }
      ]
    }
  ];
}
