import React, { Fragment } from "react";
import _ from "underscore";
import classnames from "classnames";
import EditorComponent from "visual/editorComponents/EditorComponent";
import EditorArrayComponent from "visual/editorComponents/EditorArrayComponent";
import CustomCSS from "visual/component/CustomCSS";
import SortableElement from "visual/component/Sortable/SortableElement";
import SortableHandle from "visual/component/Sortable/SortableHandle";
import ContainerBorder from "visual/component/ContainerBorder";
import FloatingButton from "visual/component/FloatingButton";
import Background from "visual/component/Background";
import Animation from "visual/component/Animation";
import { Roles } from "visual/component/Roles";
import Toolbar from "visual/component/Toolbar";
import { getStore } from "visual/redux/store";
import { globalBlocksSelector } from "visual/redux/selectors";
import * as toolbarConfig from "./toolbar";
import * as toolbarExtendConfig from "./extendToolbar";
import ContextMenu from "visual/component/ContextMenu";
import contextMenuConfig from "./contextMenu";
import { videoData as getVideoData } from "visual/utils/video";
import Link from "visual/component/Link";
import { percentageToPixels } from "visual/utils/meta";
import Items from "./Items";
import { css } from "visual/utils/cssStyle";
import { styleBg, styleContainer } from "./styles";
import defaultValue from "./defaultValue.json";
import { tabletSyncOnChange, mobileSyncOnChange } from "visual/utils/onChange";

class Row extends EditorComponent {
  static get componentId() {
    return "Row";
  }

  static defaultProps = {
    meta: {}
  };

  static defaultValue = defaultValue;

  mounted = false;

  componentDidMount() {
    this.mounted = true;
  }

