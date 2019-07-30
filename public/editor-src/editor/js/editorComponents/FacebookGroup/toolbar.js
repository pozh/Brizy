import { t } from "visual/utils/i18n";
import { toolbarCustomCSS } from "visual/utils/toolbar";
import { hexToRgba } from "visual/utils/color";
import { getOptionColorHexByPalette } from "visual/utils/options";
import { defaultValueValue } from "visual/utils/onChange";

import {
  toolbarBoxShadow2,
  toolbarBoxShadowHexField2,
  toolbarBoxShadowFields2,
  toolbarHoverTransition
} from "visual/utils/toolbar";

export function getItemsForDesktop(v) {
  const device = "desktop";

  const { hex: boxShadowColorHex } = getOptionColorHexByPalette(
    defaultValueValue({ v, key: "boxShadowColorHex", device }),
    defaultValueValue({ v, key: "boxShadowColorPalette", device })
  );
  const { hex: hoverBoxShadowColorHex } = getOptionColorHexByPalette(
    defaultValueValue({ v, key: "hoverBoxShadowColorHex", device }),
    defaultValueValue({ v, key: "hoverBoxShadowColorPalette", device })
  );
  return [
    {
      id: "toolbarCurrentElement",
      type: "popover",
      icon: "nc-facebook",
      title: t("Page"),
      position: 70,
      options: [
        {
          id: "width",
          label: t("Width"),
          type: "slider",
          slider: {
            min: 180,
            max: 500
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
          },
          value: {
            value: v.width
          },
          onChange: ({ value: width }, { sliderDragEnd }) => {
            return sliderDragEnd && { width };
          }
        },
        {
          id: "skin",
          type: "select",
          label: t("Skin"),
          choices: [
            {
              title: t("Light"),
              value: "light"
            },
            {
              title: t("Dark"),
              value: "dark"
            }
          ],
          value: v.skin
        },
        {
          id: "showSocialContext",
          type: "switch",
          label: t("Show Social Context"),
          value: v.showSocialContext
        },
        {
          id: "showMetaData",
          type: "switch",
          label: t("Show Meta Data"),
          value: v.showMetaData
        }
      ]
    },
    {
      id: "toolbarColor",
      type: "popover",
      size: "auto",
      title: t("Colors"),
      roles: ["admin"],
      position: 80,
      icon: {
        style: {
          backgroundColor: hexToRgba(boxShadowColorHex, v.boxShadowColorOpacity)
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
                  hideHandlesWhenOne: false,
                  tabs: [
                    {
                      id: "tabBoxShadow",
                      label: t("Shadow"),
                      options: [
                        toolbarBoxShadow2({
                          v,
                          device,
                          state: "normal",
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
                  hideHandlesWhenOne: false,
                  tabs: [
                    {
                      id: "tabBoxShadow",
                      label: t("Shadow"),
                      icon: {
                        style: {
                          backgroundColor: hexToRgba(
                            hoverBoxShadowColorHex,
                            v.hoverBoxShadowColorOpacity
                          )
                        }
                      },
                      options: [
                        toolbarBoxShadow2({
                          v,
                          device,
                          state: "hover",
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
        tabsState: !isOpen ? "" : v.tabsState
      })
    },
    {
      id: "toolbarLink",
      type: "popover",
      icon: "nc-link",
      title: t("Link"),
      position: 80,
      options: [
        {
          id: "href",
          label: t("Link"),
          type: "input",
          placeholder: "https://www.facebook.com/groups/brizy/",
          value: {
            value: v.href
          },
          onChange: ({ value: href }) => ({
            href
          })
        }
      ]
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
                  options: [
                    toolbarCustomCSS({ v }),
                    toolbarHoverTransition({ v, position: 100 })
                  ]
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
  return [];
}

export function getItemsForMobile(v) {
  return [];
}
