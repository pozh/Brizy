import { t } from "visual/utils/i18n";
import { hexToRgba } from "visual/utils/color";
import { getWeightChoices, getWeight, getFontStyle } from "visual/utils/fonts";

import {
  onChangeTypography,
  onChangeTypographyTablet,
  onChangeTypographyMobile
} from "visual/utils/onChange";

import {
  toolbarElementProgressBarPercentage,
  toolbarElementProgressBarShowPercentage,
  toolbarTypography2FontFamily,
  toolbarTypography2FontStyle,
  toolbarTypography2FontSize,
  toolbarTypography2LineHeight,
  toolbarTypography2FontWeight,
  toolbarTypography2LetterSpacing,
  toolbarColor2,
  toolbarColorHexField2,
  toolbarBgColor2,
  toolbarBgColorHexField2,
  toolbarBoxShadow2,
  toolbarBoxShadowHexField2,
  toolbarBoxShadowFields2,
  toolbarSizeWidthWidthPercent,
  toolbarHoverTransition
} from "visual/utils/toolbar";

export function getItemsForDesktop(v) {
  const device = "desktop";

  // ...
  const maxBorderRadius = Math.round(
    (v.fontSize * v.lineHeight + v.paddingTop * 2) / 2
  );

  return [
    {
      id: "toolbarProgressBar",
      type: "popover",
      icon: "nc-progress",
      title: t("Progress"),
      position: 70,
      options: [
        toolbarElementProgressBarPercentage({ v }),
        toolbarElementProgressBarShowPercentage({ v })
        /*{
          id: "borderRadius",
          label: t("Corner"),
          type: "slider",
          slider: {
            min: 0,
            max: maxBorderRadius,
          },
          input: {
            show: true
          },
          suffix: {
            show: true,
            choices: [
              {
                title: "px",
                value: "px"
              }
            ]
          }
          value: {
            value: v.borderRadius
          },
          onChange: ({value: borderRadius}) => ({
            borderRadius
          })
        }*/
      ]
    },
    {
      id: "popoverTypography",
      type: "popover",
      icon: "nc-font",
      size: "large",
      title: t("Typography"),
      roles: ["admin"],
      position: 70,
      options: [
        {
          type: "grid",
          className: "brz-ed-grid__typography",
          columns: [
            {
              width: 54,
              options: [
                toolbarTypography2FontFamily({
                  v,
                  device,
                  state: "normal",
                  onChange: ["onChangeTypography2"]
                })
              ]
            },
            {
              width: 46,
              className: "brz-ed-popover__typography",
              options: [
                toolbarTypography2FontStyle({ v, device, state: "normal" }),
                {
                  type: "grid",
                  className: "brz-ed-grid__typography",
                  columns: [
                    {
                      width: "50",
                      options: [
                        toolbarTypography2FontSize({
                          v,
                          device,
                          state: "normal",
                          onChange: ["onChangeTypography2"]
                        }),
                        toolbarTypography2LineHeight({
                          v,
                          device,
                          state: "normal",
                          onChange: ["onChangeTypography2"]
                        })
                      ]
                    },
                    {
                      width: "50",
                      options: [
                        toolbarTypography2FontWeight({
                          v,
                          device,
                          state: "normal",
                          onChange: ["onChangeTypography2"]
                        }),
                        toolbarTypography2LetterSpacing({
                          v,
                          device,
                          state: "normal",
                          onChange: ["onChangeTypography2"]
                        })
                      ]
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
      id: "toolbarColor",
      type: "popover",
      size: "auto",
      title: t("Colors"),
      roles: ["admin"],
      position: 90,
      icon: {
        style: {
          backgroundColor: hexToRgba(v.bgColorHex, v.bgColorOpacity)
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
                      id: "tabText",
                      label: t("Text"),
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
                            }
                          ]
                        }
                      ]
                    },
                    {
                      id: "tabBar",
                      label: t("Bar"),
                      options: [
                        toolbarBgColor2({
                          v,
                          device,
                          state: "normal",
                          showSelect: false,
                          onChangeHex: [
                            "onChangeBgColorHexAndOpacity2",
                            "onChangeBgColorHexAndOpacityPalette2"
                          ],
                          onChangePalette: [
                            "onChangeBgColorPalette2",
                            "onChangeBgColorPaletteOpacity2"
                          ]
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
                                  onChange: [
                                    "onChangeBgColorHexAndOpacity2",
                                    "onChangeBgColorHexAndOpacityPalette2"
                                  ]
                                })
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      id: "tabBg",
                      label: t("Bg"),
                      options: [
                        toolbarBgColor2({
                          v,
                          device,
                          state: "normal",
                          prefix: "bg2",
                          showSelect: false,
                          onChangeHex: [
                            "onChangeBgColorHexAndOpacity2",
                            "onChangeBgColorHexAndOpacityPalette2"
                          ],
                          onChangePalette: [
                            "onChangeBgColorPalette2",
                            "onChangeBgColorPaletteOpacity2"
                          ]
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
                                  prefix: "bg2",
                                  onChange: [
                                    "onChangeBgColorHexAndOpacity2",
                                    "onChangeBgColorHexAndOpacityPalette2"
                                  ]
                                })
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      id: "tabBoxShadow",
                      label: t("Shadow"),
                      options: [
                        toolbarBoxShadow2({
                          v,
                          device,
                          state: "normal",
                          showSelect: false,
                          choices: "outline",
                          onChangeStyle: [
                            "onChangeBoxShadowStyle2",
                            "onChangeBoxShadowStyleDependencies2"
                          ],
                          onChangeHex: [
                            "onChangeBoxShadowHexAndOpacity2",
                            "onChangeBoxShadowHexAndOpacityPalette2",
                            "onChangeBoxShadowHexAndOpacityDependencies2"
                          ],
                          onChangePalette: [
                            "onChangeBoxShadowPalette2",
                            "onChangeBoxShadowPaletteOpacity2",
                            "onChangeBoxShadowHexAndOpacityDependencies2"
                          ]
                        }),
                        {
                          type: "grid",
                          className: "brz-ed-grid__color-fileds",
                          columns: [
                            {
                              width: 41,
                              options: [
                                toolbarBoxShadowHexField2({
                                  v,
                                  device,
                                  state: "normal",
                                  onChange: [
                                    "onChangeBoxShadowHexAndOpacity2",
                                    "onChangeBoxShadowHexAndOpacityPalette2",
                                    "onChangeBoxShadowHexAndOpacityDependencies2"
                                  ]
                                })
                              ]
                            },
                            {
                              width: 59,
                              options: [
                                toolbarBoxShadowFields2({
                                  v,
                                  device,
                                  state: "normal",
                                  onChange: [
                                    "onChangeBoxShadow2",
                                    "onChangeBoxShadowDependencies2"
                                  ]
                                })
                              ]
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
                  tabs: [
                    {
                      id: "tabText",
                      label: t("Text"),
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
                            }
                          ]
                        }
                      ]
                    },
                    {
                      id: "tabBar",
                      label: t("Bar"),
                      options: [
                        toolbarBgColor2({
                          v,
                          device,
                          state: "hover",
                          showSelect: false,
                          onChangeHex: [
                            "onChangeBgColorHexAndOpacity2",
                            "onChangeBgColorHexAndOpacityPalette2"
                          ],
                          onChangePalette: [
                            "onChangeBgColorPalette2",
                            "onChangeBgColorPaletteOpacity2"
                          ]
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
                                  state: "hover",
                                  onChange: [
                                    "onChangeBgColorHexAndOpacity2",
                                    "onChangeBgColorHexAndOpacityPalette2"
                                  ]
                                })
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      id: "tabBg",
                      label: t("Bg"),
                      options: [
                        toolbarBgColor2({
                          v,
                          device,
                          state: "hover",
                          prefix: "bg2",
                          showSelect: false,
                          onChangeHex: [
                            "onChangeBgColorHexAndOpacity2",
                            "onChangeBgColorHexAndOpacityPalette2"
                          ],
                          onChangePalette: [
                            "onChangeBgColorPalette2",
                            "onChangeBgColorPaletteOpacity2"
                          ]
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
                                  state: "hover",
                                  prefix: "bg2",
                                  onChange: [
                                    "onChangeBgColorHexAndOpacity2",
                                    "onChangeBgColorHexAndOpacityPalette2"
                                  ]
                                })
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      id: "tabBoxShadow",
                      label: t("Shadow"),
                      options: [
                        toolbarBoxShadow2({
                          v,
                          device,
                          state: "hover",
                          showSelect: false,
                          choices: "outline",
                          onChangeStyle: [
                            "onChangeBoxShadowStyle2",
                            "onChangeBoxShadowStyleDependencies2"
                          ],
                          onChangeHex: [
                            "onChangeBoxShadowHexAndOpacity2",
                            "onChangeBoxShadowHexAndOpacityPalette2",
                            "onChangeBoxShadowHexAndOpacityDependencies2"
                          ],
                          onChangePalette: [
                            "onChangeBoxShadowPalette2",
                            "onChangeBoxShadowPaletteOpacity2",
                            "onChangeBoxShadowHexAndOpacityDependencies2"
                          ]
                        }),
                        {
                          type: "grid",
                          className: "brz-ed-grid__color-fileds",
                          columns: [
                            {
                              width: 41,
                              options: [
                                toolbarBoxShadowHexField2({
                                  v,
                                  device,
                                  state: "hover",
                                  onChange: [
                                    "onChangeBoxShadowHexAndOpacity2",
                                    "onChangeBoxShadowHexAndOpacityPalette2",
                                    "onChangeBoxShadowHexAndOpacityDependencies2"
                                  ]
                                })
                              ]
                            },
                            {
                              width: 59,
                              options: [
                                toolbarBoxShadowFields2({
                                  v,
                                  device,
                                  state: "hover",
                                  onChange: [
                                    "onChangeBoxShadow2",
                                    "onChangeBoxShadowDependencies2"
                                  ]
                                })
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
          ]
        }
      ],
      onChange: (_, { isOpen }) => ({
        tabsState: !isOpen ? "" : v.tabsState,
        tabsColor: !isOpen ? "" : v.tabsColor
      })
    },
    {
      id: "toolbarSettings",
      type: "popover",
      icon: "nc-cog",
      title: t("Settings"),
      roles: ["admin"],
      position: 110,
      options: [
        toolbarSizeWidthWidthPercent({ v, device, state: "normal" }),
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
                  id: "settingsStyling",
                  label: t("Styling"),
                  tabIcon: "nc-styling",
                  options: []
                },
                {
                  id: "moreSettingsAdvanced",
                  label: t("Advanced"),
                  tabIcon: "nc-cog",
                  options: [toolbarHoverTransition({ v, position: 100 })]
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

  return [
    {
      id: "tabletToolbarTypography",
      type: "popover",
      icon: "nc-font",
      size: "auto",
      title: t("Typography"),
      roles: ["admin"],
      position: 70,
      options: [
        {
          type: "grid",
          className: "brz-ed-grid__typography",
          columns: [
            {
              className: "brz-ed-popover__typography",
              options: [
                toolbarTypography2FontStyle({
                  v,
                  device,
                  state: "normal",
                  onChange: ["onChangeTypography2"]
                }),
                {
                  type: "grid",
                  className: "brz-ed-grid__typography",
                  columns: [
                    {
                      width: "50",
                      options: [
                        toolbarTypography2FontSize({
                          v,
                          device,
                          state: "normal",
                          onChange: ["onChangeTypography2"]
                        }),
                        toolbarTypography2LineHeight({
                          v,
                          device,
                          state: "normal",
                          onChange: ["onChangeTypography2"]
                        })
                      ]
                    },
                    {
                      width: "50",
                      options: [
                        toolbarTypography2FontWeight({
                          v,
                          device,
                          state: "normal",
                          onChange: ["onChangeTypography2"]
                        }),
                        toolbarTypography2LetterSpacing({
                          v,
                          device,
                          state: "normal",
                          onChange: ["onChangeTypography2"]
                        })
                      ]
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
      id: "tabletToolbarSettings",
      type: "popover",
      icon: "nc-cog",
      title: t("Settings"),
      roles: ["admin"],
      position: 110,
      options: [toolbarSizeWidthWidthPercent({ v, device, state })]
    }
  ];
}

export function getItemsForMobile(v) {
  const device = "mobile";
  const state = "normal";

  return [
    {
      id: "mobileToolbarTypography",
      type: "popover",
      icon: "nc-font",
      size: "auto",
      title: t("Typography"),
      roles: ["admin"],
      position: 70,
      options: [
        {
          type: "grid",
          className: "brz-ed-grid__typography",
          columns: [
            {
              className: "brz-ed-popover__typography",
              options: [
                toolbarTypography2FontStyle({
                  v,
                  device,
                  state: "normal",
                  onChange: ["onChangeTypography2"]
                }),
                {
                  type: "grid",
                  className: "brz-ed-grid__typography",
                  columns: [
                    {
                      width: "50",
                      options: [
                        toolbarTypography2FontSize({
                          v,
                          device,
                          state: "normal",
                          onChange: ["onChangeTypography2"]
                        }),
                        toolbarTypography2LineHeight({
                          v,
                          device,
                          state: "normal",
                          onChange: ["onChangeTypography2"]
                        })
                      ]
                    },
                    {
                      width: "50",
                      options: [
                        toolbarTypography2FontWeight({
                          v,
                          device,
                          state: "normal",
                          onChange: ["onChangeTypography2"]
                        }),
                        toolbarTypography2LetterSpacing({
                          v,
                          device,
                          state: "normal",
                          onChange: ["onChangeTypography2"]
                        })
                      ]
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
      id: "mobileToolbarSettings",
      type: "popover",
      icon: "nc-cog",
      title: t("Settings"),
      roles: ["admin"],
      position: 110,
      options: [toolbarSizeWidthWidthPercent({ v, device, state })]
    }
  ];
}
