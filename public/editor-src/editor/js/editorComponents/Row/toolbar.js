import { t } from "visual/utils/i18n";
import { hexToRgba } from "visual/utils/color";
import {
  getOptionColorHexByPalette,
  getAnimations
} from "visual/utils/options";
import {
  defaultValueValue,
  tabletSyncOnChange,
  mobileSyncOnChange
} from "visual/utils/onChange";
import {
  toolbarElementContainerTypeAll,
  toolbarBgImage,
  toolbarBgVideoUrl,
  toolbarBgVideoQuality,
  toolbarBgVideoLoop,
  toolbarBgMapAddress,
  toolbarBgMapZoom,
  toolbarBorderRadius,
  toolbarBorderColor2,
  toolbarBorderColorHexField2,
  toolbarBorderWidthBorderColorPicker2,
  toolbarGradientType,
  toolbarBgColor2,
  toolbarBgColorHexField2,
  toolbarGradientLinearDegree,
  toolbarGradientRadialDegree,
  toolbarBoxShadow2,
  toolbarBoxShadowHexField2,
  toolbarBoxShadowFields2,
  toolbarHoverTransition,
  toolbarShowOnDesktop,
  toolbarShowOnTablet,
  toolbarShowOnMobile,
  toolbarZIndex,
  toolbarCustomCSSClass,
  toolbarEntranceAnimation,
  toolbarElementContainerTypeImageMap,
  toolbarImageLinkExternal,
  toolbarLinkExternalBlank,
  toolbarLinkExternalRel,
  toolbarLinkAnchor
} from "visual/utils/toolbar";

