import React from "react";
import EditorComponent from "visual/editorComponents/EditorComponent";
import { WPShortcode } from "../common/WPShortcode";
import Toolbar from "visual/component/Toolbar";
import * as toolbarConfig from "./toolbar";
import defaultValue from "./defaultValue.json";
import classnames from "classnames";
import { style } from "./styles";
import { css } from "visual/utils/cssStyle";
import CustomCSS from "visual/component/CustomCSS";

const resizerPoints = ["centerLeft", "centerRight"];

class WOOPages extends EditorComponent {
  static get componentId() {
    return "WOOPages";
  }

  static defaultValue = defaultValue;

  handleResizerChange = patch => this.patchValue(patch);

  renderForEdit(v, vs) {
    const className = classnames(
      css(`${this.constructor.componentId}`, `${this.getId()}`, style(vs, v))
    );

    return (
      <Toolbar {...this.makeToolbarPropsFromConfig(toolbarConfig)}>
        <CustomCSS selectorName={this.getId()} css={v.customCSS}>
          <WPShortcode
            name={v.shortcode}
            placeholderIcon="woo-2"
            placeholderContainerWidth={this.props.meta.desktopW}
            className={className}
            resizerPoints={resizerPoints}
            resizerMeta={this.props.meta}
            resizerValue={v}
            resizerOnChange={this.handleResizerChange}
          />
        </CustomCSS>
      </Toolbar>
    );
  }
}

export default WOOPages;