  shouldComponentUpdate(nextProps) {
    return this.optionalSCU(nextProps);
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleValueChange(value, meta) {
    const inPopup = Boolean(this.props.meta.sectionPopup);

    if (value.items.length === 0 && !inPopup) {
      this.selfDestruct();
    } else {
      super.handleValueChange(value, meta);
    }
  }

  handleToolbarOpen = () => {
    this.containerBorder.setActive(true);
    this.floatingButton.setActive(true);
  };

  handleToolbarClose = () => {
    if (!this.mounted) {
      return;
    }

    this.containerBorder.setActive(false);
    this.floatingButton.setActive(false);

    this.patchValue({
      tabsState: "tabNormal",
      tabsCurrentElement: "tabCurrentElement",
      tabsColor: "tabOverlay"
    });
  };

  handleToolbarEnter = () => {
    this.containerBorder.setParentsHover(true);
  };

  handleToolbarLeave = () => {
    this.containerBorder.setParentsHover(false);
  };

  handleButtonEnter = () => {
    this.containerBorder.setShowBorder(true);
  };

  handleButtonLeave = () => {
    this.containerBorder.setShowBorder(false);
  };

  getMeta(v) {
    const { meta } = this.props;
    const {
      size,

      // Padding
      paddingType,
      padding,
      paddingSuffix,
      paddingLeft,
      paddingLeftSuffix,
      paddingRight,
      paddingRightSuffix,

      // Border
      borderWidthType,
      borderWidth,
      borderLeftWidth,
      borderRightWidth,

      // Tablet Padding
      tabletPadding,
      tabletPaddingType,
      tabletPaddingSuffix,
      tabletPaddingLeft,
      tabletPaddingLeftSuffix,
      tabletPaddingRight,
      tabletPaddingRightSuffix,

      // Mobile Padding
      mobilePadding,
      mobilePaddingType,
      mobilePaddingSuffix,
      mobilePaddingLeft,
      mobilePaddingLeftSuffix,
      mobilePaddingRight,
      mobilePaddingRightSuffix,

      items
    } = v;

    const containerWidth = meta.desktopW * (size / 100);
    const paddingW =
      paddingType === "grouped"
        ? percentageToPixels(padding * 2, paddingSuffix, containerWidth)
        : percentageToPixels(paddingLeft, paddingLeftSuffix, containerWidth) +
          percentageToPixels(paddingRight, paddingRightSuffix, containerWidth);
    const borderWidthW =
      borderWidthType === "grouped"
        ? Number(borderWidth) * 2
        : Number(borderLeftWidth) + Number(borderRightWidth);

    // Tablet Padding
    const tabletPaddingW =
      tabletPaddingType === "grouped"
        ? percentageToPixels(
            tabletPadding * 2,
            tabletPaddingSuffix,
            meta.tabletW
          )
        : percentageToPixels(
            tabletPaddingLeft,
            tabletPaddingLeftSuffix,
            meta.tabletW
          ) +
          percentageToPixels(
            tabletPaddingRight,
            tabletPaddingRightSuffix,
            meta.tabletW
          );

    // Mobile Padding
    const mobilePaddingW =
      mobilePaddingType === "grouped"
        ? percentageToPixels(
            mobilePadding * 2,
            mobilePaddingSuffix,
            meta.mobileW
          )
        : percentageToPixels(
            mobilePaddingLeft,
            mobilePaddingLeftSuffix,
            meta.mobileW
          ) +
          percentageToPixels(
            mobilePaddingRight,
            mobilePaddingRightSuffix,
            meta.mobileW
          );

    const externalSpacing = paddingW + borderWidthW;
    const externalTabletSpacing = tabletPaddingW + borderWidthW;
    const externalMobileSpacing = mobilePaddingW + borderWidthW;

    const desktopW = Math.round((containerWidth - externalSpacing) * 10) / 10;
    const tabletW =
      Math.round((meta.tabletW - externalTabletSpacing) * 10) / 10;
    const mobileW =
      Math.round((meta.mobileW - externalMobileSpacing) * 10) / 10;

    return Object.assign({}, meta, {
      row: {
        isInner: this.isInnerRow(),
        itemsLength: items.length
      },
      inGrid: true,
      mobileW,
      tabletW,
      desktopW
    });
  }

  isInnerRow() {
    const { meta } = this.props;

    return meta.row !== undefined;
  }

  renderToolbar() {
    return (
      <div className="brz-ed-row__toolbar">
        <Toolbar
          {...this.makeToolbarPropsFromConfig(toolbarConfig)}
          onOpen={this.handleToolbarOpen}
          onClose={this.handleToolbarClose}
          onMouseEnter={this.handleToolbarEnter}
          onMouseLeave={this.handleToolbarLeave}
        >
          <SortableHandle>
            <div
              onMouseEnter={this.handleButtonEnter}
              onMouseLeave={this.handleButtonLeave}
            >
              <FloatingButton
                reactToClick={false}
                ref={el => {
                  this.floatingButton = el;
                }}
              />
            </div>
          </SortableHandle>
        </Toolbar>
      </div>
    );
  }

  renderContent(v, vs) {
    const {
      customClassName,
      className,
      media,
      bgImageSrc,
      bgPopulation,
      bgColorOpacity,
      bgVideo,
      bgMapZoom,
      bgMapAddress,
      mobileReverseColumns,
      tabletReverseColumns
    } = v;

    const classNameBg = classnames(
      "brz-d-xs-flex",
      "brz-flex-xs-wrap",
      customClassName,
      css(
        `${this.constructor.componentId}-bg`,
        `${this.getId()}-bg`,
        styleBg(vs, v)
      )
    );

    const classNameContainer = classnames(
      "brz-row",
      { "brz-row--inner": this.isInnerRow() },
      className,
      css(
        `${this.constructor.componentId}-container`,
        `${this.getId()}-container`,
        styleContainer(vs, v)
      )
    );

    let bgProps = {
      className: classNameBg,
      imageSrc: bgImageSrc || bgPopulation,
      colorOpacity: bgColorOpacity,
      tabletImageSrc: tabletSyncOnChange(v, "bgImageSrc"),
      tabletColorOpacity: tabletSyncOnChange(v, "bgColorOpacity"),
      mobileImageSrc: mobileSyncOnChange(v, "bgImageSrc"),
      mobileColorOpacity: mobileSyncOnChange(v, "bgColorOpacity")
    };

    if (media === "video") {
      bgProps.video = getVideoData(bgVideo);
    }

    if (
      media === "map" ||
      mobileSyncOnChange(v, "media") === "map" ||
      tabletSyncOnChange(v, "media") === "map"
    ) {
      bgProps.mapAddress = bgMapAddress;
      bgProps.mapZoom = bgMapZoom;
    }

    const itemsProps = this.makeSubcomponentProps({
      bindWithKey: "items",
      containerClassName: classNameContainer,
      toolbarExtend: this.makeToolbarPropsFromConfig(toolbarExtendConfig, {
        filterExtendName: `${this.constructor.componentId}_child`
      }),
      meta: this.getMeta(v),
      tabletReversed: tabletReverseColumns,
      mobileReversed: mobileReverseColumns
    });

    return (
      <Background {...bgProps}>
        <Items {...itemsProps} />
      </Background>
    );
  }

  renderPopups() {
    const popupsProps = this.makeSubcomponentProps({
      bindWithKey: "popups",
      itemProps: itemData => {
        let isGlobal = false;

        if (itemData.type === "GlobalBlock") {
          // TODO: some kind of error handling
          itemData = globalBlocksSelector(getStore().getState())[
            itemData.value.globalBlockId
          ];
          isGlobal = true;
        }

        const {
          blockId,
          value: { popupId }
        } = itemData;

        return {
          blockId,
          instanceKey: IS_EDITOR
            ? `${this.getId()}_${popupId}`
            : isGlobal
            ? `global_${popupId}`
            : popupId
        };
      }
    });

    return <EditorArrayComponent {...popupsProps} />;
  }

  renderForEdit(v, vs) {
    const {
      className,
      showToolbar,
      animationName,
      animationDuration,
      animationDelay,
      linkType,
      linkPopup,
      popups
    } = v;

    const classNameRowContainer = classnames("brz-row__container", className);

    if (showToolbar === "off") {
      return (
        <SortableElement type="row" useHandle={true}>
          <Animation
            className={classNameRowContainer}
            name={animationName !== "none" && animationName}
            duration={animationDuration}
            delay={animationDelay}
          >
            {this.renderContent(v, vs)}
          </Animation>
        </SortableElement>
      );
    }

    return (
      <Fragment>
        <SortableElement type="row" useHandle={true}>
          <CustomCSS selectorName={this.getId()} css={v.customCSS}>
            <Animation
              className={classNameRowContainer}
              name={animationName !== "none" && animationName}
              duration={animationDuration}
              delay={animationDelay}
            >
              <ContextMenu {...this.makeContextMenuProps(contextMenuConfig)}>
                <Roles
                  allow={["admin"]}
                  fallbackRender={() => this.renderContent(v, vs)}
                >
                  <ContainerBorder
                    ref={input => {
                      this.containerBorder = input;
                    }}
                    className="brz-ed-border__row"
                    borderStyle="none"
                    activeBorderStyle="dotted"
                    showBorders={false}
                    reactToClick={false}
                    path={this.props.path}
                  >
                    {this.renderToolbar(v)}
                    {this.renderContent(v, vs)}
                  </ContainerBorder>
                </Roles>
              </ContextMenu>
            </Animation>
          </CustomCSS>
        </SortableElement>
        {popups.length > 0 &&
          linkType === "popup" &&
          linkPopup !== "" &&
          this.renderPopups()}
      </Fragment>
    );
  }

  renderForView(v, vs) {
    const {
      className,
      animationName,
      animationDuration,
      animationDelay,
      linkExternalType,
      linkType,
      linkAnchor,
      linkExternalBlank,
      linkExternalRel,
      linkPopup,
      popups
    } = v;

    const linkHrefs = {
      anchor: linkAnchor,
      external: v[linkExternalType],
      popup: linkPopup
    };

    const classNameRowContainer = classnames("brz-row__container", className);

    return (
      <Fragment>
        <CustomCSS selectorName={this.getId()} css={v.customCSS}>
          <Animation
            className={classNameRowContainer}
            name={animationName !== "none" && animationName}
            duration={animationDuration}
            delay={animationDelay}
          >
            {this.renderContent(v, vs)}
            {linkHrefs[linkType] !== "" && (
              <Link
                className="brz-link-container"
                type={linkType}
                href={linkHrefs[linkType]}
                target={linkExternalBlank}
                rel={linkExternalRel}
              />
            )}
          </Animation>
        </CustomCSS>
        {popups.length > 0 &&
          linkType === "popup" &&
          linkPopup !== "" &&
          this.renderPopups()}
      </Fragment>
    );
  }
}

export default Row;
