import React from "react";
import EditorComponent from "visual/editorComponents/EditorComponent";
import classnames from "classnames";
import CustomCSS from "visual/component/CustomCSS";
import Items from "./items";
import Background from "visual/component/Background";
import ContainerBorder from "visual/component/ContainerBorder";
import PaddingResizer from "visual/component/PaddingResizer";
import { Roles } from "visual/component/Roles";
import { videoData as getVideoData } from "visual/utils/video";
import {
  wInBoxedPage,
  wInTabletPage,
  wInMobilePage,
  wInFullPage
} from "visual/config/columns";
import { CollapsibleToolbar } from "visual/component/Toolbar";
import * as toolbarConfig from "./toolbar";
import { styleBg, styleContainer, styleContainerWrap } from "./styles";
import { css } from "visual/utils/cssStyle";
import defaultValue from "./defaultValue.json";
import { getStore } from "visual/redux/store";
import { tabletSyncOnChange, mobileSyncOnChange } from "visual/utils/onChange";

class SectionItem extends EditorComponent {
  static get componentId() {
    return "SectionItem";
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
    const {
      meta: {
        section: { isSlider, showOnMobile, showOnTablet }
      }
    } = this.props;
    const {
      meta: {
        section: {
          showOnMobile: newShowOnMobile,
          showOnTablet: newShowOnTablet
        }
      }
    } = nextProps;
    const { deviceMode } = getStore().getState().ui;
    const deviceUpdate =
      (deviceMode === "mobile" && showOnMobile !== newShowOnMobile) ||
      (deviceMode === "tablet" && showOnTablet !== newShowOnTablet);

    return isSlider || deviceUpdate || this.optionalSCU(nextProps);
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleToolbarOpen = () => {
    if (this.containerBorder) {
      this.containerBorder.setActive(true);
    }
  };

  handleToolbarClose = () => {
    if (!this.mounted) {
      return;
    }

    if (this.containerBorder) {
      this.containerBorder.setActive(false);
    }

    this.patchValue({
      tabsState: "tabNormal",
      tabsCurrentElement: "tabCurrentElement",
      tabsColor: "tabOverlay"
    });
  };

  handlePaddingResizerChange = patch => this.patchValue(patch);

  getMeta(v) {
    const { meta } = this.props;
    const {
      containerSize,
      containerType,
      borderWidthType,
      borderWidth,
      borderLeftWidth,
      borderRightWidth
    } = v;

    const borderWidthW =
      borderWidthType === "grouped"
        ? Number(borderWidth) * 2
        : Number(borderLeftWidth) + Number(borderRightWidth);

    const desktopW =
      containerType === "fullWidth"
        ? wInFullPage - borderWidthW
        : Math.round(
            (wInBoxedPage - borderWidthW) * (containerSize / 100) * 10
          ) / 10;

    const mobileW = wInMobilePage - borderWidthW - 30; // 30 is iframe default padding
    const tabletW = wInTabletPage - borderWidthW - 30; // 30 is iframe default padding

    return {
      ...meta,
      mobileW,
      tabletW,
      desktopW
    };
  }

  renderToolbar(_v) {
    const { globalBlockId } = this.props.meta;

    return (
      <CollapsibleToolbar
        {...this.makeToolbarPropsFromConfig(toolbarConfig)}
        className="brz-ed-collapsible__section brz-ed-collapsible--big"
        animation="rightToLeft"
        badge={Boolean(globalBlockId)}
        onOpen={this.handleToolbarOpen}
        onClose={this.handleToolbarClose}
      />
    );
  }

  renderItems(v, vs) {
    const {
      containerClassName,
      media,
      bgImageSrc,
      bgPopulation,
      bgColorOpacity,
      bgAttachment,
      bgVideo,
      bgVideoLoop,
      bgVideoQuality,
      bgMapZoom,
      bgMapAddress,
      shapeTopType,
      shapeBottomType
    } = v;

    const meta = this.getMeta(v);

    const classNameBg = classnames(
      css(
        `${this.constructor.componentId}-bg`,
        `${this.getId()}-bg`,
        styleBg(vs, v, this.props)
      )
    );
    const classNameContainer = classnames(
      "brz-container",
      containerClassName,
      css(
        `${this.constructor.componentId}-container`,
        `${this.getId()}-container`,
        styleContainer(vs, v)
      )
    );
    const classNameContainerWrap = classnames(
      "brz-container__wrap",
      css(
        `${this.constructor.componentId}-containerWrap`,
        `${this.getId()}-containerWrap`,
        styleContainerWrap(vs, v)
      )
    );
    let bgProps = {
      className: classNameBg,
      imageSrc: bgImageSrc || bgPopulation,
      colorOpacity: bgColorOpacity,
      parallax: bgAttachment === "animated" && !meta.section.isSlider,
      mobileImageSrc: mobileSyncOnChange(v, "bgImageSrc"),
      mobileColorOpacity: mobileSyncOnChange(v, "bgColorOpacity"),
      tabletImageSrc: tabletSyncOnChange(v, "bgImageSrc"),
      tabletColorOpacity: tabletSyncOnChange(v, "bgColorOpacity")
    };

    if (media === "video") {
      bgProps.video = getVideoData(bgVideo);
      bgProps.bgVideoQuality = bgVideoQuality;
      bgProps.bgVideoLoop = bgVideoLoop === "on";
    }

    if (
      media === "map" ||
      mobileSyncOnChange(v, "media") === "map" ||
      tabletSyncOnChange(v, "media") === "map"
    ) {
      bgProps.mapAddress = bgMapAddress;
      bgProps.mapZoom = bgMapZoom;
    }

    if (shapeTopType !== "none") {
      bgProps.shapeTopType = shapeTopType;
    }

    if (shapeBottomType !== "none") {
      bgProps.shapeBottomType = shapeBottomType;
    }

    const itemsProps = this.makeSubcomponentProps({
      bindWithKey: "items",
      className: classNameContainer,
      meta
    });

    return (
      <Background {...bgProps}>
        <PaddingResizer value={v} onChange={this.handlePaddingResizerChange}>
          <div className={classNameContainerWrap}>
            <Items {...itemsProps} />
          </div>
        </PaddingResizer>
      </Background>
    );
  }

  renderForEdit(v, vs) {
    const { className } = v;

    const classNameSectionContent = classnames(
      "brz-section__content",
      className
    );

    return (
      <CustomCSS selectorName={this.getId()} css={v.customCSS}>
        <div className={classNameSectionContent}>
          <Roles
            allow={["admin"]}
            fallbackRender={() => this.renderItems(v, vs)}
          >
            <ContainerBorder
              ref={el => {
                this.containerBorder = el;
              }}
              borderStyle="none"
              activeBorderStyle="none"
              reactToClick={false}
              showBorders={false}
              path={this.getPath()}
            >
              {this.renderToolbar(v)}
              {this.renderItems(v, vs)}
            </ContainerBorder>
          </Roles>
        </div>
      </CustomCSS>
    );
  }

  renderForView(v, vs) {
    const { className } = v;
    const classNameSectionContent = classnames(
      "brz-section__content",
      className
    );

    return (
      <CustomCSS selectorName={this.getId()} css={v.customCSS}>
        <div className={classNameSectionContent}>{this.renderItems(v, vs)}</div>
      </CustomCSS>
    );
  }
}

export default SectionItem;