export function getItemsForDesktop(v, component) {
  const device = "desktop";

  const { hex: bgColorHex } = getOptionColorHexByPalette(
    defaultValueValue({ v, key: "bgColorHex", device }),
    defaultValueValue({ v, key: "bgColorPalette", device })
  );

  const inPopup = Boolean(component.props.meta.sectionPopup);

  return [
    {
      id: "toolbarCurrentElement",
      type: "popover",
      icon: "nc-background",
      title: t("Background"),
      position: 80,
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
                  id: "tabsCurrentElement",
                  type: "tabs",
                  value: v.tabsCurrentElement,
                  tabs: [
                    {
                      id: "tabCurrentElement",
                      label: t("Background"),
                      options: [
                        toolbarElementContainerTypeAll({ v }),
                        toolbarBgImage({
                          v,
                          device,
                          state: "normal",
                          disabled: v.media !== "image",
                          onChange: [
                            "onChangeBgImage",
                            "onChangeBgImageBgOpacity",
                            "onChangeBgImageDependencies",
                            "onChangeBgImageColumnAndRowSyncMobile"
                          ]
                        }),
                        toolbarBgVideoUrl({ v, disabled: v.media !== "video" }),
                        toolbarBgVideoQuality({
                          v,
                          disabled: v.media !== "video"
                        }),
                        toolbarBgVideoLoop({
                          v,
                          disabled: v.media !== "video"
                        }),
                        toolbarBgMapAddress({ v, disabled: v.media !== "map" }),
                        toolbarBgMapZoom({ v, disabled: v.media !== "map" })
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
                  id: "tabsCurrentElement",
                  type: "tabs",
                  disabled:
                    v.tabsCurrentElement === "tabCurrentElement" &&
                    (v.media === "video" || v.media === "map"),
                  value: v.tabsCurrentElement,
                  tabs: [
                    {
                      id: "tabCurrentElement",
                      label: t("Background"),
                      options: [
                        toolbarBgImage({
                          v,
                          device,
                          state: "hover",
                          onChange: [
                            "onChangeBgImage",
                            "onChangeBgImageBgOpacity",
                            "onChangeBgImageDependencies",
                            "onChangeBgImageColumnAndRowSyncMobile"
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
      ],
      onChange: (_, { isOpen }) => ({
        tabsCurrentElement: !isOpen ? "" : v.tabsCurrentElement
      })
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
                            "onChangeBgColorHexAndOpacityDependencies2",
                            "onChangeBgColorHexAndOpacityColumnAndRowSyncMobile2"
                          ],
                          onChangePalette: [
                            "onChangeBgColorPalette2",
                            "onChangeBgColorPaletteOpacity2",
                            "onChangeBgColorHexAndOpacityDependencies2",
                            "onChangeBgColorHexAndOpacityColumnAndRowSyncMobile2"
                          ],
                          onChangeGradientHex: [
                            "onChangeBgColorHexAndOpacity2",
                            "onChangeBgColorHexAndOpacityPalette2",
                            "onChangeBgColorHexAndOpacityDependencies2",
                            "onChangeBgColorHexAndOpacityColumnAndRowSyncMobile2"
                          ],
                          onChangeGradientPalette: [
                            "onChangeBgColorPalette2",
                            "onChangeBgColorPaletteOpacity2",
                            "onChangeBgColorHexAndOpacityDependencies2",
                            "onChangeBgColorHexAndOpacityColumnAndRowSyncMobile2"
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
                                    "onChangeBgColorHexAndOpacityDependencies2",
                                    "onChangeBgColorHexAndOpacityColumnAndRowSyncMobile2"
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
                      id: "tabBorder",
                      label: t("Border"),
                      options: [
                        toolbarBorderColor2({
                          v,
                          device,
                          state: "normal",
                          onChangeStyle: [
                            "onChangeBorderStyle2",
                            "onChangeContainerBorderStyleDependencies2"
                          ],
                          onChangeHex: [
                            "onChangeBorderColorHexAndOpacity2",
                            "onChangeBorderColorHexAndOpacityPalette2",
                            "onChangeContainerBorderColorHexAndOpacityDependencies2",
                            "onChangeBorderColorHexAndOpacityColumnAndRowSyncTablet2",
                            "onChangeBorderColorHexAndOpacityColumnAndRowSyncMobile2"
                          ],
                          onChangePalette: [
                            "onChangeBorderColorPalette2",
                            "onChangeBorderColorPaletteOpacity2",
                            "onChangeContainerBorderColorHexAndOpacityDependencies2",
                            "onChangeBorderColorHexAndOpacityColumnAndRowSyncTablet2",
                            "onChangeBorderColorHexAndOpacityColumnAndRowSyncMobile2"
                          ]
                        }),
                        {
                          type: "grid",
                          className: "brz-ed-grid__color-fileds",
                          columns: [
                            {
                              width: 38,
                              options: [
                                toolbarBorderColorHexField2({
                                  v,
                                  device,
                                  state: "normal",
                                  onChange: [
                                    "onChangeBorderColorHexAndOpacity2",
                                    "onChangeBorderColorHexAndOpacityPalette2",
                                    "onChangeContainerBorderColorHexAndOpacityDependencies2",
                                    "onChangeBorderColorHexAndOpacityColumnAndRowSyncTablet2",
                                    "onChangeBorderColorHexAndOpacityColumnAndRowSyncMobile2"
                                  ]
                                })
                              ]
                            },
                            {
                              width: 54,
                              options: [
                                toolbarBorderWidthBorderColorPicker2({
                                  v,
                                  device,
                                  state: "normal",
                                  onChangeType: ["onChangeBorderWidthType2"],
                                  onChangeGrouped: [
                                    "onChangeBorderWidthGrouped2",
                                    "onChangeBorderWidthGroupedDependencies2"
                                  ],
                                  onChangeUngrouped: [
                                    "onChangeBorderWidthUngrouped2",
                                    "onChangeBorderWidthUngroupedDependencies2"
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
                      id: "tabOverlay",
                      label: t("Overlay"),
                      options: [
                        toolbarBgColor2({
                          v,
                          device,
                          state: "hover",
                          onChangeType: ["onChangeBgColorType2"],
                          onChangeHex: [
                            "onChangeBgColorHexAndOpacity2",
                            "onChangeBgColorHexAndOpacityPalette2",
                            "onChangeBgColorHexAndOpacityColumnAndRowSyncMobile2"
                          ],
                          onChangePalette: [
                            "onChangeBgColorPalette2",
                            "onChangeBgColorPaletteOpacity2",
                            "onChangeBgColorHexAndOpacityColumnAndRowSyncMobile2"
                          ],
                          onChangeGradientHex: [
                            "onChangeBgColorHexAndOpacity2",
                            "onChangeBgColorHexAndOpacityPalette2",
                            "onChangeBgColorHexAndOpacityColumnAndRowSyncMobile2"
                          ],
                          onChangeGradientPalette: [
                            "onChangeBgColorPalette2",
                            "onChangeBgColorPaletteOpacity2",
                            "onChangeBgColorHexAndOpacityColumnAndRowSyncMobile2"
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
                                  state: "hover",
                                  prefix:
                                    defaultValueValue({
                                      v,
                                      key: "gradientActivePointer",
                                      device,
                                      state: "hover"
                                    }) === "startPointer"
                                      ? "bg"
                                      : "gradient",
                                  onChange: [
                                    "onChangeBgColorHexAndOpacity2",
                                    "onChangeBgColorHexAndOpacityPalette2",
                                    "onChangeBgColorHexAndOpacityColumnAndRowSyncMobile2"
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
                                  state: "hover",
                                  className:
                                    "brz-ed__select--transparent brz-ed__select--align-right",
                                  disabled:
                                    defaultValueValue({
                                      v,
                                      key: "bgColorType",
                                      device,
                                      state: "hover"
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
                                  state: "hover",
                                  disabled:
                                    defaultValueValue({
                                      v,
                                      key: "bgColorType",
                                      device,
                                      state: "hover"
                                    }) === "solid" ||
                                    defaultValueValue({
                                      v,
                                      key: "gradientType",
                                      device,
                                      state: "hover"
                                    }) === "radial"
                                }),
                                toolbarGradientRadialDegree({
                                  v,
                                  device,
                                  state: "hover",
                                  disabled:
                                    defaultValueValue({
                                      v,
                                      key: "bgColorType",
                                      device,
                                      state: "hover"
                                    }) === "solid" ||
                                    defaultValueValue({
                                      v,
                                      key: "gradientType",
                                      device,
                                      state: "hover"
                                    }) === "linear"
                                })
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      id: "tabBorder",
                      label: t("Border"),
                      options: [
                        toolbarBorderColor2({
                          v,
                          device,
                          state: "hover",
                          onChangeStyle: [
                            "onChangeBorderStyle2",
                            "onChangeContainerBorderStyleDependencies2"
                          ],
                          onChangeHex: [
                            "onChangeBorderColorHexAndOpacity2",
                            "onChangeBorderColorHexAndOpacityPalette2",
                            "onChangeContainerBorderColorHexAndOpacityDependencies2",
                            "onChangeBorderColorHexAndOpacityColumnAndRowSyncTablet2",
                            "onChangeBorderColorHexAndOpacityColumnAndRowSyncMobile2"
                          ],
                          onChangePalette: [
                            "onChangeBorderColorPalette2",
                            "onChangeBorderColorPaletteOpacity2",
                            "onChangeContainerBorderColorHexAndOpacityDependencies2",
                            "onChangeBorderColorHexAndOpacityColumnAndRowSyncTablet2",
                            "onChangeBorderColorHexAndOpacityColumnAndRowSyncMobile2"
                          ]
                        }),
                        {
                          type: "grid",
                          className: "brz-ed-grid__color-fileds",
                          columns: [
                            {
                              width: 38,
                              options: [
                                toolbarBorderColorHexField2({
                                  v,
                                  device,
                                  state: "hover",
                                  onChange: [
                                    "onChangeBorderColorHexAndOpacity2",
                                    "onChangeBorderColorHexAndOpacityPalette2",
                                    "onChangeContainerBorderColorHexAndOpacityDependencies2",
                                    "onChangeBorderColorHexAndOpacityColumnAndRowSyncTablet2",
                                    "onChangeBorderColorHexAndOpacityColumnAndRowSyncMobile2"
                                  ]
                                })
                              ]
                            },
                            {
                              width: 54,
                              options: [
                                toolbarBorderWidthBorderColorPicker2({
                                  v,
                                  device,
                                  state: "hover",
                                  onChangeType: ["onChangeBorderWidthType2"],
                                  onChangeGrouped: [
                                    "onChangeBorderWidthGrouped2",
                                    "onChangeBorderWidthGroupedDependencies2"
                                  ],
                                  onChangeUngrouped: [
                                    "onChangeBorderWidthUngrouped2",
                                    "onChangeBorderWidthUngroupedDependencies2"
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
      id: "toolbarLink",
      type: "popover",
      icon: "nc-link",
      title: t("Link"),
      size: "medium",
      position: 90,
      disabled: v.linkLightBox === "on",
      options: [
        {
          id: "linkType",
          type: "tabs",
          value: v.linkType,
          tabs: [
            {
              id: "external",
              label: t("URL"),
              options: [
                toolbarImageLinkExternal({ v }),
                toolbarLinkExternalBlank({ v }),
                toolbarLinkExternalRel({ v })
              ]
            },
            {
              id: "anchor",
              label: t("Anchor"),
              options: [toolbarLinkAnchor({ v })]
            }
          ]
        }
      ]
    },
    {
      id: "toolbarSettings",
      type: "popover",
      icon: "nc-cog",
      title: t("Settings"),
      position: 110,
      options: [
        {
          id: "size",
          label: t("Width"),
          type: "slider",
          disabled: inPopup,
          slider: {
            min: 40,
            max: 100
          },
          input: {
            show: true,
            min: 40,
            max: 100
          },
          suffix: {
            show: true,
            choices: [
              {
                title: "%",
                value: "%"
              }
            ]
          },
          value: {
            value: v.size
          },
          onChange: ({ value: size }) => ({
            size
          })
        },
        {
          type: "multiPicker",
          picker: {
            id: "columnsHeightStyle",
            label: t("Height"),
            type: "select",
            choices: [
              {
                title: t("Auto"),
                value: "auto"
              },
              {
                title: t("Custom"),
                value: "custom"
              }
            ],
            value: v.columnsHeightStyle
          },
          choices: {
            custom: [
              {
                id: "columnsHeight",
                type: "slider",
                slider: {
                  min: 20,
                  max: 500
                },
                input: {
                  show: true,
                  min: 0
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
                  value: v.columnsHeight
                },
                onChange: ({ value: columnsHeight }) => ({
                  columnsHeight
                })
              },
              {
                id: "verticalAlign",
                label: t("Content"),
                type: "radioGroup",
                choices: [
                  {
                    value: "top",
                    icon: "nc-align-top"
                  },
                  {
                    value: "center",
                    icon: "nc-align-middle"
                  },
                  {
                    value: "bottom",
                    icon: "nc-align-bottom"
                  }
                ],
                value: v.verticalAlign
              }
            ]
          }
        },
        {
          id: "advancedSettings",
          type: "advancedSettings",
          sidebarLabel: t("More Settings"),
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
                  options: [
                    {
                      type: "multiPicker",
                      picker: {
                        id: "paddingType",
                        label: t("Padding"),
                        type: "radioGroup",
                        choices: [
                          {
                            value: "grouped",
                            icon: "nc-styling-all"
                          },
                          {
                            value: "ungrouped",
                            icon: "nc-styling-individual"
                          }
                        ],
                        value: v.paddingType
                      },
                      choices: {
                        grouped: [
                          {
                            id: "padding",
                            type: "slider",
                            slider: {
                              min: 0,
                              max: 100
                            },
                            input: {
                              show: true,
                              min: 0
                            },
                            suffix: {
                              show: true,
                              choices: [
                                {
                                  title: "px",
                                  value: "px"
                                },
                                {
                                  title: "%",
                                  value: "%"
                                }
                              ]
                            },
                            value: {
                              value: v.padding,
                              suffix: v.paddingSuffix
                            },
                            onChange: ({
                              value: padding,
                              suffix: paddingSuffix
                            }) => {
                              return {
                                padding,
                                paddingSuffix,
                                paddingTop: padding,
                                paddingRight: padding,
                                paddingBottom: padding,
                                paddingLeft: padding
                              };
                            }
                          }
                        ],
                        ungrouped: [
                          {
                            id: "paddingTop",
                            icon: "nc-styling-top",
                            type: "slider",
                            slider: {
                              min: 0,
                              max: 100
                            },
                            input: {
                              show: true,
                              min: 0
                            },
                            suffix: {
                              show: true,
                              choices: [
                                {
                                  title: "px",
                                  value: "px"
                                },
                                {
                                  title: "%",
                                  value: "%"
                                }
                              ]
                            },
                            value: {
                              value: v.paddingTop,
                              suffix: v.paddingTopSuffix
                            },
                            onChange: ({
                              value: paddingTop,
                              suffix: paddingTopSuffix
                            }) => {
                              return {
                                paddingTop,
                                paddingTopSuffix,
                                padding:
                                  paddingTop === v.paddingRight &&
                                  paddingTop === v.paddingLeft &&
                                  paddingTop === v.paddingBottom
                                    ? paddingTop
                                    : v.padding
                              };
                            }
                          },
                          {
                            id: "paddingRight",
                            icon: "nc-styling-right",
                            type: "slider",
                            slider: {
                              min: 0,
                              max: 100
                            },
                            input: {
                              show: true,
                              min: 0
                            },
                            suffix: {
                              show: true,
                              choices: [
                                {
                                  title: "px",
                                  value: "px"
                                },
                                {
                                  title: "%",
                                  value: "%"
                                }
                              ]
                            },
                            value: {
                              value: v.paddingRight,
                              suffix: v.paddingRightSuffix
                            },
                            onChange: ({
                              value: paddingRight,
                              suffix: paddingRightSuffix
                            }) => {
                              return {
                                paddingRight,
                                paddingRightSuffix,
                                padding:
                                  paddingRight === v.paddingTop &&
                                  paddingRight === v.paddingLeft &&
                                  paddingRight === v.paddingBottom
                                    ? paddingRight
                                    : v.padding
                              };
                            }
                          },
                          {
                            id: "paddingBottom",
                            icon: "nc-styling-bottom",
                            type: "slider",
                            slider: {
                              min: 0,
                              max: 100
                            },
                            input: {
                              show: true,
                              min: 0
                            },
                            suffix: {
                              show: true,
                              choices: [
                                {
                                  title: "px",
                                  value: "px"
                                },
                                {
                                  title: "%",
                                  value: "%"
                                }
                              ]
                            },
                            value: {
                              value: v.paddingBottom,
                              suffix: v.paddingBottomSuffix
                            },
                            onChange: ({
                              value: paddingBottom,
                              suffix: paddingBottomSuffix
                            }) => {
                              return {
                                paddingBottom,
                                paddingBottomSuffix,
                                padding:
                                  paddingBottom === v.paddingRight &&
                                  paddingBottom === v.paddingLeft &&
                                  paddingBottom === v.paddingTop
                                    ? paddingBottom
                                    : v.padding
                              };
                            }
                          },
                          {
                            id: "paddingLeft",
                            icon: "nc-styling-left",
                            type: "slider",
                            slider: {
                              min: 0,
                              max: 100
                            },
                            input: {
                              show: true,
                              min: 0
                            },
                            suffix: {
                              show: true,
                              choices: [
                                {
                                  title: "px",
                                  value: "px"
                                },
                                {
                                  title: "%",
                                  value: "%"
                                }
                              ]
                            },
                            value: {
                              value: v.paddingLeft,
                              suffix: v.paddingLeftSuffix
                            },
                            onChange: ({
                              value: paddingLeft,
                              suffix: paddingLeftSuffix
                            }) => {
                              return {
                                paddingLeft,
                                paddingLeftSuffix,
                                padding:
                                  paddingLeft === v.paddingRight &&
                                  paddingLeft === v.paddingTop &&
                                  paddingLeft === v.paddingBottom
                                    ? paddingLeft
                                    : v.padding
                              };
                            }
                          }
                        ]
                      }
                    },
                    {
                      type: "multiPicker",
                      disabled: inPopup,
                      picker: {
                        id: "marginType",
                        label: t("Margin"),
                        type: "radioGroup",
                        choices: [
                          {
                            value: "grouped",
                            icon: "nc-styling-all"
                          },
                          {
                            value: "ungrouped",
                            icon: "nc-styling-individual"
                          }
                        ],
                        value: v.marginType
                      },
                      choices: {
                        grouped: [
                          {
                            id: "margin",
                            type: "slider",
                            slider: {
                              min: -100,
                              max: 100
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
                                },
                                {
                                  title: "%",
                                  value: "%"
                                }
                              ]
                            },
                            value: {
                              value: v.margin,
                              suffix: v.marginSuffix
                            },
                            onChange: ({
                              value: margin,
                              suffix: marginSuffix
                            }) => {
                              return {
                                margin,
                                marginSuffix,
                                marginTop: margin,
                                marginBottom: margin
                              };
                            }
                          }
                        ],
                        ungrouped: [
                          {
                            id: "marginTop",
                            icon: "nc-styling-top",
                            type: "slider",
                            slider: {
                              min: -100,
                              max: 100
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
                                },
                                {
                                  title: "%",
                                  value: "%"
                                }
                              ]
                            },
                            value: {
                              value: v.marginTop,
                              suffix: v.marginTopSuffix
                            },
                            onChange: ({
                              value: marginTop,
                              suffix: marginTopSuffix
                            }) => {
                              return {
                                marginTop,
                                marginTopSuffix,
                                margin:
                                  marginTop === v.marginBottom
                                    ? marginTop
                                    : v.margin
                              };
                            }
                          },
                          {
                            id: "marginBottom",
                            icon: "nc-styling-bottom",
                            type: "slider",
                            slider: {
                              min: -100,
                              max: 100
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
                                },
                                {
                                  title: "%",
                                  value: "%"
                                }
                              ]
                            },
                            value: {
                              value: v.marginBottom,
                              suffix: v.marginBottomSuffix
                            },
                            onChange: ({
                              value: marginBottom,
                              suffix: marginBottomSuffix
                            }) => {
                              return {
                                marginBottom,
                                marginBottomSuffix,
                                margin:
                                  marginBottom === v.marginTop
                                    ? marginBottom
                                    : v.margin
                              };
                            }
                          }
                        ]
                      }
                    },
                    toolbarBorderRadius({
                      v,
                      device,
                      state: "normal",
                      onChangeGrouped: [
                        "onChangeBorderRadiusGrouped",
                        "onChangeBorderRadiusGroupedDependencies"
                      ],
                      onChangeUngrouped: [
                        "onChangeBorderRadiusUngrouped",
                        "onChangeBorderRadiusUngroupedDependencies"
                      ]
                    })
                  ]
                },
                {
                  id: "moreSettingsAdvanced",
                  label: t("Advanced"),
                  tabIcon: "nc-cog",
                  options: [
                    toolbarShowOnDesktop({ v }),
                    toolbarZIndex({ v }),
                    toolbarCustomCSSClass({ v }),
                    toolbarEntranceAnimation({ v }),
                    toolbarHoverTransition({ v, position: 60 })
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

export function getItemsForTablet(v, component) {
  const device = "tablet";
  const state = "normal";

  const { hex: tabletBgColorHex } = getOptionColorHexByPalette(
    defaultValueValue({ v, key: "bgColorHex", device }),
    defaultValueValue({ v, key: "bgColorPalette", device })
  );

  const inPopup = Boolean(component.props.meta.sectionPopup);

  return [
    toolbarShowOnTablet({ v }),
    {
      id: "tabletToolbarCurrentElement",
      type: "popover",
      icon: "nc-background",
      title: t("Background"),
      position: 80,
      options: [
        {
          id: "tabletTabsCurrentElement",
          type: "tabs",
          tabs: [
            {
              id: "tabletTabCurrentElement",
              label: t("Background"),
              options: [
                toolbarElementContainerTypeImageMap({ v, device, state }),
                toolbarBgImage({
                  v,
                  device,
                  state,
                  disabled:
                    tabletSyncOnChange(v, "media") !== "image" &&
                    tabletSyncOnChange(v, "media") !== "video",
                  onChange: [
                    "onChangeBgImage",
                    "onChangeBgImageBgOpacity",
                    "onChangeBgImageDependencies"
                  ]
                }),
                toolbarBgMapZoom({ v, disabled: v.media !== "map" })
              ]
            }
          ]
        }
      ]
    },
    {
      id: "tabletToolbarColor",
      type: "popover",
      size: "auto",
      title: t("Colors"),
      position: 90,
      icon: {
        style: {
          backgroundColor: hexToRgba(
            tabletBgColorHex,
            tabletSyncOnChange(v, "bgColorOpacity")
          )
        }
      },
      options: [
        {
          id: "tabletTabsColor",
          type: "tabs",
          tabs: [
            {
              id: "tabletTabOverlay",
              label: t("Overlay"),
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
            },
            {
              id: "tabletTabBorder",
              label: t("Border"),
              options: [
                toolbarBorderColor2({
                  v,
                  device,
                  state,
                  onChangeStyle: [
                    "onChangeBorderStyle2",
                    "onChangeContainerBorderStyleDependencies2"
                  ],
                  onChangeHex: [
                    "onChangeBorderColorHexAndOpacity2",
                    "onChangeBorderColorHexAndOpacityPalette2",
                    "onChangeContainerBorderColorHexAndOpacityDependencies2",
                    "onChangeBorderColorHexAndOpacityColumnAndRowSyncTablet2"
                  ],
                  onChangePalette: [
                    "onChangeBorderColorPalette2",
                    "onChangeBorderColorPaletteOpacity2",
                    "onChangeContainerBorderColorHexAndOpacityDependencies2",
                    "onChangeBorderColorHexAndOpacityColumnAndRowSyncTablet2"
                  ]
                }),
                {
                  type: "grid",
                  className: "brz-ed-grid__color-fileds",
                  columns: [
                    {
                      width: 38,
                      options: [
                        toolbarBorderColorHexField2({
                          v,
                          device,
                          state,
                          onChange: [
                            "onChangeBorderColorHexAndOpacity2",
                            "onChangeBorderColorHexAndOpacityPalette2",
                            "onChangeContainerBorderColorHexAndOpacityDependencies2",
                            "onChangeBorderColorHexAndOpacityColumnAndRowSyncTablet2"
                          ]
                        })
                      ]
                    },
                    {
                      width: 54,
                      options: [
                        toolbarBorderWidthBorderColorPicker2({
                          v,
                          device,
                          state,
                          onChangeType: ["onChangeBorderWidthType2"],
                          onChangeGrouped: [
                            "onChangeBorderWidthGrouped2",
                            "onChangeBorderWidthGroupedDependencies2"
                          ],
                          onChangeUngrouped: [
                            "onChangeBorderWidthUngrouped2",
                            "onChangeBorderWidthUngroupedDependencies2"
                          ]
                        })
                      ]
                    }
                  ]
                }
              ]
            },
            {
              id: "tabletBoxShadow",
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
      id: "tabletToolbarLink",
      type: "popover",
      icon: "nc-link",
      disabled: v.linkPopup === "",
      position: 100,
      options: []
    },
    {
      id: "tabletAdvancedSettings",
      type: "advancedSettings",
      sidebarLabel: t("More Settings"),
      icon: "nc-cog",
      title: t("Settings"),
      position: 110,
      options: [
        {
          type: "multiPicker",
          picker: {
            id: "tabletPaddingType",
            label: t("Padding"),
            type: "radioGroup",
            choices: [
              {
                value: "grouped",
                icon: "nc-styling-all"
              },
              {
                value: "ungrouped",
                icon: "nc-styling-individual"
              }
            ],
            value: v.tabletPaddingType
          },
          choices: {
            grouped: [
              {
                id: "tabletPadding",
                type: "slider",
                slider: {
                  min: 0,
                  max: 100
                },
                input: {
                  show: true,
                  min: 0
                },
                suffix: {
                  show: true,
                  choices: [
                    {
                      title: "px",
                      value: "px"
                    },
                    {
                      title: "%",
                      value: "%"
                    }
                  ]
                },
                value: {
                  value: v.tabletPadding,
                  suffix: v.tabletPaddingSuffix
                },
                onChange: ({
                  value: tabletPadding,
                  suffix: tabletPaddingSuffix
                }) => {
                  return {
                    tabletPadding,
                    tabletPaddingSuffix,
                    tabletPaddingTop: tabletPadding,
                    tabletPaddingRight: tabletPadding,
                    tabletPaddingBottom: tabletPadding,
                    tabletPaddingLeft: tabletPadding
                  };
                }
              }
            ],
            ungrouped: [
              {
                id: "tabletPaddingTop",
                icon: "nc-styling-top",
                type: "slider",
                slider: {
                  min: 0,
                  max: 100
                },
                input: {
                  show: true,
                  min: 0
                },
                suffix: {
                  show: true,
                  choices: [
                    {
                      title: "px",
                      value: "px"
                    },
                    {
                      title: "%",
                      value: "%"
                    }
                  ]
                },
                value: {
                  value: v.tabletPaddingTop,
                  suffix: v.tabletPaddingTopSuffix
                },
                onChange: ({
                  value: tabletPaddingTop,
                  suffix: tabletPaddingTopSuffix
                }) => {
                  return {
                    tabletPaddingTop,
                    tabletPaddingTopSuffix,
                    tabletPadding:
                      tabletPaddingTop === v.tabletPaddingRight &&
                      tabletPaddingTop === v.tabletPaddingLeft &&
                      tabletPaddingTop === v.tabletPaddingBottom
                        ? tabletPaddingTop
                        : v.tabletPadding
                  };
                }
              },
              {
                id: "tabletPaddingRight",
                icon: "nc-styling-right",
                type: "slider",
                slider: {
                  min: 0,
                  max: 100
                },
                input: {
                  show: true,
                  min: 0
                },
                suffix: {
                  show: true,
                  choices: [
                    {
                      title: "px",
                      value: "px"
                    },
                    {
                      title: "%",
                      value: "%"
                    }
                  ]
                },
                value: {
                  value: v.tabletPaddingRight,
                  suffix: v.tabletPaddingRightSuffix
                },
                onChange: ({
                  value: tabletPaddingRight,
                  suffix: tabletPaddingRightSuffix
                }) => {
                  return {
                    tabletPaddingRight,
                    tabletPaddingRightSuffix,
                    tabletPadding:
                      tabletPaddingRight === v.tabletPaddingTop &&
                      tabletPaddingRight === v.tabletPaddingLeft &&
                      tabletPaddingRight === v.tabletPaddingBottom
                        ? tabletPaddingRight
                        : v.tabletPadding
                  };
                }
              },
              {
                id: "tabletPaddingBottom",
                icon: "nc-styling-bottom",
                type: "slider",
                slider: {
                  min: 0,
                  max: 100
                },
                input: {
                  show: true,
                  min: 0
                },
                suffix: {
                  show: true,
                  choices: [
                    {
                      title: "px",
                      value: "px"
                    },
                    {
                      title: "%",
                      value: "%"
                    }
                  ]
                },
                value: {
                  value: v.tabletPaddingBottom,
                  suffix: v.tabletPaddingBottomSuffix
                },
                onChange: ({
                  value: tabletPaddingBottom,
                  suffix: tabletPaddingBottomSuffix
                }) => {
                  return {
                    tabletPaddingBottom,
                    tabletPaddingBottomSuffix,
                    tabletPadding:
                      tabletPaddingBottom === v.tabletPaddingTop &&
                      tabletPaddingBottom === v.tabletPaddingLeft &&
                      tabletPaddingBottom === v.tabletPaddingRight
                        ? tabletPaddingBottom
                        : v.tabletPadding
                  };
                }
              },
              {
                id: "tabletPaddingLeft",
                icon: "nc-styling-left",
                type: "slider",
                slider: {
                  min: 0,
                  max: 100
                },
                input: {
                  show: true,
                  min: 0
                },
                suffix: {
                  show: true,
                  choices: [
                    {
                      title: "px",
                      value: "px"
                    },
                    {
                      title: "%",
                      value: "%"
                    }
                  ]
                },
                value: {
                  value: v.tabletPaddingLeft,
                  suffix: v.tabletPaddingLeftSuffix
                },
                onChange: ({
                  value: tabletPaddingLeft,
                  suffix: tabletPaddingLeftSuffix
                }) => {
                  return {
                    tabletPaddingLeft,
                    tabletPaddingLeftSuffix,
                    tabletPadding:
                      tabletPaddingLeft === v.tabletPaddingTop &&
                      tabletPaddingLeft === v.tabletPaddingBottom &&
                      tabletPaddingLeft === v.tabletPaddingRight
                        ? tabletPaddingLeft
                        : v.tabletPadding
                  };
                }
              }
            ]
          }
        },
        {
          type: "multiPicker",
          disabled: inPopup,
          picker: {
            id: "tabletMarginType",
            label: t("Margin"),
            type: "radioGroup",
            choices: [
              {
                value: "grouped",
                icon: "nc-styling-all"
              },
              {
                value: "ungrouped",
                icon: "nc-styling-individual"
              }
            ],
            value: v.tabletMarginType
          },
          choices: {
            grouped: [
              {
                id: "tabletMargin",
                type: "slider",
                slider: {
                  min: -100,
                  max: 100
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
                    },
                    {
                      title: "%",
                      value: "%"
                    }
                  ]
                },
                value: {
                  value: v.tabletMargin,
                  suffix: v.tabletMarginSuffix
                },
                onChange: ({
                  value: tabletMargin,
                  suffix: tabletMarginSuffix
                }) => {
                  return {
                    tabletMargin,
                    tabletMarginSuffix,
                    tabletMarginTop: tabletMargin,
                    tabletMarginBottom: tabletMargin
                  };
                }
              }
            ],
            ungrouped: [
              {
                id: "tabletMarginTop",
                icon: "nc-styling-top",
                type: "slider",
                slider: {
                  min: -100,
                  max: 100
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
                    },
                    {
                      title: "%",
                      value: "%"
                    }
                  ]
                },
                value: {
                  value: v.tabletMarginTop,
                  suffix: v.tabletMarginTopSuffix
                },
                onChange: ({
                  value: tabletMarginTop,
                  suffix: tabletMarginTopSuffix
                }) => {
                  return {
                    tabletMarginTop,
                    tabletMarginTopSuffix,
                    tabletMargin:
                      tabletMarginTop === v.tabletMarginBottom
                        ? tabletMarginTop
                        : v.tabletMargin
                  };
                }
              },
              {
                id: "tabletMarginBottom",
                icon: "nc-styling-bottom",
                type: "slider",
                slider: {
                  min: -100,
                  max: 100
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
                    },
                    {
                      title: "%",
                      value: "%"
                    }
                  ]
                },
                value: {
                  value: v.tabletMarginBottom,
                  suffix: v.tabletMarginBottomSuffix
                },
                onChange: ({
                  value: tabletMarginBottom,
                  suffix: tabletMarginBottomSuffix
                }) => {
                  return {
                    tabletMarginBottom,
                    tabletMarginBottomSuffix,
                    tabletMargin:
                      tabletMarginBottom === v.tabletMarginTop
                        ? tabletMarginBottom
                        : v.tabletMargin
                  };
                }
              }
            ]
          }
        },
        toolbarBorderRadius({
          v,
          device,
          state,
          onChangeGrouped: [
            "onChangeBorderRadiusGrouped",
            "onChangeBorderRadiusGroupedDependencies"
          ],
          onChangeUngrouped: [
            "onChangeBorderRadiusUngrouped",
            "onChangeBorderRadiusUngroupedDependencies"
          ]
        })
      ]
    }
  ];
}

export function getItemsForMobile(v, component) {
  const device = "mobile";
  const state = "normal";

  const { hex: mobileBgColorHex } = getOptionColorHexByPalette(
    defaultValueValue({ v, key: "bgColorHex", device }),
    defaultValueValue({ v, key: "bgColorPalette", device })
  );

  const inPopup = Boolean(component.props.meta.sectionPopup);

  return [
    toolbarShowOnMobile({ v }),
    {
      id: "mobileToolbarCurrentElement",
      type: "popover",
      position: 80,
      icon: "nc-background",
      title: t("Background"),
      options: [
        {
          id: "mobileTabsCurrentElement",
          type: "tabs",
          tabs: [
            {
              id: "mobileTabCurrentElement",
              label: t("Background"),
              options: [
                toolbarElementContainerTypeImageMap({ v, device, state }),
                toolbarBgImage({
                  v,
                  device,
                  state,
                  disabled:
                    mobileSyncOnChange(v, "media") !== "image" &&
                    mobileSyncOnChange(v, "media") !== "video",
                  onChange: [
                    "onChangeBgImage",
                    "onChangeBgImageBgOpacity",
                    "onChangeBgImageDependencies",
                    "onChangeBgImageColumnAndRowSyncMobile"
                  ]
                }),
                toolbarBgMapZoom({ v, disabled: v.media !== "map" })
              ]
            }
          ]
        }
      ]
    },
    {
      id: "mobileToolbarColor",
      type: "popover",
      size: "auto",
      title: t("Colors"),
      position: 90,
      icon: {
        style: {
          backgroundColor: hexToRgba(
            mobileBgColorHex,
            mobileSyncOnChange(v, "bgColorOpacity")
          )
        }
      },
      options: [
        {
          id: "mobileTabsColor",
          type: "tabs",
          tabs: [
            {
              id: "mobileTabOverlay",
              label: t("Overlay"),
              options: [
                toolbarBgColor2({
                  v,
                  device,
                  state,
                  onChangeType: ["onChangeBgColorType2"],
                  onChangeHex: [
                    "onChangeBgColorHexAndOpacity2",
                    "onChangeBgColorHexAndOpacityPalette2",
                    "onChangeBgColorHexAndOpacityDependencies2",
                    "onChangeBgColorHexAndOpacityColumnAndRowSyncMobile2"
                  ],
                  onChangePalette: [
                    "onChangeBgColorPalette2",
                    "onChangeBgColorPaletteOpacity2",
                    "onChangeBgColorHexAndOpacityDependencies2",
                    "onChangeBgColorHexAndOpacityColumnAndRowSyncMobile2"
                  ],
                  onChangeGradientHex: [
                    "onChangeBgColorHexAndOpacity2",
                    "onChangeBgColorHexAndOpacityPalette2",
                    "onChangeBgColorHexAndOpacityDependencies2",
                    "onChangeBgColorHexAndOpacityColumnAndRowSyncMobile2"
                  ],
                  onChangeGradientPalette: [
                    "onChangeBgColorPalette2",
                    "onChangeBgColorPaletteOpacity2",
                    "onChangeBgColorHexAndOpacityDependencies2",
                    "onChangeBgColorHexAndOpacityColumnAndRowSyncMobile2"
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
                            "onChangeBgColorHexAndOpacityDependencies2",
                            "onChangeBgColorHexAndOpacityColumnAndRowSyncMobile2"
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
            },
            {
              id: "mobileTabBorder",
              label: t("Border"),
              options: [
                toolbarBorderColor2({
                  v,
                  device,
                  state,
                  onChangeStyle: [
                    "onChangeBorderStyle2",
                    "onChangeContainerBorderStyleDependencies2"
                  ],
                  onChangeHex: [
                    "onChangeBorderColorHexAndOpacity2",
                    "onChangeBorderColorHexAndOpacityPalette2",
                    "onChangeContainerBorderColorHexAndOpacityDependencies2",
                    "onChangeBorderColorHexAndOpacityColumnAndRowSyncMobile2"
                  ],
                  onChangePalette: [
                    "onChangeBorderColorPalette2",
                    "onChangeBorderColorPaletteOpacity2",
                    "onChangeContainerBorderColorHexAndOpacityDependencies2",
                    "onChangeBorderColorHexAndOpacityColumnAndRowSyncMobile2"
                  ]
                }),
                {
                  type: "grid",
                  className: "brz-ed-grid__color-fileds",
                  columns: [
                    {
                      width: 38,
                      options: [
                        toolbarBorderColorHexField2({
                          v,
                          device,
                          state,
                          onChange: [
                            "onChangeBorderColorHexAndOpacity2",
                            "onChangeBorderColorHexAndOpacityPalette2",
                            "onChangeContainerBorderColorHexAndOpacityDependencies2",
                            "onChangeBorderColorHexAndOpacityColumnAndRowSyncMobile2"
                          ]
                        })
                      ]
                    },
                    {
                      width: 54,
                      options: [
                        toolbarBorderWidthBorderColorPicker2({
                          v,
                          device,
                          state,
                          onChangeType: ["onChangeBorderWidthType2"],
                          onChangeGrouped: [
                            "onChangeBorderWidthGrouped2",
                            "onChangeBorderWidthGroupedDependencies2"
                          ],
                          onChangeUngrouped: [
                            "onChangeBorderWidthUngrouped2",
                            "onChangeBorderWidthUngroupedDependencies2"
                          ]
                        })
                      ]
                    }
                  ]
                }
              ]
            },
            {
              id: "tabletBoxShadow",
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
      id: "mobileToolbarLink",
      type: "popover",
      icon: "nc-link",
      disabled: v.linkPopup === "",
      position: 100,
      options: []
    },
    {
      id: "mobileAdvancedSettings",
      type: "advancedSettings",
      sidebarLabel: t("More Settings"),
      icon: "nc-cog",
      title: t("Settings"),
      position: 110,
      options: [
        {
          type: "multiPicker",
          picker: {
            id: "mobilePaddingType",
            label: t("Padding"),
            type: "radioGroup",
            choices: [
              {
                value: "grouped",
                icon: "nc-styling-all"
              },
              {
                value: "ungrouped",
                icon: "nc-styling-individual"
              }
            ],
            value: v.mobilePaddingType
          },
          choices: {
            grouped: [
              {
                id: "mobilePadding",
                type: "slider",
                slider: {
                  min: 0,
                  max: 100
                },
                input: {
                  show: true,
                  min: 0
                },
                suffix: {
                  show: true,
                  choices: [
                    {
                      title: "px",
                      value: "px"
                    },
                    {
                      title: "%",
                      value: "%"
                    }
                  ]
                },
                value: {
                  value: v.mobilePadding,
                  suffix: v.mobilePaddingSuffix
                },
                onChange: ({
                  value: mobilePadding,
                  suffix: mobilePaddingSuffix
                }) => {
                  return {
                    mobilePadding,
                    mobilePaddingSuffix,
                    mobilePaddingTop: mobilePadding,
                    mobilePaddingRight: mobilePadding,
                    mobilePaddingBottom: mobilePadding,
                    mobilePaddingLeft: mobilePadding
                  };
                }
              }
            ],
            ungrouped: [
              {
                id: "mobilePaddingTop",
                icon: "nc-styling-top",
                type: "slider",
                slider: {
                  min: 0,
                  max: 100
                },
                input: {
                  show: true,
                  min: 0
                },
                suffix: {
                  show: true,
                  choices: [
                    {
                      title: "px",
                      value: "px"
                    },
                    {
                      title: "%",
                      value: "%"
                    }
                  ]
                },
                value: {
                  value: v.mobilePaddingTop,
                  suffix: v.mobilePaddingTopSuffix
                },
                onChange: ({
                  value: mobilePaddingTop,
                  suffix: mobilePaddingTopSuffix
                }) => {
                  return {
                    mobilePaddingTop,
                    mobilePaddingTopSuffix,
                    mobilePadding:
                      mobilePaddingTop === v.mobilePaddingRight &&
                      mobilePaddingTop === v.mobilePaddingLeft &&
                      mobilePaddingTop === v.mobilePaddingBottom
                        ? mobilePaddingTop
                        : v.mobilePadding
                  };
                }
              },
              {
                id: "mobilePaddingRight",
                icon: "nc-styling-right",
                type: "slider",
                slider: {
                  min: 0,
                  max: 100
                },
                input: {
                  show: true,
                  min: 0
                },
                suffix: {
                  show: true,
                  choices: [
                    {
                      title: "px",
                      value: "px"
                    },
                    {
                      title: "%",
                      value: "%"
                    }
                  ]
                },
                value: {
                  value: v.mobilePaddingRight,
                  suffix: v.mobilePaddingRightSuffix
                },
                onChange: ({
                  value: mobilePaddingRight,
                  suffix: mobilePaddingRightSuffix
                }) => {
                  return {
                    mobilePaddingRight,
                    mobilePaddingRightSuffix,
                    mobilePadding:
                      mobilePaddingRight === v.mobilePaddingTop &&
                      mobilePaddingRight === v.mobilePaddingLeft &&
                      mobilePaddingRight === v.mobilePaddingBottom
                        ? mobilePaddingRight
                        : v.mobilePadding
                  };
                }
              },
              {
                id: "mobilePaddingBottom",
                icon: "nc-styling-bottom",
                type: "slider",
                slider: {
                  min: 0,
                  max: 100
                },
                input: {
                  show: true,
                  min: 0
                },
                suffix: {
                  show: true,
                  choices: [
                    {
                      title: "px",
                      value: "px"
                    },
                    {
                      title: "%",
                      value: "%"
                    }
                  ]
                },
                value: {
                  value: v.mobilePaddingBottom,
                  suffix: v.mobilePaddingBottomSuffix
                },
                onChange: ({
                  value: mobilePaddingBottom,
                  suffix: mobilePaddingBottomSuffix
                }) => {
                  return {
                    mobilePaddingBottom,
                    mobilePaddingBottomSuffix,
                    mobilePadding:
                      mobilePaddingBottom === v.mobilePaddingTop &&
                      mobilePaddingBottom === v.mobilePaddingLeft &&
                      mobilePaddingBottom === v.mobilePaddingRight
                        ? mobilePaddingBottom
                        : v.mobilePadding
                  };
                }
              },
              {
                id: "mobilePaddingLeft",
                icon: "nc-styling-left",
                type: "slider",
                slider: {
                  min: 0,
                  max: 100
                },
                input: {
                  show: true,
                  min: 0
                },
                suffix: {
                  show: true,
                  choices: [
                    {
                      title: "px",
                      value: "px"
                    },
                    {
                      title: "%",
                      value: "%"
                    }
                  ]
                },
                value: {
                  value: v.mobilePaddingLeft,
                  suffix: v.mobilePaddingLeftSuffix
                },
                onChange: ({
                  value: mobilePaddingLeft,
                  suffix: mobilePaddingLeftSuffix
                }) => {
                  return {
                    mobilePaddingLeft,
                    mobilePaddingLeftSuffix,
                    mobilePadding:
                      mobilePaddingLeft === v.mobilePaddingTop &&
                      mobilePaddingLeft === v.mobilePaddingBottom &&
                      mobilePaddingLeft === v.mobilePaddingRight
                        ? mobilePaddingLeft
                        : v.mobilePadding
                  };
                }
              }
            ]
          }
        },
        {
          type: "multiPicker",
          disabled: inPopup,
          picker: {
            id: "mobileMarginType",
            label: t("Margin"),
            type: "radioGroup",
            choices: [
              {
                value: "grouped",
                icon: "nc-styling-all"
              },
              {
                value: "ungrouped",
                icon: "nc-styling-individual"
              }
            ],
            value: v.mobileMarginType
          },
          choices: {
            grouped: [
              {
                id: "mobileMargin",
                type: "slider",
                slider: {
                  min: -100,
                  max: 100
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
                    },
                    {
                      title: "%",
                      value: "%"
                    }
                  ]
                },
                value: {
                  value: v.mobileMargin,
                  suffix: v.mobileMarginSuffix
                },
                onChange: ({
                  value: mobileMargin,
                  suffix: mobileMarginSuffix
                }) => {
                  return {
                    mobileMargin,
                    mobileMarginSuffix,
                    mobileMarginTop: mobileMargin,
                    mobileMarginBottom: mobileMargin
                  };
                }
              }
            ],
            ungrouped: [
              {
                id: "mobileMarginTop",
                icon: "nc-styling-top",
                type: "slider",
                slider: {
                  min: -100,
                  max: 100
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
                    },
                    {
                      title: "%",
                      value: "%"
                    }
                  ]
                },
                value: {
                  value: v.mobileMarginTop,
                  suffix: v.mobileMarginTopSuffix
                },
                onChange: ({
                  value: mobileMarginTop,
                  suffix: mobileMarginTopSuffix
                }) => {
                  return {
                    mobileMarginTop,
                    mobileMarginTopSuffix,
                    mobileMargin:
                      mobileMarginTop === v.mobileMarginBottom
                        ? mobileMarginTop
                        : v.mobileMargin
                  };
                }
              },
              {
                id: "mobileMarginBottom",
                icon: "nc-styling-bottom",
                type: "slider",
                slider: {
                  min: -100,
                  max: 100
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
                    },
                    {
                      title: "%",
                      value: "%"
                    }
                  ]
                },
                value: {
                  value: v.mobileMarginBottom,
                  suffix: v.mobileMarginBottomSuffix
                },
                onChange: ({
                  value: mobileMarginBottom,
                  suffix: mobileMarginBottomSuffix
                }) => {
                  return {
                    mobileMarginBottom,
                    mobileMarginBottomSuffix,
                    mobileMargin:
                      mobileMarginBottom === v.mobileMarginTop
                        ? mobileMarginBottom
                        : v.mobileMargin
                  };
                }
              }
            ]
          }
        },
        toolbarBorderRadius({
          v,
          device,
          state,
          onChangeGrouped: [
            "onChangeBorderRadiusGrouped",
            "onChangeBorderRadiusGroupedDependencies"
          ],
          onChangeUngrouped: [
            "onChangeBorderRadiusUngrouped",
            "onChangeBorderRadiusUngroupedDependencies"
          ]
        })
      ]
    }
  ];
}
