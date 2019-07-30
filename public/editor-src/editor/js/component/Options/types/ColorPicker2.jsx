import React from "react";
import _ from "underscore";
import classnames from "classnames";
import ColorPicker2 from "visual/component/Controls/ColorPicker2";
import Select from "visual/component/Controls/Select";
import SelectOptgroup from "visual/component/Controls/Select/SelectOptgroup";
import SelectItem from "visual/component/Controls/Select/SelectItem";
import EditorIcon from "visual/component/EditorIcon";
import Range2 from "./Range2";
import ColorPalette2 from "./ColorPalette2";

class ColorPicker2OptionType extends React.Component {
  static defaultProps = {
    className: "",
    attr: {},
    picker: {
      showOpacity: true
    },
    palette: {
      show: true,
      choices: []
    },
    select: {
      show: true,
      itemHeight: 24,
      choices: []
    },
    gradient: {
      show: false,
      min: 0,
      max: 100,
      step: 1
    },
    value: {
      select: "",

      hex: "#000000",
      opacity: 1,
      palette: "",

      bgColorHex: "#000000",
      gradientColorHex: "#000000",

      startPointer: 0,
      finishPointer: 100,
      activePointer: "startPointer"
    },
    onChange: _.noop
  };

  handleChange = value => {
    const { value: _value, onChange } = this.props;

    onChange({
      ..._value,
      ...value
    });
  };

  renderPalette() {
    const { palette, value } = this.props;

    return (
      <ColorPalette2
        choices={palette.choices}
        value={value.palette}
        onChange={value => {
          this.handleChange({
            palette: value,
            isChanged: "palette"
          });
        }}
      />
    );
  }

  renderGradient() {
    const {
      gradient: { show, ...config },
      value: {
        startPointer,
        finishPointer,
        activePointer,
        bgColorHex,
        gradientColorHex
      }
    } = this.props;

    return (
      <Range2
        config={{
          range: config
        }}
        value={{
          startPointer,
          finishPointer,
          activePointer,
          bgColorHex,
          gradientColorHex
        }}
        onChange={this.handleChange}
      />
    );
  }

  renderSelectChoices(choices) {
    return choices.map((item, index) => {
      const { title, icon: _icon, optgroup, value } = item;
      let icon;

      if (_.isObject(_icon)) {
        const iconClassName = classnames(
          "brz-control__select-option__bg",
          _icon.className
        );
        icon = <div {..._icon} className={iconClassName} />;
      } else if (_icon) {
        icon = <EditorIcon icon={_icon} />;
      }

      if (optgroup && optgroup.length) {
        return (
          <SelectOptgroup
            key={index}
            title={title}
            items={this.renderSelectChoices(optgroup)}
          >
            {icon}
            {title && <span className="brz-span">{title}</span>}
          </SelectOptgroup>
        );
      }

      return (
        <SelectItem key={index} value={value} title={title}>
          {icon}
          {title && <span className="brz-span">{title}</span>}
        </SelectItem>
      );
    });
  }

  renderSelect() {
    const { select, value } = this.props;

    return (
      <Select
        className="brz-control__select--dark brz-control__select__auto"
        defaultValue={value.select}
        itemHeight={select.itemHeight || 24}
        onChange={value => {
          this.handleChange({
            select: value,
            isChanged: "select"
          });
        }}
      >
        {this.renderSelectChoices(select.choices)}
      </Select>
    );
  }

  render() {
    const {
      className: _className,
      picker: { showOpacity = true },
      palette: { show: showPalette = true },
      gradient: { show: showGradient = true },
      select: { show: showSelect = true },
      attr,
      value: { hex, opacity }
    } = this.props;

    const className = classnames(
      "brz-ed-option__colorPicker2",
      _className,
      attr.className
    );

    return (
      <div {...attr} className={className}>
        {showGradient && this.renderGradient()}
        {showSelect && this.renderSelect()}
        <ColorPicker2
          value={{ hex, opacity }}
          disableOpacity={!showOpacity}
          onChange={this.handleChange}
        />
        {showPalette && this.renderPalette()}
      </div>
    );
  }
}

export default ColorPicker2OptionType;
