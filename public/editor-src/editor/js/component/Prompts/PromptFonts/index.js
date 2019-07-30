import React, { Component } from "react";
import { t } from "visual/utils/i18n";
import Tabs from "../common/GlobalApps/Tabs";
import FontLists from "./FontLists";
import Integration from "./Integration";

const TABS = [
  {
    id: "fonts",
    title: t("Fonts"),
    icon: "nc-font",
    component: FontLists
  },
  {
    id: "upload",
    title: t("Add New"),
    icon: "nc-add",
    component: Integration
  }
];

class PromptFonts extends Component {
  static defaultProps = {
    value: {}
  };

  render() {
    return (
      <Tabs
        {...this.props}
        tabs={TABS}
        currentTab="fonts"
        blockTabsWhenLoading={false}
      />
    );
  }
}

export default PromptFonts;
