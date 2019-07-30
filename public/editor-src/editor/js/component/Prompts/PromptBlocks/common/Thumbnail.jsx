import React, { Component, Fragment } from "react";
import _ from "underscore";
import classnames from "classnames";
import Config from "visual/global/Config";
import LazyLoadImage from "visual/component/LazyLoadImage";
import Tooltip from "visual/component/Controls/Tooltip";
import EditorIcon from "visual/component/EditorIcon";
import { imageWrapperSize } from "visual/utils/image";
import { t } from "visual/utils/i18n";

const MAX_CONTAINER_WIDTH = 292;

const animationStyle = {
  animationName: "fadeIn",
  animationFillMode: "both",
  animationDelay: "200ms",
  animationDuration: "200ms"
};
const IS_PRO = Config.get("pro");
const ConfigUrl = Config.get("urls");

export default class Thumbnail extends Component {
  static defaultProps = {
    showRemoveIcon: false,
    blockData: {},
    animation: false,
    isLayout: false,
    onAdd: _.noop,
    onRemove: _.noop,
    onImageLoaded: _.noop
  };

  state = {
    tooltipOpen: false
  };

  iconRef = React.createRef();

  handleTooltipOpen = () => {
    this.setState({
      tooltipOpen: true
    });
  };

  handleTooltipClose = () => {
    this.setState({
      tooltipOpen: false
    });
  };

  handleClick = () => {
    const { data, onAdd } = this.props;

    onAdd(data);
  };

  handleRemove = () => {
    const { data, onRemove } = this.props;

    onRemove(data);
  };

  renderProInfo() {
    return (
      <div className="brz-ed-tooltip-content__pro">
        <p className="brz-p brz-ed-tooltip-content__pro-title">
          {t("You’ll need Brizy PRO to use this integration.")}
        </p>
        <p className="brz-p brz-ed-tooltip-content__pro-body">
          <a className="brz-a" href={ConfigUrl.upgradeToPro} target="_blank">
            <EditorIcon icon="nc-lock" />
            {t("Get Brizy PRO")}
          </a>
        </p>
      </div>
    );
  }

  renderBlank() {
    return (
      <div
        onClick={this.handleClick}
        className="brz-ed-popup-two-block-item brz-ed-popup-two-block__blank brz-ed-popup-two-block__blank-first"
      >
        <div className="brz-ed-container-trigger brz-ed-container-trigger--small" />
        <p className="brz-p">{t("Add a blank block")}</p>
      </div>
    );
  }

  renderPro() {
    const {
      animation,
      isLayout,
      data: { thumbnailSrc, thumbnailWidth, thumbnailHeight },
      onImageLoaded
    } = this.props;
    const { width, height } = imageWrapperSize(
      thumbnailWidth,
      thumbnailHeight,
      MAX_CONTAINER_WIDTH
    );
    const className = classnames(
      "brz-figure brz-ed-popup-two-block-item",
      this.state.tooltipOpen && "brz-ed-popup-two-block-item--active"
    );
    const content = (
      <Fragment>
        <LazyLoadImage
          observerRootSelector=".brz-ed-popup-two-blocks-body"
          style={animation ? animationStyle : {}}
          src={thumbnailSrc}
          width={width}
          height={height}
          onImageLoaded={onImageLoaded}
        />
        <p className="brz-p brz-ed-badge brz-ed-badge--pro">pro</p>
      </Fragment>
    );

    return isLayout ? (
      <figure className={className} onClick={this.handleClick}>
        {content}
      </figure>
    ) : (
      <Tooltip
        size="small"
        openOnClick={false}
        nodeRef={this.iconRef}
        inPortal={true}
        overlay={this.renderProInfo()}
        onOpen={this.handleTooltipOpen}
        onClose={this.handleTooltipClose}
      >
        <figure className={className}>
          {content}
          <span className="brz-ed-popup-two-block__span-lock">
            <EditorIcon icon="nc-lock" ref={this.iconRef} />
          </span>
        </figure>
      </Tooltip>
    );
  }

  renderFree() {
    const {
      animation,
      data: { thumbnailSrc, thumbnailWidth, thumbnailHeight },
      onImageLoaded
    } = this.props;
    const { width, height } = imageWrapperSize(
      thumbnailWidth,
      thumbnailHeight,
      MAX_CONTAINER_WIDTH
    );

    return (
      <figure
        className="brz-figure brz-ed-popup-two-block-item"
        onClick={this.handleClick}
      >
        <LazyLoadImage
          observerRootSelector=".brz-ed-popup-two-blocks-body"
          style={animation ? animationStyle : {}}
          src={thumbnailSrc}
          width={width}
          height={height}
          onImageLoaded={onImageLoaded}
        />
      </figure>
    );
  }

  render() {
    const {
      isLayout,
      data: { blank, showRemoveIcon, pro }
    } = this.props;
    const blockIsPro = !IS_PRO && pro;
    const isBlank = blank && blank === "blank";
    const className = classnames(
      "brz-ed-popup-two-block",
      blockIsPro && "brz-ed-popup-two-block--pro",
      isLayout && "brz-ed-popup-two-block--layout"
    );

    return (
      <div className={className}>
        {showRemoveIcon && (
          <div
            onClick={this.handleRemove}
            className="brz-ed-popup-two-block-remove"
          >
            <EditorIcon icon="nc-trash" />
          </div>
        )}
        {isBlank
          ? this.renderBlank()
          : blockIsPro
          ? this.renderPro()
          : this.renderFree()}
      </div>
    );
  }
}

export class LayoutThumbnail extends Component {
  state = {
    thumbnailLoaded: false
  };

  handleLoaded = () => {
    this.setState({
      thumbnailLoaded: true
    });
  };

  render() {
    const {
      data: { name, pages, color },
      ...otherProps
    } = this.props;
    const { thumbnailLoaded } = this.state;

    return (
      <div
        className="brz-ed-popup-two-block-info"
        style={thumbnailLoaded ? animationStyle : {}}
      >
        <Thumbnail
          {...otherProps}
          data={this.props.data}
          isLayout={true}
          onImageLoaded={this.handleLoaded}
        />
        {thumbnailLoaded && pages.length > 1 && (
          <span
            className="brz-ed-popup-two-block-info-color"
            style={{ backgroundColor: color }}
          >
            <span
              className="brz-ed-popup-two-block-info-color-opacity"
              style={{ backgroundColor: color }}
            />
          </span>
        )}
        <div className="brz-ed-popup-two-block-info-downline">
          <div className="brz-ed-popup-two-block-info-title">{name}</div>
          <div className="brz-ed-popup-two-block-info-title">
            {pages.length} {pages.length > 1 ? t("layouts") : t("layout")}
          </div>
        </div>
      </div>
    );
  }
}
