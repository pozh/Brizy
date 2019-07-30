import React from "react";
import classnames from "classnames";
import EditorComponent from "visual/editorComponents/EditorComponent";
import CustomCSS from "visual/component/CustomCSS";
import SectionHeaderStickyItemItems from "./Items";
import Background from "visual/component/Background";
import ContainerBorder from "visual/component/ContainerBorder";
import PaddingResizer from "visual/component/PaddingResizer";
import { Roles } from "visual/component/Roles";
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
import { tabletSyncOnChange, mobileSyncOnChange } from "visual/utils/onChange";

class SectionHeaderStickyItem extends EditorComponent {
  static get componentId() {
    return "SectionHeaderStickyItem";
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

    const tabletW = wInTabletPage - borderWidthW;
    const mobileW = wInMobilePage - borderWidthW;

    return {
      ...meta,
      tabletW,
      mobileW,
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
        outSideExceptions={[".portal-menu__sticky"]}
      />
    );
  }

  renderItems(v, vs) {
    const {
      containerClassName,
      bgImageSrc,
      bgColorOpacity,
      bgPopulation,
      shapeTopType,
      shapeBottomType
    } = v;

    const meta = this.getMeta(v);

    const classNameBg = classnames(
      css(
        `${this.constructor.componentId}-bg`,
        `${this.getId()}-bg`,
        styleBg(vs, v)
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
      shapeTopType: shapeTopType !== "none" && shapeTopType,
      shapeBottomType: shapeBottomType !== "none" && shapeBottomType,
      tabletImageSrc: tabletSyncOnChange(v, "bgImageSrc"),
      tabletColorOpacity: tabletSyncOnChange(v, "bgColorOpacity"),
      mobileImageSrc: mobileSyncOnChange(v, "bgImageSrc"),
      mobileColorOpacity: mobileSyncOnChange(v, "bgColorOpacity")
    };

    const itemsProps = this.makeSubcomponentProps({
      bindWithKey: "items",
      className: classNameContainer,
      meta
    });

    return (
      <Background {...bgProps}>
        <PaddingResizer value={v} onChange={this.handlePaddingResizerChange}>
          <div className={classNameContainerWrap}>
            <SectionHeaderStickyItemItems {...itemsProps} />
          </div>
        </PaddingResizer>
      </Background>
    );
  }

  renderForEdit(v, vs) {
    return (
      <CustomCSS selectorName={this.getId()} css={v.customCSS}>
        <Roles allow={["admin"]} fallbackRender={() => this.renderItems(v, vs)}>
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
      </CustomCSS>
    );
  }

  renderForView(v, vs) {
    return (
      <CustomCSS selectorName={this.getId()} css={v.customCSS}>
        <div>{this.renderItems(v, vs)}</div>
      </CustomCSS>
    );
  }
}

export default SectionHeaderStickyItem;
