import { hexToRgba } from "visual/utils/color";
import { getOptionColorHexByPalette } from "visual/utils/options";
import { defaultValueValue } from "visual/utils/onChange";

import {
  toolbarElementCounterStart,
  toolbarElementCounterEnd,
  toolbarElementCounterDuration,
  toolbarColor2,
  toolbarColorHexField2,
  toolbarTypography2FontFamily,
  toolbarTypography2FontStyle,
  toolbarTypography2FontSize,
  toolbarTypography2LineHeight,
  toolbarTypography2FontWeight,
  toolbarTypography2LetterSpacing
} from "visual/utils/toolbar";

import { t } from "visual/utils/i18n";

export function getItemsForDesktop(v) {
  const device = "desktop";

  // Color
  const { hex: colorHex } = getOptionColorHexByPalette(
    defaultValueValue({ v, key: "colorHex", device }),
    defaultValueValue({ v, key: "colorPalette", device })
  );

  return [
    {
      id: "toolbarCurrentShortcode",
      type: "popover",
      icon: "nc-counter-outline",
      title: t("Counter"),
      position: 70,
      options: [
        toolbarElementCounterStart({ v }),
        toolbarElementCounterEnd({ v }),
        toolbarElementCounterDuration({ v })
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
          backgroundColor: hexToRgba(colorHex, v.colorOpacity)
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
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      onChange: (_, { isOpen }) => ({
        tabsState: !isOpen ? "" : v.tabsState
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
      options: []
    }
  ];
}

export function getItemsForMobile(v) {
  const device = "mobile";
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
      options: []
    }
  ];
}
